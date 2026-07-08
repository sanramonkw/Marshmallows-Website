<?php

if (!defined('ABSPATH')) {
    exit;
}

class Salonist_REST_API {
    private $namespace = 'salonist/v1';

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route($this->namespace, '/services', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_services'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/packages', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_packages'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/giftcards', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_giftcards'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/locations', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_locations'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/staff', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_staff'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/slots', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_slots'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/slots/availability', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_slots_availability'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/business_hours', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_business_hours'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/domain_detail', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_domain_detail'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/book', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_booking'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/settings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_public_settings'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/admin/settings', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_admin_settings'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        register_rest_route($this->namespace, '/admin/orders', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_orders'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        register_rest_route($this->namespace, '/admin/orders/delete', array(
            'methods' => 'POST',
            'callback' => array($this, 'delete_orders'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Admin Endpoints
        register_rest_route($this->namespace, '/admin/status', array(
            'methods' => 'GET',
            'callback' => array($this, 'admin_get_status'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        register_rest_route($this->namespace, '/admin/login', array(
            'methods' => 'POST',
            'callback' => array($this, 'admin_login'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        register_rest_route($this->namespace, '/admin/logout', array(
            'methods' => 'POST',
            'callback' => array($this, 'admin_logout'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Payment Endpoints
        register_rest_route($this->namespace, '/payments/stripe/create-intent', array(
            'methods' => 'POST',
            'callback' => array($this, 'stripe_create_intent'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/payments/razorpay/create-order', array(
            'methods' => 'POST',
            'callback' => array($this, 'razorpay_create_order'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/payments/paytab/create-session', array(
            'methods' => 'POST',
            'callback' => array($this, 'paytab_create_session'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/payments/telr/create-session', array(
            'methods' => 'POST',
            'callback' => array($this, 'telr_create_session'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/payments/myfatoorah/init', array(
            'methods' => 'POST',
            'callback' => array($this, 'myfatoorah_init_payment'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route($this->namespace, '/coupon/validate', array(
            'methods' => 'POST',
            'callback' => array($this, 'validate_coupon'),
            'permission_callback' => '__return_true',
        ));
    }

    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    public function admin_get_status() {
        $user_id = get_current_user_id();
        $login_detail = get_user_meta($user_id, 'salonist_user_login_detail', true);
        return array(
            'login_detail' => $login_detail ?: null
        );
    }

    public function admin_login($request) {
        $params = $request->get_json_params();
        $email = isset($params['email']) ? sanitize_email($params['email']) : '';
        $password = isset($params['password']) ? $params['password'] : '';

        if (empty($email) || empty($password)) {
            return new WP_Error('missing_params', 'Email and password are required', array('status' => 400));
        }

        $response = wp_remote_post('https://salonist.io/secureweb/login', array(
            'headers' => array('Content-Type' => 'application/json'),
            'body' => json_encode(array(
                'email' => $email,
                'password' => $password
            )),
            'timeout' => 30
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Connection to Salonist failed', array('status' => 500));
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (isset($data['success']) && $data['success']) {
            $user_id = get_current_user_id();
            update_user_meta($user_id, 'salonist_user_login_detail', $data);
            return array('success' => true, 'login_detail' => $data);
        }

        return array('success' => false, 'message' => isset($data['message']) ? $data['message'] : 'Invalid credentials');
    }

    public function admin_logout() {
        $user_id = get_current_user_id();
        delete_user_meta($user_id, 'salonist_user_login_detail');
        return array('success' => true);
    }

    public function get_staff($request) {
        $domain_id = $request->get_param('domainId');
        $service_id = $request->get_param('serviceId');
        
        if (empty($domain_id)) $domain_id = $this->get_domain_id();

        $response = wp_remote_post('https://salonist.io/wordpressapi/service_staff', array(
            'body' => array('domainId' => $domain_id, 'service_id' => $service_id)
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch staff', array('status' => 500));
        }

        return json_decode(wp_remote_retrieve_body($response));
    }

    public function validate_coupon($request) {
        $params = $request->get_json_params();
        $coupon_code = $params['coupon_code'] ?? '';
        $customer_contact = $params['customer_contact'] ?? '';

        if (empty($coupon_code)) {
            return rest_ensure_response(array('status' => 'error', 'message' => 'Coupon code is required'));
        }

        // Get login details
        // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key -- Required for plugin functionality
        $users = get_users(
            array(
                'meta_key' => 'salonist_user_login_detail',
                'number' => 1
            )
        );

        if (empty($users)) {
            return rest_ensure_response(array('status' => 'error', 'message' => 'Salonist login details not found'));
        }

        $login_detail = get_user_meta($users[0]->ID, 'salonist_user_login_detail', true);
        $domain_id = $login_detail['domainId'] ?? '';

        // Prepare request body exactly like Postman success case
        $body = array(
            'coupon_code' => $coupon_code,
            'domainId' => $domain_id,
            'customer_contact' => $customer_contact
        );

        // Optional: Include client credentials if domainId is not enough
        if (!empty($login_detail['client_id'])) {
            $body['client_id'] = $login_detail['client_id'];
            $body['client_secret'] = $login_detail['client_secret'];
        }

        // Use cURL for better compatibility
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_init
        $ch = curl_init('https://salonist.io/wordpressapi/coupon_validate');
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
        curl_setopt($ch, CURLOPT_POST, true);
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_exec
        $response_body = curl_exec($ch);
        
        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_close
            curl_close($ch);
            return rest_ensure_response(array(
                'status' => 'error',
                'message' => 'Failed to connect to Salonist API: ' . $error_msg
            ));
        }
        
        // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_close
        curl_close($ch);
        
        $data = json_decode($response_body, true);

        if (!$data) {
            return rest_ensure_response(array(
                'status' => 'error', 
                'message' => 'Invalid response from Salonist API',
                'debug_response' => $response_body
            ));
        }

        // The API returns status: "success" or "error"
        return rest_ensure_response($data);
    }

    public function get_slots($request) {
        $domain_id = $request->get_param('domainId');
        $staff_id = $request->get_param('staffId');
        $date = $request->get_param('date');
        $service_id = $request->get_param('serviceId');
        $duration = $request->get_param('duration');

        if (empty($domain_id)) $domain_id = $this->get_domain_id();

        $result = $this->fetch_slots_for_date($domain_id, $staff_id, $date, $service_id, $duration);

        if ($result === false) {
            return new WP_Error('api_error', 'Failed to fetch slots', array('status' => 500));
        }

        return $result;
    }

    /*
     * Fetch the raw slot result for a single date. Shared by /slots and /slots/availability so
     * both hit the same CRM endpoints (change the slot URLs here in one place when migrating
     * domains). Mirrors the original get_slots logic: try specific-staff availability, then fall
     * back to business-time. Returns the decoded result object (or null), or boolean false on a
     * hard connection error from the fallback call.
     */
    private function fetch_slots_for_date($domain_id, $staff_id, $date, $service_id, $duration) {
        $result = null;

        // 1. Try specific staff availability first
        if ($staff_id !== 'any' && !empty($staff_id)) {
            $response = wp_remote_post('https://salonist.io/wordpressapi/get_staff_time_availaibility', array(
                'body' => array(
                    'domainId'    => $domain_id,
                    'staff'       => $staff_id,
                    'date'        => $date,
                    'serviceId'   => $service_id,
                    'servicetime' => $duration,
                ),
            ));
            if (!is_wp_error($response)) {
                $data = json_decode(wp_remote_retrieve_body($response));
                // Treat empty / empty-markup html as no availability.
                if (!empty($data) && !empty($data->html)) {
                    $result = $data;
                }
            }
        }

        // 2. Fallback: 'any' staff selected, or the staff call returned nothing
        if (empty($result)) {
            $response = wp_remote_post('https://salonist.io/wordpressapi/get_business_time', array(
                'body' => array(
                    'domainId'  => $domain_id,
                    'date'      => $date,
                    'serviceId' => $service_id,
                ),
            ));
            if (is_wp_error($response)) {
                return false;
            }
            $result = json_decode(wp_remote_retrieve_body($response));
        }

        return $result;
    }

    // True when a slot result actually contains bookable times (not empty / not "not_available").
    private function slots_result_has_availability($result) {
        if (empty($result) || !isset($result->html) || !is_string($result->html)) {
            return false;
        }
        // Both "no slots" signals: get_business_time returns the token "not_available";
        // get_staff_time_availaibility returns a human label "<label>Not Available!</label>".
        if (stripos($result->html, 'not_available') !== false) {
            return false;
        }
        $text = trim(wp_strip_all_tags($result->html));
        if ($text === '' || stripos($text, 'not available') !== false) {
            return false;
        }
        return true;
    }

    // Resolve closed weekdays (0=Sun..6=Sat) and max advance booking days for a domain.
    private function fetch_business_hours_meta($domain_id) {
        $meta = array('closed_days' => array(), 'max_advance' => 30);
        $response = wp_remote_post('https://salonist.io/wordpressapi/business_hours', array(
            'body' => array('domainId' => $domain_id),
        ));
        if (is_wp_error($response)) {
            return $meta;
        }
        $body = json_decode(wp_remote_retrieve_body($response), true);
        if (!is_array($body)) {
            return $meta;
        }
        // max advance booking: nested Insdetail (.io) or flat details (.in)
        $max = isset($body['details']['Insdetail']['max_advance_booking'])
            ? $body['details']['Insdetail']['max_advance_booking']
            : (isset($body['details']['max_advance_booking']) ? $body['details']['max_advance_booking'] : null);
        if (!empty($max)) {
            $meta['max_advance'] = intval($max);
        }
        // closed weekdays: nested Businesshours (.io) or flat row (.in)
        if (isset($body['list']) && is_array($body['list'])) {
            foreach ($body['list'] as $key => $row) {
                $status = isset($row['Businesshours']['status']) ? $row['Businesshours']['status']
                    : (isset($row['status']) ? $row['status'] : '');
                if ($status === 'Close') {
                    $meta['closed_days'][] = (int) $key;
                }
            }
        }
        return $meta;
    }

    /*
     * GET /slots/availability?domainId&staffId&serviceId&duration&month=YYYY-MM
     * Returns which dates in a month have NO available slots, so the calendar can disable/strike
     * them. Probes only dates that are otherwise bookable (today..max_advance, excluding closed
     * weekdays). Cached per domain+staff+service+duration+month for 10 minutes. Pass nocache=1 to
     * bypass the cache. Dates beyond the time budget are left out of both lists ("unknown").
     */
    public function get_slots_availability($request) {
        $domain_id  = $request->get_param('domainId');
        if (empty($domain_id)) $domain_id = $this->get_domain_id();
        $staff_id   = $request->get_param('staffId');
        $staff_id   = empty($staff_id) ? 'any' : $staff_id;
        $service_id = $request->get_param('serviceId');
        $duration   = $request->get_param('duration');
        $month      = $request->get_param('month');

        if (empty($service_id)) {
            return new WP_Error('missing_params', 'serviceId is required', array('status' => 400));
        }
        if (empty($month) || !preg_match('/^\d{4}-\d{2}$/', $month)) {
            $month = gmdate('Y-m');
        }

        $cache_key = 'salonist_avail_v2_' . md5($domain_id . '|' . $staff_id . '|' . $service_id . '|' . $duration . '|' . $month);
        if (!$request->get_param('nocache')) {
            $cached = get_transient($cache_key);
            if ($cached !== false) {
                return $cached;
            }
        }

        $bh          = $this->fetch_business_hours_meta($domain_id);
        $closed_days = $bh['closed_days'];
        $max_advance = $bh['max_advance'] > 0 ? $bh['max_advance'] : 30;

        $today    = new DateTime(gmdate('Y-m-d') . ' 00:00:00');
        $max_date = (clone $today)->modify('+' . $max_advance . ' days');

        $first         = DateTime::createFromFormat('Y-m-d H:i:s', $month . '-01 00:00:00');
        $days_in_month = $first ? (int) $first->format('t') : 0;

        $unavailable  = array();
        $available    = array();
        $checked      = 0;
        $budget_start = microtime(true);

        for ($d = 1; $d <= $days_in_month; $d++) {
            $date = DateTime::createFromFormat('Y-m-d H:i:s', sprintf('%s-%02d 00:00:00', $month, $d));
            if (!$date || $date < $today || $date > $max_date) {
                continue; // outside the bookable window (already disabled by the calendar)
            }
            if (in_array((int) $date->format('w'), $closed_days, true)) {
                continue; // closed weekday (already disabled by the calendar)
            }
            if ((microtime(true) - $budget_start) > 20) {
                break; // time-budget guard so the request can't hang; remaining dates stay "unknown"
            }

            $checked++;
            $result = $this->fetch_slots_for_date($domain_id, $staff_id, $date->format('d-m-Y'), $service_id, $duration);
            if ($this->slots_result_has_availability($result)) {
                $available[] = $date->format('Y-m-d');
            } else {
                $unavailable[] = $date->format('Y-m-d');
            }
        }

        $payload = array(
            'month'       => $month,
            'domainId'    => (string) $domain_id,
            'staffId'     => (string) $staff_id,
            'serviceId'   => (string) $service_id,
            'unavailable' => $unavailable,
            'available'   => $available,
            'checked'     => $checked,
        );

        set_transient($cache_key, $payload, 10 * MINUTE_IN_SECONDS);
        return $payload;
    }

    public function get_domain_detail($request) {
        $domain_id = $request->get_param('domainId');
        if (empty($domain_id)) $domain_id = $this->get_domain_id();

        // Some accounts return HTTP 500 with an EMPTY body on one domain (e.g. salonist.io)
        // while the other (salonist.in) responds fine. An empty body makes the frontend's
        // response.json() throw "Unexpected end of JSON input". So: try the primary domain,
        // fall back to the other, and ALWAYS return valid JSON.
        foreach (array('https://salonist.io', 'https://salonist.in') as $base) {
            $response = wp_remote_post($base . '/webapicustomer/domain_detail', array(
                'body'    => array('domainId' => $domain_id),
                'timeout' => 15,
            ));
            if (is_wp_error($response)) {
                continue;
            }
            if ((int) wp_remote_retrieve_response_code($response) !== 200) {
                continue;
            }
            $decoded = json_decode(wp_remote_retrieve_body($response), true);
            if (is_array($decoded)) {
                return $this->normalize_null($this->legacy_domain_detail($decoded));
            }
        }

        // Both upstreams failed: return a valid (non-empty) payload so the app never crashes.
        return array(
            'domaindetail' => null,
            'domainadmin'  => null,
            'status'       => 'error',
            'message'      => 'Domain detail unavailable',
        );
    }

    public function get_business_hours($request) {
        $domain_id = $request->get_param('domainId');
        if (empty($domain_id)) $domain_id = $this->get_domain_id();

        $response = wp_remote_post('https://salonist.io/wordpressapi/business_hours', array(
            'body' => array(
                'domainId' => $domain_id
            )
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch business hours', array('status' => 500));
        }

        $response_code = wp_remote_retrieve_response_code($response);
        if ($response_code !== 200) {
            return new WP_Error('api_error', 'External API returned ' . $response_code, array('status' => $response_code));
        }

        $body = $this->legacy_business_hours(json_decode(wp_remote_retrieve_body($response), true));

        if (isset($body['details']['Insdetail']['max_advance_booking'])) {
             $body['max_advance'] = $body['details']['Insdetail']['max_advance_booking'];
        }
        
        $closed_days = array();
        if (isset($body['list']) && is_array($body['list'])) {
            foreach ($body['list'] as $key => $days_data) {
                if (isset($days_data['Businesshours']['status']) && $days_data['Businesshours']['status'] === 'Close') {
                    $closed_days[] = $key; // 0 for Sunday, 1 for Monday, etc.
                }
            }
        }
        $body['closed_days'] = $closed_days;

        return $this->normalize_null($body);
    }

    public function create_booking($request) {
        $params = $request->get_json_params();
        
        // Dynamic Validation: Require EITHER individual fields OR selected_items
        $has_selected_items = !empty($params['selected_items']) && is_array($params['selected_items']);
        $has_individual_fields = !empty($params['service']) && !empty($params['staff']) && !empty($params['date']);

        if (!$has_selected_items && !$has_individual_fields) {
            return new WP_Error(
                'missing_parameters', 
                'Missing required booking parameters. Please select at least one service.', 
                array('status' => 400)
            );
        }

        if (empty($params['domainId']) || empty($params['customer'])) {
             return new WP_Error(
                'missing_parameters', 
                'Missing domainId or customer information.', 
                array('status' => 400)
            );
        }
        
        $domain_id = $params['domainId'];
        $customer = $params['customer'];
        
        // Prepare items list
        $items = [];
        if ($has_selected_items) {
            $items = $params['selected_items'];
        } else {
            $items[] = [
                'service' => $params['service'],
                'staff' => $params['staff'],
                'date' => $params['date'],
                'time' => $params['time'] ?? 'N/A'
            ];
        }

        // Use the first item for legacy top-level fields for CRM compatibility
        $first_item = $items[0];
        $service = $first_item['service'];
        $staff = $first_item['staff'];
        $date = $first_item['date']; 
        $time = $first_item['time'];

        // Convert date from yyyy-mm-dd to dd-mm-yyyy if needed
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            $date = gmdate('d-m-Y', strtotime($date));
        }
        
        // Clear placeholder values for API
        $api_time = ($time === 'N/A') ? '' : $time;
        $api_staff_id = ($staff['id'] === 'any') ? '' : $staff['id'];

        $is_partial = !empty($params['is_partial']);
        $partial_amount = isset($params['partial_amount']) ? floatval($params['partial_amount']) : 0;
        $subtotal = isset($params['subtotal']) ? floatval($params['subtotal']) : floatval($service['price']);
        $tax_amount = isset($params['tax_amount']) ? floatval($params['tax_amount']) : 0;
        $grand_total = isset($params['grand_total']) ? floatval($params['grand_total']) : ($subtotal + $tax_amount);
        $total_amount = $grand_total; // Use grand total for balance calculations
        
        $paying_now = 0;
        $due_amount = $total_amount;
        
        // Determine if this is an online payment based on gateway
        $online_gateways = ['Stripe', 'Razorpay', 'PayPal', 'GPay', 'Paytab', 'Telr'];
        $gateway = $params['gateway'] ?? 'Cash';
        $is_online_paid = in_array($gateway, $online_gateways) && isset($params['payment_details']);
        
        if ($is_online_paid) {
            if ($is_partial) {
                $paying_now = $partial_amount;
                $due_amount = $total_amount - $partial_amount;
            } else {
                $paying_now = $total_amount;
                $due_amount = 0;
            }
        }

        // Map 'At Salon' or 'Cash' to 'Cash on delivery' for CRM
        $payment_mode = $gateway;
        if ($gateway === 'At Salon' || $gateway === 'Cash') {
            $payment_mode = 'Cash on delivery';
        }

        $results = [];
        $total_items = count($items);
        
        $processed_paying_now = 0;
        $processed_discount = 0;
        $total_discount = floatval($params['coupon_discount_price'] ?? 0);
        $total_tax = $tax_amount;
        $total_base_subtotal = $subtotal;
        
        foreach ($items as $idx => $item) {
            $item_service = $item['service'];
            $item_staff = $item['staff'];
            $item_date = $item['date'];
            $item_time = $item['time'];
            $item_domain_id = $item['location']['Domain']['id'] ?? $domain_id;

            // Convert date for each item if in yyyy-mm-dd format
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $item_date)) {
                $item_date = gmdate('d-m-Y', strtotime($item_date));
            }

            $item_api_time = ($item_time === 'N/A') ? '' : $item_time;
            $item_api_staff_id = (isset($item_staff['id']) && $item_staff['id'] === 'any') ? '' : ($item_staff['id'] ?? '');

            // Calculate item-specific amounts
            $item_price = floatval($item_service['price'] ?? 0);
            
            // Distribute tax proportionally
            $item_tax = ($total_base_subtotal > 0) ? round(($item_price / $total_base_subtotal) * $total_tax, 2) : 0;
            
            // Distribute coupon discount proportionally
            if ($idx === $total_items - 1) {
                $item_discount = $total_discount - $processed_discount;
            } else {
                $item_discount = ($total_base_subtotal > 0) ? ($item_price / $total_base_subtotal) * $total_discount : 0;
                $item_discount = round($item_discount, 2);
                $processed_discount += $item_discount;
            }
            $item_grandtotal = round(max(0, ($item_price - $item_discount) + $item_tax), 2);
            
            // Distribute payingnow proportionally
            $item_paying_now = 0;
            if ($is_online_paid) {
                if ($idx === $total_items - 1) {
                    $item_paying_now = $paying_now - $processed_paying_now;
                } else {
                    $item_paying_now = round(($total_amount > 0) ? ($item_grandtotal / $total_amount) * $paying_now : 0, 2);
                    $processed_paying_now += $item_paying_now;
                }
            }
                        $item_due = max(0, $item_grandtotal - $item_paying_now);

            $item_is_package = (isset($item_service['type']) && $item_service['type'] === 'package');

            $current_order_data = array(
                'domainId' => $item_domain_id,
                'type' => $item_is_package ? 'Quick Sale' : 'Appointment',
                'customer_id' => '',
                'bill_date' => $item_date,
                'subtotal' => round($item_price - $item_discount, 2),
                'grandtotal' => $item_grandtotal,
                'item_vat' => $item_tax,
                'payingnow' => $item_paying_now,
                'dueamount' => round($item_due, 2),
                'customer_name' => trim($customer['firstName'] . ' ' . ($customer['lastName'] ?? '')),
                'customer_contact' => $customer['phone'],
                'email' => $customer['email'] ?? '',
                'payment_mode' => $payment_mode,
                'time' => $item_is_package ? '' : $item_api_time,
                'staffId' => $item_is_package ? '' : $item_api_staff_id
            );

            // Add coupon fields if discount exists
            if ($item_discount > 0 || !empty($params['coupon_code'])) {
                $current_order_data['coupon_apply_status'] = '1';
                $current_order_data['coupon_code'] = $params['coupon_code'] ?? 'Discount';
                $current_order_data['coupon_offer'] = $params['coupon_offer'] ?? '';
                $current_order_data['coupon_offer_type'] = $params['coupon_offer_type'] ?? '';
                $current_order_data['coupon_discount_price'] = $item_discount;
            }

            // Map item as service or package
            if (isset($item_service['type']) && $item_service['type'] === 'package') {
                $current_order_data["packages[0][id]"] = $item_service['id'];
                $current_order_data["packages[0][qty]"] = '1';
                $current_order_data["packages[0][price]"] = $item_service['price'];
                $current_order_data["packages[0][discount]"] = $item_discount;
                $current_order_data["packages[0][total]"] = $item_service['price'];
            } else {
                $current_order_data["services[0][id]"] = $item_service['id'];
                $current_order_data["services[0][qty]"] = '1';
                $current_order_data["services[0][price]"] = $item_service['price'];
                $current_order_data["services[0][discount]"] = $item_discount;
                $current_order_data["services[0][total]"] = $item_service['price'];
                $current_order_data["services[0][staffId]"] = $item_api_staff_id;
                $current_order_data["services[0][bill_date]"] = $item_date;
                $current_order_data["services[0][time]"] = $item_api_time;
            }

            // Hit the API using cURL (more reliable for this endpoint)
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_init
            $ch = curl_init('https://salonist.io/wordpressapi/order_create_wordpress');
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
            curl_setopt($ch, CURLOPT_POSTFIELDS, $current_order_data);
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_setopt
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_exec
            $remote_response_body = curl_exec($ch);
            // phpcs:ignore WordPress.WP.AlternativeFunctions.curl_curl_close
            curl_close($ch);

            if ($remote_response_body) {
                $res_json = json_decode($remote_response_body, true);
                if ($res_json) {
                    $results[$idx] = array_merge($res_json, [
                        'item_service_data' => $item
                    ]);
                } else {
                    $results[$idx] = ['status' => 'error', 'message' => 'Invalid CRM response'];
                }
            } else {
                $results[$idx] = ['status' => 'error', 'message' => 'CRM Connection Failed'];
            }
            
            // Small delay to avoid CRM rate limiting
            if ($idx < $total_items - 1) {
                usleep(500000); // 0.5 seconds
            }
        }

        // Return a combined result
        $overall_status = (!empty($results) && ($results[0]['status'] === 'success' || (isset($results[0]['success']) && $results[0]['success']))) ? 'success' : 'error';
        $final_result = [
            'status' => $overall_status,
            'items' => array_map(function($res, $item) {
                return [
                    'service' => [
                        'id' => $item['service']['id'] ?? '',
                        'name' => $item['service']['name'] ?? '',
                        'price' => $item['service']['price'] ?? 0,
                    ],
                    'staff' => $item['staff'],
                    'date' => $item['date'],
                    'time' => $item['time'],
                    'location_name' => $item['location']['name'] ?? 'Main Branch',
                    'order_id' => $res['order_id'] ?? $res['salonSaleId'] ?? ''
                ];
            }, $results, array_slice($items, 0, count($results))),
            'order_id' => $results[0]['order_id'] ?? $results[0]['salonSaleId'] ?? '',
            'message' => $results[0]['message'] ?? 'Booking processed.',
            'totals' => [
                'payable' => $paying_now,
                'total' => $total_amount,
                'discount' => $total_discount,
                'balance' => $total_amount - $paying_now,
                'tax' => $total_tax,
                'currency' => $params['currency_symbol'] ?? '₹'
            ]
        ];

        // Prepare extended details for storage
        $crm_order_ids = [];
        $sync_log = [];
        foreach ($results as $idx_log => $res_log) {
            $cid = $res_log['order_id'] ?? $res_log['salonSaleId'] ?? '';
            if (!empty($cid)) {
                $crm_order_ids[] = (string)$cid;
            }
            $sync_log[] = [
                'item_index' => $idx_log,
                'status' => $res_log['status'] ?? ($res_log['success'] ? 'success' : 'error'),
                'message' => $res_log['message'] ?? '',
                'crm_order_id' => $res_log['order_id'] ?? $res_log['salonSaleId'] ?? '',
                'service_name' => $items[$idx_log]['service']['name'] ?? 'Unknown'
            ];
        }

        $params['crm_order_ids'] = $crm_order_ids;
        $params['sync_log'] = $sync_log;
        $params['overall_status'] = $overall_status;

        // Save to local DB
        global $wpdb;
        $table_name = $wpdb->prefix . "appointment_orders";
        $status = ($overall_status === 'success') ? 'Completed' : 'Incompleted';
        
        if ($is_online_paid) {
            $payment_status = $is_partial ? 'Partial' : 'Paid';
        } else {
            $payment_status = 'Pending';
        }
        
        $txn_id = '';
        if (isset($params['payment_details'])) {
            if (isset($params['payment_details']['id'])) {
                $txn_id = $params['payment_details']['id'];
            } elseif (isset($params['payment_details']['razorpay_payment_id'])) {
                $txn_id = $params['payment_details']['razorpay_payment_id'];
            } elseif (isset($params['payment_details']['purchase_units'][0]['payments']['captures'][0]['id'])) {
                $txn_id = $params['payment_details']['purchase_units'][0]['payments']['captures'][0]['id'];
            }
        }

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery
        $wpdb->insert($table_name, array(
            'services_details' => json_encode($params),
            'txn_id' => $txn_id,
            'payment_type' => $params['gateway'] ?? 'Cash',
            'payment_status' => $payment_status,
            'order_status' => $status,
            'Paid' => $paying_now,
            'Balance' => $total_amount - $paying_now,
            'order_date' => gmdate("Y-m-d H:i:s")
        ));

        $final_result['local_order_id'] = $wpdb->insert_id;

        return $final_result;
    }

    private function get_login_detail_for_domain($domain_id) {
        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if ($users) {
            return get_user_meta($users[0]->ID, 'salonist_user_login_detail', true);
        }
        return null;
    }

    public function get_locations() {
        $domain_id = $this->get_domain_id();
        $cache_key = 'salonist_locations_v1_' . md5((string) $domain_id);
        $cached = get_transient($cache_key);
        if ($cached !== false) {
            return $cached;
        }

        $response = wp_remote_post('https://salonist.io/wordpressapi/getAllLocations', array(
            'body' => array('domainId' => $domain_id)
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch locations', array('status' => 500));
        }

        $body = $this->normalize_null($this->legacy_locations(json_decode(wp_remote_retrieve_body($response), true)));
        set_transient($cache_key, $body, 30 * MINUTE_IN_SECONDS);
        return $body;
    }

    private function get_domain_id() {
        // In a real scenario, this would be fetched from settings.
        // For now, mirroring the old plugin's logic or using a placeholder.
        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if ($users) {
            $login_detail = get_user_meta($users[0]->ID, 'salonist_user_login_detail', true);
            return isset($login_detail['domainId']) ? $login_detail['domainId'] : '';
        }
        return get_option('salonist_react_domain_id', '');
    }

    /*
     * Normalization layer: salonist.io / salonist.in now return FLAT records, but the compiled
     * React bundle was built for the legacy nested shape (Plan / Package / Domain / Businesshours
     * / Insdetail / Giftcardtemplate). These helpers re-wrap flat responses into that nested shape.
     * All are idempotent: an already-nested response is detected and passed through unchanged.
     */
    private function normalize_null($data) {
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $data[$k] = $this->normalize_null($v);
            }
            return $data;
        }
        return is_null($data) ? '' : $data;
    }

    private function legacy_services($body) {
        if (!is_array($body) || empty($body['services']) || !is_array($body['services'])) {
            return $body;
        }
        if (isset($body['services'][0]['Plan'])) {
            return $body;
        }
        $out = array();
        foreach ($body['services'] as $item) {
            if (!is_array($item)) continue;
            $child = isset($item['child']) ? $item['child'] : array();
            unset($item['child']);
            $out[] = array('Plan' => $item, 'Child' => $child);
        }
        $body['services'] = $out;
        if (isset($body['details']) && is_array($body['details']) && !isset($body['details']['Insdetail'])) {
            $body['details'] = array('Insdetail' => $body['details']);
        }
        return $body;
    }

    private function legacy_packages($body) {
        if (!is_array($body) || empty($body['packages']) || !is_array($body['packages'])) {
            return $body;
        }
        if (isset($body['packages'][0]['Package'])) {
            return $body;
        }
        $out = array();
        foreach ($body['packages'] as $item) {
            if (!is_array($item)) continue;
            $info = isset($item['packageinfo']) ? $item['packageinfo'] : array();
            unset($item['packageinfo']);
            $info_out = array();
            foreach ((array) $info as $row) {
                if (is_array($row) && isset($row['plan']) && !isset($row['Plan'])) {
                    $row['Plan'] = $row['plan'];
                    unset($row['plan']);
                }
                $info_out[] = $row;
            }
            $out[] = array('Package' => $item, 'Packageinfo' => $info_out);
        }
        $body['packages'] = $out;
        return $body;
    }

    private function legacy_locations($body) {
        if (!is_array($body) || empty($body['locations']) || !is_array($body['locations'])) {
            return $body;
        }
        if (isset($body['locations'][0]['Domain'])) {
            return $body;
        }
        $out = array();
        foreach ($body['locations'] as $item) {
            if (!is_array($item)) continue;
            $admin  = isset($item['admin'])  ? $item['admin']  : array();
            $detail = isset($item['detail']) ? $item['detail'] : array();
            unset($item['admin'], $item['detail']);
            $out[] = array('Domain' => $item, 'Detail' => $detail, 'Admin' => $admin);
        }
        $body['locations'] = $out;
        return $body;
    }

    private function legacy_business_hours($body) {
        if (!is_array($body)) {
            return $body;
        }
        if (isset($body['list']) && is_array($body['list'])) {
            $first = reset($body['list']);
            if (is_array($first) && !isset($first['Businesshours'])) {
                $wrapped = array();
                foreach ($body['list'] as $k => $row) {
                    $wrapped[$k] = array('Businesshours' => $row);
                }
                $body['list'] = $wrapped;
            }
        }
        if (isset($body['details']) && is_array($body['details']) && !isset($body['details']['Insdetail'])) {
            $body['details'] = array('Insdetail' => $body['details']);
        }
        return $body;
    }

    private function legacy_domain_detail($body) {
        if (!is_array($body) || !isset($body['domaindetail']) || !is_array($body['domaindetail'])) {
            return $body;
        }
        if (empty($body['domaindetail']['currency']) && !empty($body['domainadmin']['currency'])) {
            $body['domaindetail']['currency'] = $body['domainadmin']['currency'];
        }
        if (empty($body['domaindetail']['currency_type']) && !empty($body['domainadmin']['currency_type'])) {
            $body['domaindetail']['currency_type'] = $body['domainadmin']['currency_type'];
        }
        return $body;
    }

    private function legacy_giftcards($body) {
        if (!is_array($body)) {
            return $body;
        }
        foreach (array('giftcards', 'templates', 'list', 'data') as $key) {
            if (!empty($body[$key]) && is_array($body[$key]) && isset($body[$key][0]) && is_array($body[$key][0])) {
                if (!isset($body[$key][0]['Giftcardtemplate'])) {
                    $body[$key] = array_map(function ($row) {
                        return array('Giftcardtemplate' => $row);
                    }, $body[$key]);
                }
                break;
            }
        }
        return $body;
    }

    public function get_services($request) {
        $domain_id = $request->get_param('domainId');
        if (empty($domain_id)) {
            $domain_id = $this->get_domain_id();
        }
        
        $response = wp_remote_post('https://salonist.io/wordpressapi/services', array(
            'body' => array('domainId' => $domain_id)
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch services', array('status' => 500));
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        return $this->normalize_null($this->legacy_services($body));
    }

    public function get_packages() {
        $domain_id = $this->get_domain_id();
        $response = wp_remote_post('https://salonist.io/wordpressapi/packages', array(
            'body' => array('domainId' => $domain_id)
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch packages', array('status' => 500));
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        return $this->normalize_null($this->legacy_packages($body));
    }

    public function get_giftcards() {
        $domain_id = $this->get_domain_id();
        $response = wp_remote_post('https://salonist.io/webapi/giftcards_templates', array(
            'body' => array('domainId' => $domain_id)
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch giftcards', array('status' => 500));
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        return $this->normalize_null($this->legacy_giftcards($body));
    }

    public function save_admin_settings($request) {
        $params = $request->get_json_params();
        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        
        if (!$users) {
            return new WP_Error('not_connected', 'Please connect to Salonist first', array('status' => 400));
        }

        $user_id = $users[0]->ID;
        
        foreach ($params as $key => $value) {
            update_user_meta($user_id, $key, $value);
        }

        return array('success' => true, 'message' => 'Settings saved successfully');
    }

    public function get_orders($request) {
        global $wpdb;
        $page = (int) ($request->get_param('page') ?: 1);
        $per_page = (int) ($request->get_param('per_page') ?: 10);
        $search = $request->get_param('search') ?: '';
        $status = $request->get_param('status') ?: '';
        
        if ($page < 1) $page = 1;
        if ($per_page < 1) $per_page = 10;
        $offset = ($page - 1) * $per_page;
        
        $table_name = $wpdb->prefix . "appointment_orders";
        
        $where = " WHERE 1=1 ";
        $query_params = [];
        
        if (!empty($search)) {
            $search_like = '%' . $wpdb->esc_like($search) . '%';
            $where .= " AND (services_details LIKE %s OR txn_id LIKE %s OR order_status LIKE %s OR payment_type LIKE %s)";
            $query_params[] = $search_like;
            $query_params[] = $search_like;
            $query_params[] = $search_like;
            $query_params[] = $search_like;
        }

        if (!empty($status) && $status !== 'all') {
            $where .= " AND order_status = %s";
            $query_params[] = $status;
        }
        
        // Count total for pagination
        if (empty($query_params)) {
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Custom table query required
            $total_items = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}appointment_orders");
        } else {
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Dynamic WHERE clause
            $total_items = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}appointment_orders {$where}", ...$query_params));
        }

        // Fetch results
        $sql = "SELECT * FROM {$wpdb->prefix}appointment_orders {$where} ORDER BY order_date DESC LIMIT %d, %d";
        $final_params = array_merge($query_params, [$offset, $per_page]);
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Dynamic WHERE clause with pagination
        $results = $wpdb->get_results($wpdb->prepare($sql, ...$final_params), ARRAY_A);
        
        // Normalize column names for JavaScript
        foreach ($results as &$row) {
            if (isset($row['Paid'])) $row['paid'] = $row['Paid'];
            if (isset($row['Balance'])) $row['balance'] = $row['Balance'];
            
            // Decrypt details to find crm_order_ids if they exist
            try {
                $details = json_decode($row['services_details'], true);
                $row['crm_order_ids'] = $details['crm_order_ids'] ?? [];
                $row['sync_log'] = $details['sync_log'] ?? [];
            } catch (\Exception $e) {
                $row['crm_order_ids'] = [];
                $row['sync_log'] = [];
            }

            // Ensure order_date is available and potentially formatted
            $row['created_at'] = $row['order_date'];
        }
        
        return [
            'orders' => $results,
            'total' => (int) $total_items,
            'page' => $page,
            'per_page' => $per_page,
            'total_pages' => ceil($total_items / $per_page)
        ];
    }

    public function delete_orders($request) {
        global $wpdb;
        $params = $request->get_json_params();
        $order_ids = $params['order_ids'] ?? [];

        if (empty($order_ids) || !is_array($order_ids)) {
            return new WP_Error('invalid_params', 'No order IDs provide', array('status' => 400));
        }

        $placeholders = array_fill(0, count($order_ids), '%d');
        $format = implode(', ', $placeholders);
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare -- Dynamic IN clause
        $deleted = $wpdb->query(
            // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare
            $wpdb->prepare(
                "DELETE FROM {$wpdb->prefix}appointment_orders WHERE order_id IN ({$format})",
                ...$order_ids
            )
        );

        if ($deleted === false) {
            return new WP_Error('db_error', 'Failed to delete orders', array('status' => 500));
        }

        return array('success' => true, 'deleted_count' => $deleted);
    }

    private function normalize_bool($value) {
        return $value === true || $value === 'true' || $value === 'on' || $value === 1 || $value === '1';
    }

    public function get_public_settings() {
        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        $data = array();
        if ($users) {
            $user_id = $users[0]->ID;
            $login_detail = get_user_meta($user_id, 'salonist_user_login_detail', true);
            $domain_id = isset($login_detail['domainId']) ? $login_detail['domainId'] : (isset($login_detail['domain_id']) ? $login_detail['domain_id'] : '');
            
            // Fetch remote domain details for currency and deposits
    $currency = get_user_meta($user_id, 'currency', true);
    if (!$currency) {
        $currency = get_transient('salonist_app_currency_v5_' . $domain_id);
    }
    // Fetch domain detail ONCE and cache it (1h). Reused for deposit settings below, so the
    // slow salonist.io call happens at most once per hour instead of twice on every page load.
    $domain_detail = array();
    if (!empty($domain_id)) {
        $domain_detail = get_transient('salonist_domain_detail_v1_' . $domain_id);
        if ($domain_detail === false) {
            $domain_detail = array();
            $remote_response = wp_remote_post('https://salonist.io/webapicustomer/domain_detail', array(
                'body' => array('domainId' => $domain_id),
                'timeout' => 12,
                'sslverify' => false
            ));
            if (!is_wp_error($remote_response)) {
                $decoded = json_decode(wp_remote_retrieve_body($remote_response), true);
                if (is_array($decoded)) {
                    $domain_detail = $decoded;
                }
            }
            set_transient('salonist_domain_detail_v1_' . $domain_id, $domain_detail, HOUR_IN_SECONDS);
        }
        if (!$currency && isset($domain_detail['domaindetail']['currency'])) {
            $currency = $domain_detail['domaindetail']['currency'];
            set_transient('salonist_app_currency_v5_' . $domain_id, $currency, HOUR_IN_SECONDS);
        }
    }

    if (!$currency) {
        $currency = '₹';
    }

    $remote_deposit_option = $domain_detail['domaindetail']['deposit_option'] ?? '';
    $remote_deposit_amount = $domain_detail['domaindetail']['deposit_amount'] ?? '';

    $data = array(
        'currency' => $currency,
                
                // Booking features
                'enable_coupons' => $this->normalize_bool(get_user_meta($user_id, 'enable_coupons', true)),
                'enable_packages' => $this->normalize_bool(get_user_meta($user_id, 'enable_packages', true)),
                'enable_partial_payment' => $this->normalize_bool(get_user_meta($user_id, 'enable_partial_payment', true)),
                'enable_multi_booking' => $this->normalize_bool(get_user_meta($user_id, 'enable_multi_booking', true)),
                'partial_payment_percentage' => get_user_meta($user_id, 'partial_payment_percentage', true) ?: 50,
                'local_deposit_option' => get_user_meta($user_id, 'local_deposit_option', true) ?: 'percentage',
                'local_deposit_amount' => get_user_meta($user_id, 'local_deposit_amount', true) ?: 0,
                
                // Remote deposit settings (Sync from CRM)
                'deposit_option' => $remote_deposit_option,
                'deposit_amount' => $remote_deposit_amount,

                'enable_multilanguage' => $this->normalize_bool(get_user_meta($user_id, 'enable_multilanguage', true)),
                
                'cod_enable' => $this->normalize_bool(get_user_meta($user_id, 'cod_enable', true)),
                'enable_vat' => $this->normalize_bool(get_user_meta($user_id, 'enable_vat', true)),
                'vat_percentage' => get_user_meta($user_id, 'vat_percentage', true) ?: 0,
                
                'paypal_enable' => $this->normalize_bool(get_user_meta($user_id, 'paypal_enable', true)),
                'paypal_mode' => get_user_meta($user_id, 'paypal_mode', true) ?: 'sandbox',
                'paypal_client_id' => get_user_meta($user_id, 'paypal_client_id', true),
                'paypal_card_enable' => $this->normalize_bool(get_user_meta($user_id, 'paypal_card_enable', true)),
                
                'stripe_enable' => $this->normalize_bool(get_user_meta($user_id, 'stripe_enable', true)),
                'stripe_mode' => get_user_meta($user_id, 'stripe_mode', true) ?: 'test',
                'stripe_test_publish_key' => get_user_meta($user_id, 'stripe_test_publish_key', true),
                'stripe_live_publish_key' => get_user_meta($user_id, 'stripe_live_publish_key', true),
                'stripe_test_secret_key' => current_user_can('manage_options') ? get_user_meta($user_id, 'stripe_test_secret_key', true) : '',
                'stripe_live_secret_key' => current_user_can('manage_options') ? get_user_meta($user_id, 'stripe_live_secret_key', true) : '',
                'paypal_secret' => current_user_can('manage_options') ? get_user_meta($user_id, 'paypal_secret', true) : '',
                
                'razorpay_enable' => $this->normalize_bool(get_user_meta($user_id, 'razorpay_enable', true)),
                'razorpay_key_id' => get_user_meta($user_id, 'razorpay_key_id', true),
                'razorpay_key_secret' => current_user_can('manage_options') ? get_user_meta($user_id, 'razorpay_key_secret', true) : '',
                
                'paytab_enable' => $this->normalize_bool(get_user_meta($user_id, 'paytab_enable', true)),
                'paytab_mode' => get_user_meta($user_id, 'paytab_mode', true) ?: 'test',
                'paytab_profile_id' => get_user_meta($user_id, 'paytab_profile_id', true),
                'paytab_server_key' => current_user_can('manage_options') ? get_user_meta($user_id, 'paytab_server_key', true) : '',

                'telr_enable' => $this->normalize_bool(get_user_meta($user_id, 'telr_enable', true)),
                'telr_mode' => get_user_meta($user_id, 'telr_mode', true) ?: 'test',
                'telr_store_id' => get_user_meta($user_id, 'telr_store_id', true),
                'telr_auth_key' => current_user_can('manage_options') ? get_user_meta($user_id, 'telr_auth_key', true) : '',

                'myfatoorah_enable' => $this->normalize_bool(get_user_meta($user_id, 'myfatoorah_enable', true)),
                'myfatoorah_mode' => get_user_meta($user_id, 'myfatoorah_mode', true) ?: 'test',
                'myfatoorah_token' => current_user_can('manage_options') ? get_user_meta($user_id, 'myfatoorah_token', true) : '',

                'gpay_qr_enable' => $this->normalize_bool(get_user_meta($user_id, 'gpay_qr_enable', true)),
                'gpay_vpa' => get_user_meta($user_id, 'gpay_vpa', true),
                'translations' => array_merge(array(
                    'book_appointment' => 'Book Appointment',
                    'select_branch' => 'Select branch',
                    'select_service' => 'Select a Service Plan',
                    'select_package' => 'Select a Package',
                    'choose_specialist' => 'Choose your specialist',
                    'no_preference' => 'No Preference',
                    'fastest_availability' => 'Fastest availability',
                    'pick_date' => 'Pick a Date',
                    'available_slots' => 'Available Slots',
                    'your_details' => 'Your Details',
                    'full_name' => 'Full Name',
                    'phone_number' => 'Phone Number',
                    'email_address' => 'Email Address',
                    'confirm_book' => 'Confirm & Book',
                    'booking_confirmed' => 'Booking Confirmed!',
                    'back' => 'Back',
                    'next' => 'Next',
                    'pay_now' => 'Pay Now',
                    'back_to_plans' => 'Back to Plans',
                    'back_to_services' => 'Back to Services',
                    'appointment_receipt' => 'Appointment Receipt',
                    'continue' => 'Continue',
                    'next_step_details' => 'Next Step: Your Details',
                    'back_to_specialist' => 'Back to Specialist Selection',
                    'back_to_packages' => 'Back to Packages',
                    'back_to_calendar' => 'Back to Calendar',
                    'back_to_details' => 'Back to Details',
                    'view_included_services' => 'View Included Services',
                    'hide_included_services' => 'Hide Included Services',
                    'final_summary' => 'Final Summary',
                    'proceed_review' => 'Proceed to Review',
                    'select_location_sub' => 'Pick a location to browse services',
                    'service' => 'Service',
                    'specialist' => 'Specialist',
                    'branch' => 'Branch',
                    'date_time' => 'Date & Time',
                    'amount_paid' => 'Amount Paid',
                    'total_amount' => 'Total Amount',
                    'customer_info' => 'Customer Information',
                    'balance_due_msg' => 'Balance to be paid at salon',
                    'select_service_sub' => 'Choose a category to continue',
                    'change_location' => 'Change Location',
                    'treatments_available' => 'Treatments Available',
                    'you_are_booking' => 'You are booking',
                    'almost_there' => 'Almost there! We just need a few details.',
                    'verify_details' => 'Verify your appointment details below',
                    'booking_slot' => 'Booking Slot',
                    'branch_location' => 'Branch Location',
                    'service_selected' => 'Service Selected',
                    'guest_name' => 'Guest Name',
                    'contact_number' => 'Contact Number',
                    'deposit_required' => 'Deposit Required',
                    'total_to_pay' => 'Total Payable',
                    'secure_payment' => 'SECURE PAYMENT',
                    'pay_at_salon' => 'At Salon',
                    'credit_card' => 'Credit Card',
                    'paypal' => 'PayPal',
                    'razorpay' => 'Razorpay',
                    'paytab' => 'PayTab',
                    'telr' => 'Telr',
                    'myfatoorah' => 'MyFatoorah',
                    'gpay' => 'UPI / GPay',
                    'start_date' => 'Start Date',
                    'validity' => 'Validity',
                    'expiry_date' => 'Expiry Date',
                    'requires_partial' => 'Requires Partial Payment',
                    'remaining_balance' => 'Remaining Balance',
                    'promo_placeholder' => 'ENTER PROMO CODE',
                    'apply' => 'Apply',
                    'print_receipt' => 'Print Receipt',
                    'book_another' => 'Book Another Service',
                    'print_confirmation' => 'Print Confirmation',
                    'powered_by' => 'Secure Booking Powered by Salonist',
                    'services' => 'Services',
                    'packages' => 'Packages',
                    'price' => 'Price',
                    'selected_date_label' => 'Selected Date',
                    'select_slot_warning' => 'Please select a time slot to continue',
                    'select_date_instruction' => 'Please select a date from the calendar to view availability',
                    'no_date_selected' => 'No date selected',
                    'pick_date_first' => 'Please pick a date on the left first.',
                    'finding_availability' => 'Finding availability...',
                    'no_slots_found' => 'No slots found',
                    'try_another_day' => 'Try another day or specialist.',
                    'days_advance' => 'days advance',
                    'up_to' => 'Up to',
                    'appointment' => 'Appointment',
                    'booking_slot' => 'Booking Slot',
                    'branch_location' => 'Branch Location',
                    'service_selected' => 'Service Selected',
                    'date_time' => 'Date & Time',
                    'at' => 'at',
                    'package_details' => 'Package Details',
                    'premium_package' => 'Premium Package',
                    'start_date' => 'Start Date',
                    'validity' => 'Validity',
                    'active_until' => 'Active Until (Expiry)',
                    'customer_info' => 'Customer Info',
                    'guest_name' => 'Guest Name',
                    'contact_number' => 'Contact Number',
                    'email_address' => 'Email Address',
                    'you_are_booking' => 'You are booking',
                    'date_label' => 'Date',
                    'time' => 'Time',
                    'total' => 'Total',
                    'optional_confirmation' => 'Optional - For booking confirmation',
                    'you_selected' => 'You selected',
                    'pay_and_book_now' => 'Pay & Book Now',
                    'cardholder_name' => 'Cardholder Name',
                    'card_details' => 'Card Details',
                    'name_validation' => 'Name must be at least 2 characters',
                    'phone_validation' => 'Please enter a valid phone number',
                    'email_validation' => 'Please enter a valid email address',
                    'fill_required_fields' => 'Please fill all required fields',
                    'select_payment_method' => 'Please select a payment method above',
                ), get_user_meta($user_id, 'translations', true) ?: array()),
                'arabic_translations' => array_merge(array(
                    'book_appointment' => 'احجز موعد',
                    'select_branch' => 'اختر الفرع',
                    'select_service' => 'اختر خطة الخدمة',
                    'select_package' => 'اختر الباقة',
                    'choose_specialist' => 'اختر المختص',
                    'no_preference' => 'لا تفضيل',
                    'fastest_availability' => 'أسرع توفر',
                    'pick_date' => 'اختر التاريخ',
                    'available_slots' => 'الأوقات المتاحة',
                    'your_details' => 'بياناتك',
                    'full_name' => 'الاسم الكامل',
                    'phone_number' => 'رقم الهاتف',
                    'email_address' => 'البريد الإلكتروني',
                    'confirm_book' => 'تأكيد الحجز',
                    'booking_confirmed' => 'تم تأكيد الحجز!',
                    'back' => 'رجوع',
                    'next' => 'التالي',
                    'pay_now' => 'ادفع الآن',
                    'back_to_plans' => 'العودة إلى الخطط',
                    'back_to_services' => 'العودة إلى الخدمات',
                    'appointment_receipt' => 'إيصال الموعد',
                    'continue' => 'متابعة',
                    'next_step_details' => 'الخطوة التالية: التفاصيل',
                    'back_to_specialist' => 'العودة لاختيار المختص',
                    'back_to_packages' => 'العودة للباقات',
                    'back_to_calendar' => 'العودة للتقويم',
                    'back_to_details' => 'العودة للتفاصيل',
                    'view_included_services' => 'عرض الخدمات المضمنة',
                    'hide_included_services' => 'إخفاء الخدمات المضمنة',
                    'final_summary' => 'الملخص النهائي',
                    'proceed_review' => 'متابعة للمراجعة',
                    'select_location_sub' => 'اختر موقعاً لاستعراض الخدمات',
                    'service' => 'الخدمة',
                    'specialist' => 'المختص',
                    'branch' => 'الفرع',
                    'date_time' => 'التاريخ والوقت',
                    'amount_paid' => 'المبلغ المدفوع',
                    'total_amount' => 'المبلغ الإجمالي',
                    'customer_info' => 'معلومات العميل',
                    'balance_due_msg' => 'الرصيد المتبقي يدفع في الصالون',
                    'select_service_sub' => 'اختر فئة للمتابعة',
                    'change_location' => 'تغيير الموقع',
                    'treatments_available' => 'العلاجات المتاحة',
                    'you_are_booking' => 'أنت تحجز',
                    'almost_there' => 'أوشكت على الانتهاء! نحتاج بضعة تفاصيل.',
                    'verify_details' => 'تحقق من تفاصيل موعدك أدناه',
                    'booking_slot' => 'موعد الحجز',
                    'branch_location' => 'موقع الفرع',
                    'service_selected' => 'الخدمة المختارة',
                    'guest_name' => 'اسم الضيف',
                    'contact_number' => 'رقم الاتصال',
                    'deposit_required' => 'تأمين مطلوب',
                    'total_to_pay' => 'إجمالي المطلوب دفعه',
                    'secure_payment' => 'دفع آمن',
                    'pay_at_salon' => 'في الصالون',
                    'credit_card' => 'بطاقة ائتمان',
                    'paypal' => 'باي بال',
                    'razorpay' => 'رازورباي',
                    'paytab' => 'باي تاب',
                    'telr' => 'تيلر',
                    'myfatoorah' => 'ماي فاتورة',
                    'gpay' => 'جوجل باي / UPI',
                    'start_date' => 'تاريخ البدء',
                    'validity' => 'الصلاحية',
                    'expiry_date' => 'تاريخ الانتهاء',
                    'requires_partial' => 'يتطلب دفع جزئي',
                    'remaining_balance' => 'الرصيد المتبقي',
                    'promo_placeholder' => 'أدخل كود الخصم',
                    'apply' => 'تطبيق',
                    'print_receipt' => 'طباعة الإيصال',
                    'book_another' => 'حجز خدمة أخرى',
                    'print_confirmation' => 'طباعة التأكيد',
                    'powered_by' => 'حجز آمن بواسطة صالونيست',
                    'services' => 'الخدمات',
                    'packages' => 'الباقات',
                    'price' => 'السعر',
                    'selected_date_label' => 'التاريخ المختار',
                    'select_slot_warning' => 'يرجى اختيار وقت للمتابعة',
                    'select_date_instruction' => 'يرجى اختيار تاريخ من التقويم لعرض الأوقات المتاحة',
                    'no_date_selected' => 'لم يتم اختيار تاريخ',
                    'pick_date_first' => 'يرجى اختيار تاريخ من اليسار أولاً',
                    'finding_availability' => 'جاري البحث عن التوفر...',
                    'no_slots_found' => 'لا توجد أوقات متاحة',
                    'try_another_day' => 'جرب يوماً آخر أو مختصاً آخر',
                    'days_advance' => 'أيام مقدماً',
                    'up_to' => 'حتى',
                    'appointment' => 'الموعد',
                    'booking_slot' => 'فترة الحجز',
                    'branch_location' => 'موقع الفرع',
                    'service_selected' => 'الخدمة المختارة',
                    'date_time' => 'التاريخ والوقت',
                    'at' => 'الساعة',
                    'package_details' => 'تفاصيل الباقة',
                    'premium_package' => 'باقة مميزة',
                    'start_date' => 'تاريخ البدء',
                    'validity' => 'الصلاحية',
                    'active_until' => 'صالح حتى',
                    'customer_info' => 'معلومات العميل',
                    'guest_name' => 'اسم الضيف',
                    'contact_number' => 'رقم الاتصال',
                    'email_address' => 'البريد الإلكتروني',
                    'you_are_booking' => 'أنت تحجز',
                    'date_label' => 'التاريخ',
                    'time' => 'الوقت',
                    'total' => 'المجموع',
                    'optional_confirmation' => 'اختياري - لتأكيد الحجز',
                    'you_selected' => 'لقد اخترت',
                    'pay_and_book_now' => 'ادفع واحجز الآن',
                    'cardholder_name' => 'اسم حامل البطاقة',
                    'card_details' => 'تفاصيل البطاقة',
                    'name_validation' => 'يجب أن يتكون الاسم من حرفين على الأقل',
                    'phone_validation' => 'يرجى إدخال رقم هاتف صحيح',
                    'email_validation' => 'يرجى إدخال بريد إلكتروني صحيح',
                    'fill_required_fields' => 'يرجى ملء جميع الحقول المطلوبة',
                    'select_payment_method' => 'يرجى اختيار طريقة الدفع أعلاه',
                ), get_user_meta($user_id, 'arabic_translations', true) ?: array()),
                'primary_color' => get_user_meta($user_id, 'primary_color', true) ?: '#4f46e5',
                'secondary_color' => get_user_meta($user_id, 'secondary_color', true) ?: '#f8fafc',
                'text_on_primary' => get_user_meta($user_id, 'text_on_primary', true) ?: '#ffffff',
                'header_bg_color' => get_user_meta($user_id, 'header_bg_color', true) ?: '#ffffff',
                'header_text_color' => get_user_meta($user_id, 'header_text_color', true) ?: '#1e293b',
                'border_radius' => get_user_meta($user_id, 'border_radius', true) ?: '1.5rem',
                'custom_css' => get_user_meta($user_id, 'custom_css', true) ?: ''
            );

            // Reuse the domain detail already fetched/cached above (no second HTTP call).
            if (isset($domain_detail['domaindetail'])) {
                $dd = $domain_detail['domaindetail'];
                $data['deposit_option'] = isset($dd['deposit_option']) ? $dd['deposit_option'] : '';
                $data['deposit_amount'] = isset($dd['deposit_amount']) ? $dd['deposit_amount'] : '';
                $data['max_advance']    = isset($dd['max_advance']) ? $dd['max_advance'] : 30; // default 30 days
            }
        }
        return $data;
    }
    public function stripe_create_intent($request) {
        $params = $request->get_json_params();
        $amount_raw = isset($params['amount']) ? $params['amount'] : 0;
        $amount = intval(floatval($amount_raw) * 100); // Amount in cents
        $currency = isset($params['currency']) ? strtolower($params['currency']) : 'php';

        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if (!$users) return new WP_Error('no_user', 'User not found', array('status' => 404));
        $user_id = $users[0]->ID;

        $mode = get_user_meta($user_id, 'stripe_mode', true) ?: 'test';
        $secret_key = $mode === 'test' ? get_user_meta($user_id, 'stripe_test_secret_key', true) : get_user_meta($user_id, 'stripe_live_secret_key', true);

        if (!$secret_key) return new WP_Error('no_key', 'Stripe secret key not configured', array('status' => 400));

        $response = wp_remote_post('https://api.stripe.com/v1/payment_intents', array(
            'timeout' => 60,
            'headers' => array(
                'Authorization' => 'Bearer ' . $secret_key,
                'Content-Type' => 'application/x-www-form-urlencoded'
            ),
            'body' => http_build_query(array(
                'amount' => $amount,
                'currency' => $currency,
                'payment_method_types' => array('card')
            ))
        ));

        if (is_wp_error($response)) return $response;

        $body = json_decode(wp_remote_retrieve_body($response), true);
        if (isset($body['error'])) {
            return new WP_Error('stripe_error', $body['error']['message'], array('status' => 400));
        }

        return array('clientSecret' => $body['client_secret']);
    }

    public function razorpay_create_order($request) {
        $params = $request->get_json_params();
        $amount = isset($params['amount']) ? intval(floatval($params['amount']) * 100) : 0;
        $currency = isset($params['currency']) ? $params['currency'] : 'INR';

        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if (!$users) return new WP_Error('no_user', 'User not found', array('status' => 404));
        $user_id = $users[0]->ID;

        $key_id = get_user_meta($user_id, 'razorpay_key_id', true);
        $key_secret = get_user_meta($user_id, 'razorpay_key_secret', true);

        if (!$key_id || !$key_secret) return new WP_Error('no_key', 'Razorpay keys not configured', array('status' => 400));

        $auth = base64_encode($key_id . ':' . $key_secret);
        
        $response = wp_remote_post('https://api.razorpay.com/v1/orders', array(
            'timeout' => 60,
            'headers' => array(
                'Authorization' => 'Basic ' . $auth,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'amount' => $amount,
                'currency' => $currency,
                'receipt' => 'receipt_' . time()
            ))
        ));

        if (is_wp_error($response)) return $response;
        return json_decode(wp_remote_retrieve_body($response), true);
    }

    public function paytab_create_session($request) {
        $params = $request->get_json_params();
        $amount = isset($params['amount']) ? floatval($params['amount']) : 0;
        $currency = isset($params['currency']) ? $params['currency'] : 'AED';
        $customer = isset($params['customer']) ? $params['customer'] : array();
        $order_id = isset($params['order_id']) ? $params['order_id'] : time();

        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if (!$users) return new WP_Error('no_user', 'User not found', array('status' => 404));
        $user_id = $users[0]->ID;

        $profile_id = get_user_meta($user_id, 'paytab_profile_id', true);
        $server_key = get_user_meta($user_id, 'paytab_server_key', true);

        if (!$profile_id || !$server_key) return new WP_Error('no_key', 'Paytabs keys not configured', array('status' => 400));

        $response = wp_remote_post('https://secure.paytabs.com/payment/request', array(
            'timeout' => 60,
            'headers' => array(
                'Authorization' => $server_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'profile_id' => intval($profile_id),
                'tran_type' => 'sale',
                'tran_class' => 'ecom',
                'cart_id' => 'order_' . $order_id,
                'cart_currency' => $currency,
                'cart_amount' => $amount,
                'cart_description' => 'Booking payment #' . $order_id,
                'callback' => home_url('/'),
                'return' => add_query_arg(array('salonist_payment' => 'success', 'order_id' => $order_id), home_url('/')),
                'customer_details' => array(
                    'name' => isset($customer['firstName']) ? trim($customer['firstName'] . ' ' . ($customer['lastName'] ?? '')) : 'Customer',
                    'email' => $customer['email'] ?? 'customer@example.com',
                    'phone' => $customer['phone'] ?? '0000',
                    'street1' => 'N/A',
                    'city' => 'N/A',
                    'state' => 'N/A',
                    'country' => 'AE',
                    'zip' => '00000'
                )
            ))
        ));

        if (is_wp_error($response)) return $response;
        return json_decode(wp_remote_retrieve_body($response), true);
    }

    public function telr_create_session($request) {
        $params = $request->get_json_params();
        $amount = isset($params['amount']) ? floatval($params['amount']) : 0;
        $currency = isset($params['currency']) ? $params['currency'] : 'AED';
        $order_id = isset($params['order_id']) ? $params['order_id'] : time();

        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if (!$users) return new WP_Error('no_user', 'User not found', array('status' => 404));
        $user_id = $users[0]->ID;

        $store_id = get_user_meta($user_id, 'telr_store_id', true);
        $auth_key = get_user_meta($user_id, 'telr_auth_key', true);
        $mode = get_user_meta($user_id, 'telr_mode', true) ?: 'test';

        if (!$store_id || !$auth_key) return new WP_Error('no_key', 'Telr keys not configured', array('status' => 400));

        $response = wp_remote_post('https://secure.telr.com/gateway/order.json', array(
            'timeout' => 60,
            'headers' => array(
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'ivp_method' => 'create',
                'ivp_store' => $store_id,
                'ivp_authkey' => $auth_key,
                'ivp_cart' => 'order_' . $order_id,
                'ivp_test' => ($mode === 'test' ? 1 : 0),
                'ivp_amount' => $amount,
                'ivp_currency' => $currency,
                'ivp_desc' => 'Booking payment #' . $order_id,
                'return_auth' => add_query_arg(array('salonist_payment' => 'success', 'order_id' => $order_id), home_url('/')),
                'return_can' => home_url('/'),
                'return_decl' => home_url('/'),
            ))
        ));

        if (is_wp_error($response)) return $response;
        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if (isset($body['order']['url'])) {
            return array('redirect_url' => $body['order']['url']);
        }
        
        return $body;
    }

    private function get_admin_user_id() {
        // phpcs:ignore WordPress.DB.SlowDBQuery
        $users = get_users(array('meta_key' => 'salonist_user_login_detail', 'number' => 1));
        if ($users) {
            return $users[0]->ID;
        }
        return 0;
    }

    public function myfatoorah_init_payment($request) {
        $booking_id = $request->get_param('booking_id') ?: '0';
        $amount = $request->get_param('amount');
        $currency = $request->get_param('currency') ?: 'KWD';
        $customer_name = $request->get_param('name') ?: 'Guest Customer';
        $customer_phone = $request->get_param('phone') ?: '';
        $customer_email = $request->get_param('email') ?: '';

        $user_id = $this->get_admin_user_id();
        if (!$user_id) {
            wp_die('Error: Salonist admin user not found. Please connect the plugin first.');
        }

        // Try new keys first, then fallback to old plugin keys
        $token = get_user_meta($user_id, 'myfatoorah_token', true);
        if (empty($token)) {
            $token = get_user_meta($user_id, 'fatoorah_business_email', true);
        }

        $mode = get_user_meta($user_id, 'myfatoorah_mode', true);
        if (empty($mode)) {
            $mode = (get_user_meta($user_id, 'enable_fatoorah_sandbox', true) === 'on') ? 'test' : 'live';
        }
        
        if (empty($token)) {
            wp_die('Error: MyFatoorah API Token is not configured in Admin settings.');
        }

        $is_test = ($mode === 'test' || $mode === 'sandbox');
        $base_url = $is_test ? 'https://apitest.myfatoorah.com' : 'https://api.myfatoorah.com';
        
        // Define Callback URLs
        $callback_url = add_query_arg(array(
            'salonist_payment' => 'myfatoorah',
            'status' => 'success',
            'booking_id' => $booking_id
        ), home_url('/'));

        $error_url = add_query_arg(array(
            'salonist_payment' => 'myfatoorah',
            'status' => 'error',
            'booking_id' => $booking_id
        ), home_url('/'));

        // Sanitize phone number for MyFatoorah (max 11 chars for CustomerMobile)
        // Extract country code if present
        $mobile = preg_replace('/[^0-9]/', '', $customer_phone);
        $country_code = '';
        
        if (strpos($customer_phone, '+') === 0) {
            if (strlen($mobile) > 10) {
                $country_code = substr($mobile, 0, strlen($mobile) - 10);
                $mobile = substr($mobile, -10);
            }
        }

        // MyFatoorah only supports a specific list of currencies (mostly Middle Eastern + USD/EUR).
        // PHP is NOT supported and will always cause a "Bad Request" error.
        $supported_currencies = array('KWD', 'SAR', 'AED', 'BHD', 'OMR', 'QAR', 'JOD', 'EGP', 'USD', 'EUR', 'GBP');
        $display_currency = strtoupper($currency);

        // If the currency is not supported (like PHP), fallback to KWD
        if (!in_array($display_currency, $supported_currencies)) {
            $display_currency = 'KWD';
        }

        // Force KWD in test mode regardless to ensure sandbox success
        if ($is_test) {
            $display_currency = 'KWD'; 
        }

        $body = array(
            'NotificationOption' => 'Lnk',
            'InvoiceValue'       => $amount,
            'CustomerName'       => $customer_name ?: '',
            'DisplayCurrencyIso' => $display_currency,
            'CallBackUrl'        => $callback_url,
            'ErrorUrl'           => $error_url,
            'Language'           => 'en',
            'CustomerMobile'     => !empty($mobile) ? substr($mobile, 0, 11) : '',
            'CustomerEmail'      => $customer_email ?: '',
        );

        if (!empty($country_code)) {
            $body['MobileCountryCode'] = '+' . $country_code;
        }

        $response = wp_remote_post($base_url . '/v2/SendPayment', array(
            'timeout' => 60,
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type'  => 'application/json'
            ),
            'body' => json_encode($body)
        ));

        if (is_wp_error($response)) {
            wp_die('MyFatoorah API Connection Failed: ' . esc_html($response->get_error_message()));
        }

        $result = json_decode(wp_remote_retrieve_body($response), true);
        
        if (isset($result['IsSuccess']) && $result['IsSuccess'] && isset($result['Data']['InvoiceURL'])) {
            return array(
                'status' => 'success',
                'redirect_url' => $result['Data']['InvoiceURL']
            );
        } else {
            $message = isset($result['Message']) ? $result['Message'] : 'Unknown error';
            if (isset($result['ValidationErrors'])) {
                $message .= ' (' . json_encode($result['ValidationErrors']) . ')';
            }
            return new WP_Error('myfatoorah_error', 'MyFatoorah Payment Initialization Error: ' . $message . ' (Mode: ' . $mode . ', Sent Currency: ' . $display_currency . ', Original: ' . $currency . ')');
        }
    }
}
