<?php

class Salonist_Shortcode {
    public function __construct() {
        add_shortcode('salonist_booking', array($this, 'render_booking_shortcode'));
        add_shortcode('salonist_giftcards', array($this, 'render_giftcards_shortcode'));
    }

    private function enqueue_base_assets() {
        wp_enqueue_script('salonist-appointment-app');
        wp_enqueue_style('salonist-appointment-style');
    }

    public function render_booking_shortcode($atts) {
        $this->enqueue_base_assets();
        return '<div id="salonist-booking-root" class="salonist-app-container"></div>';
    }

    public function render_giftcards_shortcode($atts) {
        $this->enqueue_base_assets();
        return '<div id="salonist-giftcards-root" class="salonist-app-container"></div>';
    }
}
