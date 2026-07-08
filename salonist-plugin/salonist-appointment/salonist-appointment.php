<?php
/**
 * Plugin Name: Salonist Appointment
 * Description: A React-powered appointment booking plugin compatible with all WordPress builders.
 * Version: 1.0.1
 * Author: Salonist
 * License: GPLv2 or later
 * Text Domain: salonist-appointment
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SALONIST_APPOINTMENT_VERSION', '1.0.1');
define('SALONIST_APPOINTMENT_PATH', plugin_dir_path(__FILE__));
define('SALONIST_APPOINTMENT_URL', plugin_dir_url(__FILE__));

// Autoload classes
require_once SALONIST_APPOINTMENT_PATH . 'includes/class-salonist-rest-api.php';
require_once SALONIST_APPOINTMENT_PATH . 'includes/class-salonist-shortcode.php'; 
require_once SALONIST_APPOINTMENT_PATH . 'admin/class-salonist-admin-settings.php';

class Salonist_Appointment {
    public function __construct() {
        add_action('plugins_loaded', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        
        // Register legacy shortcode pointing to new renderer
        add_shortcode('salonist_appointment', array($this, 'render_legacy_shortcode'));

        // Installation tracking: ping the tracking server on activate / deactivate.
        register_activation_hook(__FILE__, array($this, 'track_activation'));
        register_deactivation_hook(__FILE__, array($this, 'track_deactivation'));
    }

    public function init() {
        new Salonist_REST_API();
        new Salonist_Shortcode(); // Registers [salonist_booking], [salonist_giftcards]

        if (is_admin()) {
            new Salonist_Admin_Settings();
        }
    }

    public function track_activation() {
        $this->create_tables();
        $this->send_tracking('active');
    }

    public function track_deactivation() {
        $this->send_tracking('inactive');
    }

    /**
     * Create the local orders table on activation if it doesn't already exist.
     * Uses CREATE TABLE IF NOT EXISTS so an existing table (and its data) is never altered.
     */
    private function create_tables() {
        global $wpdb;
        $table           = $wpdb->prefix . 'appointment_orders';
        $charset_collate = $wpdb->get_charset_collate();

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQL.NotPrepared
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS `{$table}` (
                `order_id` int(11) NOT NULL AUTO_INCREMENT,
                `services_details` longtext DEFAULT NULL,
                `txn_id` varchar(255) DEFAULT NULL,
                `payment_type` varchar(255) DEFAULT NULL,
                `payment_status` varchar(64) DEFAULT NULL,
                `order_status` varchar(64) DEFAULT NULL,
                `Paid` varchar(64) DEFAULT NULL,
                `Balance` varchar(64) DEFAULT NULL,
                `order_date` datetime DEFAULT NULL,
                PRIMARY KEY (`order_id`)
            ) {$charset_collate};"
        );
    }

    /**
     * Send a one-shot install/uninstall ping to the Salonist tracking server.
     * Non-fatal: failures are ignored so they never block (de)activation.
     */
    private function send_tracking($status) {
        $api_url = 'https://sistagging.com/salonlist-tracking-plugin/track_installation.php';

        wp_remote_post($api_url, array(
            'timeout'   => 15,
            'sslverify' => true,
            // form-encoded so the endpoint can read $_POST['plugin_name'] etc.
            'body'      => array(
                'plugin_name' => 'Salonist Appointment',
                'version'     => SALONIST_APPOINTMENT_VERSION,
                'domain_name' => home_url(),
                'date'        => gmdate('Y-m-d H:i:s'), // datetime-compatible; display as d-m-Y in the listing
                'status'      => $status, // 'active' on activation, 'inactive' on deactivation
            ),
        ));
    }

    public function render_legacy_shortcode() {
        // Enqueue assets
        wp_enqueue_script('salonist-appointment-app');
        wp_enqueue_style('salonist-appointment-style');
        
        // Return correct container
        // Note: New index.js looks for 'salonist-appointment-root' as fallback for booking app.
        return '<div id="salonist-appointment-root"></div>';
    }

    public function enqueue_frontend_assets() {
        if (!file_exists(SALONIST_APPOINTMENT_PATH . 'build/index.asset.php')) {
             return;
        }
        
        $asset_file = include(SALONIST_APPOINTMENT_PATH . 'build/index.asset.php');

        wp_register_script(
            'salonist-appointment-app',
            SALONIST_APPOINTMENT_URL . 'build/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        wp_register_style(
            'salonist-appointment-style',
            SALONIST_APPOINTMENT_URL . 'build/index.css',
            array(),
            $asset_file['version']
        );

        // Pass data to script
        // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        $payment_keys = array();
        $user_id = 0;
        $currency = 'PHP';
        
        if ($users) {
            $user_id = $users[0]->ID;
            $login_detail = get_user_meta($user_id, 'salonist_user_login_detail', true);
            $domain_id = isset($login_detail['domainId']) ? $login_detail['domainId'] : (isset($login_detail['domain_id']) ? $login_detail['domain_id'] : '');

            $currency = get_user_meta($user_id, 'currency', true);
            if (!$currency) {
                $currency = get_transient('salonist_app_currency_v5_' . $domain_id);
                if (!$currency) {
                    if (!empty($domain_id)) {
                        $response = wp_remote_post('https://salonist.io/webapicustomer/domain_detail', array(
                            'body' => array('domainId' => $domain_id),
                            'timeout' => 15,
                            'sslverify' => false
                        ));
                        if (!is_wp_error($response)) {
                            $body = json_decode(wp_remote_retrieve_body($response), true);
                            if (isset($body['domaindetail']['currency'])) {
                                $currency = $body['domaindetail']['currency'];
                            }
                        }
                    }
                    
                    if (!$currency) {
                        $currency = '₹';
                    }
                    
                    set_transient('salonist_app_currency_v5_' . $domain_id, $currency, HOUR_IN_SECONDS);
                }
            }

            $settings_data = array('currency' => $currency);
            $stripe_mode = get_user_meta($user_id, 'stripe_mode', true) ?: 'test';
            $payment_keys = array(
                'stripe' => array('publishable' => get_user_meta($user_id, $stripe_mode === 'test' ? 'stripe_test_publish_key' : 'stripe_live_publish_key', true)),
                'paypal' => array('client_id' => get_user_meta($user_id, 'paypal_client_id', true)),
                'gpay' => array('enabled' => get_user_meta($user_id, 'gpay_qr_enable', true), 'vpa' => get_user_meta($user_id, 'gpay_vpa', true))
            );
        }

        wp_localize_script('salonist-appointment-app', 'salonistData', array(
            'rootUrl' => get_rest_url(null, 'salonist/v1'),
            'restUrl' => get_rest_url(null, 'salonist/v1'),
            'nonce' => wp_create_nonce('wp_rest'),
            'settings' => array(
                'currency' => $currency ?? '₱',
                'paymentKeys' => $payment_keys ?? array()
            ) 
        ));
    }

    public function enqueue_admin_assets($hook) {
         if (strpos($hook, 'salonist-appointment') === false) {
             return;
         }
         
         if (!file_exists(SALONIST_APPOINTMENT_PATH . 'build/admin.asset.php')) {
             return;
         }
         
         $asset_file = include(SALONIST_APPOINTMENT_PATH . 'build/admin.asset.php');

        wp_enqueue_script(
            'salonist-appointment-admin',
            SALONIST_APPOINTMENT_URL . 'build/admin.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        wp_enqueue_style(
            'salonist-appointment-admin-style',
            SALONIST_APPOINTMENT_URL . 'build/index.css', // Shared styles from main build likely
            array(),
            $asset_file['version']
        );
        
        // Fetch settings for admin localization
        // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        $currency = '₱';
        $payment_keys = array();

        if ($users) {
            $user_id = $users[0]->ID;
            $login_detail = get_user_meta($user_id, 'salonist_user_login_detail', true);
            $domain_id = isset($login_detail['domainId']) ? $login_detail['domainId'] : (isset($login_detail['domain_id']) ? $login_detail['domain_id'] : '');
            $currency = get_user_meta($user_id, 'currency', true);
            if (!$currency) {
                $currency = get_transient('salonist_app_currency_v5_' . $domain_id);
                if (!$currency) {
                    if (!empty($domain_id)) {
                        $response = wp_remote_post('https://salonist.io/webapicustomer/domain_detail', array(
                            'body' => array('domainId' => $domain_id),
                            'timeout' => 15,
                            'sslverify' => false
                        ));
                        if (!is_wp_error($response)) {
                            $body = json_decode(wp_remote_retrieve_body($response), true);
                            if (isset($body['domaindetail']['currency'])) {
                                $currency = $body['domaindetail']['currency'];
                            }
                        }
                    }
                    if (!$currency) {
                        $currency = '₹';
                    }
                    set_transient('salonist_app_currency_v5_' . $domain_id, $currency, HOUR_IN_SECONDS);
                }
            }

            $stripe_mode = get_user_meta($user_id, 'stripe_mode', true) ?: 'test';
            $payment_keys = array(
                'stripe' => array('publishable' => get_user_meta($user_id, $stripe_mode === 'test' ? 'stripe_test_publish_key' : 'stripe_live_publish_key', true)),
                'paypal' => array('client_id' => get_user_meta($user_id, 'paypal_client_id', true))
            );
        }

        wp_localize_script('salonist-appointment-admin', 'salonistData', array(
            'rootUrl' => get_rest_url(null, 'salonist/v1'),
            'restUrl' => get_rest_url(null, 'salonist/v1'),
            'nonce' => wp_create_nonce('wp_rest'),
            'logoUrl' => SALONIST_APPOINTMENT_URL . 'admin/assets/logo.png',
            'supportCardUrl' => SALONIST_APPOINTMENT_URL . 'admin/assets/support-card.png',
            'settings' => array(
                'currency' => $currency,
                'paymentKeys' => $payment_keys
            )
        ));
    }
}

new Salonist_Appointment();
