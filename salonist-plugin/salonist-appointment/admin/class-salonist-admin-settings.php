<?php

if (!defined('ABSPATH')) {
    exit;
}

class Salonist_Admin_Settings {
    public function __construct() {
        add_action('admin_menu', array($this, 'add_menu'));
        add_action('admin_head', array($this, 'admin_styles'));
    }

    public function admin_styles() {
        echo '<style>
            #adminmenu .toplevel_page_salonist-appointment .wp-menu-image img {
                padding: 0;
                width: 20px;
                height: 20px;
                object-fit: contain;
                margin-top: 5px;
            }
        </style>';
    }

    public function add_menu() {
        add_menu_page(
            'Salonist Appointment Settings',
            'Salonist Appointment',
            'manage_options',
            'salonist-appointment',
            array($this, 'render_settings_page'),
            SALONIST_APPOINTMENT_URL . 'admin/assets/logo.png'
        );
    }

    public function render_settings_page() {
        ?>
        <div id="salonist-admin-root">
            <div style="padding: 20px; font-family: sans-serif;">
                <h2>Loading Salonist Dashboard...</h2>
                <p>Establishing secure connection to Salonist API...</p>
            </div>
        </div>
        <?php
    }
}
