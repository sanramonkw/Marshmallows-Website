=== Salonist Appointment ===
Contributors: salonist
Tags: appointment, booking, salon, react, scheduling
Requires at least: 5.0
Tested up to: 6.9
Stable tag: 1.0.1
Requires PHP: 7.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A React-powered appointment booking plugin compatible with all WordPress builders.

== Description ==

Salonist Appointment is a powerful, modern booking solution for salons, spas, and service-based businesses. Built with React for a smooth user experience, it allows customers to book appointments, purchase gift cards, and pay securely via multiple gateways.

= Features =
* Modern React-based booking interface
* Seamless Integration with Salonist CRM
* Support for multiple locations and staff
* Gift Cards purchase and redemption
* Multiple Payment Gateways (Stripe, PayPal, Razorpay, PayTabs, Telr)
* Mobile responsive design
* Shortcode support for all page builders

== Third-Party Services ==

This plugin relies on the following third-party services to function:

1. **Salonist CRM API** (https://salonist.io)
   - Functionality: Syncs appointments, services, staff, and customer data.
   - Data Shared: Customer booking details (name, email, phone) are sent to Salonist CRM to create appointments.
   - Privacy Policy: https://salonist.io/privacy
   - Terms of Service: https://salonist.io/terms

2. **Payment Gateways** (Optional, based on user settings)
   - **Stripe**: https://stripe.com/privacy
   - **PayPal**: https://www.paypal.com/privacy
   - **Razorpay**: https://razorpay.com/privacy
   - **PayTabs**: https://site.paytabs.com/en/privacy-policy/
   - **Telr**: https://telr.com/privacy-policy/
   - **MyFatoorah**: https://www.myfatoorah.com/privacy_policy

== Privacy & Data ==

This plugin handles user data in the following ways:
- **Data Collection**: Collects customer name, email, phone number, and booking details during the appointment process.
- **Data Storage**: Stores booking records in the local WordPress database for history and management.
- **Data Transmission**: Transmits booking data to the connected Salonist CRM account via secure API for schedule management.
- **Cookies**: Does not use cookies for tracking users, but uses local storage for session management during the booking flow.
- **Compliance**: The plugin is designed to be GDPR compliant. Data is only shared with the services listed in the Third-Party Services section as necessary for service fulfillment.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/salonist-appointment` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the Salonist Appointment menu in the admin area to configure your settings.
4. Copy the shortcode `[salonist_booking]` and paste it onto any page.

== Payment Gateway Configuration ==

= Stripe =
1. Sign up or log in to your Stripe account at https://stripe.com
2. Navigate to Developers > API keys
3. Copy your Publishable key and Secret key
4. In the plugin settings, enable Stripe and paste both keys
5. Test mode: Use test keys for development, live keys for production

= PayPal =
1. Sign up or log in to PayPal Developer at https://developer.paypal.com
2. Go to Dashboard > My Apps & Credentials
3. Create a new app or use an existing one
4. Copy your Client ID and Secret
5. In the plugin settings, enable PayPal and paste your Client ID
6. Sandbox mode: Use sandbox credentials for testing

= Razorpay =
1. Sign up or log in to Razorpay at https://razorpay.com
2. Navigate to Settings > API Keys
3. Generate new keys if needed
4. Copy your Key ID and Key Secret
5. In the plugin settings, enable Razorpay and paste both keys
6. Test mode: Use test keys before going live

== Frequently Asked Questions ==

= Does it work with Elementor? =
Yes, it works with all major page builders including Elementor, Divi, and Gutenberg via shortcodes.

= Which payment gateways are supported? =
We support Stripe, PayPal, Razorpay, PayTabs, Telr, and Cash on Delivery.

== Screenshots ==

1. Booking widget showing service selection
2. Admin dashboard with appointment management
3. Payment gateway configuration panel
4. Mobile-responsive booking interface
5. Multi-language support demonstration

== Changelog ==

= 1.0.1 =
* Compatibility: handle the updated Salonist API response format (flat records re-mapped to the structure the app expects).
* Added install/uninstall tracking.
* Creates the local orders table on activation.
* Performance: cache remote settings/locations lookups.

= 1.0.0 =
* Initial release.
