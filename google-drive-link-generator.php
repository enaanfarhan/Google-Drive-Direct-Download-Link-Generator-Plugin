<?php
/*
* Plugin Name: 	Google Drive Link Generator
* Plugin URI: 	https://technologish.com
* Description: 	A simple plugin to generate direct download links for files stored in Google Drive.
* Author:		Enaan Farhan
* Author URI: 	https://technologish.com
* License:      GPLv3
* License URI:  http://www.gnu.org/licenses/gpl.html
* Version: 		1.0.1
* Text Domain: 	google-drive-link-generator
*/

// Enqueue plugin scripts and styles
function gd_link_generator_enqueue_scripts() {
    wp_enqueue_style('gd-link-generator-style', plugin_dir_url(__FILE__) . 'style.css');
    wp_enqueue_script('gd-link-generator-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), null, true);
}

add_action('wp_enqueue_scripts', 'gd_link_generator_enqueue_scripts');

// Shortcode function
function gd_link_generator_shortcode() {
    ob_start(); ?>
			<div id="gd-link-generator">
		  <div class="input-box">
			<label for="sharing-url">Enter Your Sharing URL:</label>
			<input type="text" id="sharing-url" placeholder="https://drive.google.com/file/d/..." />
		  </div>
		  <button id="generate-link-btn">Generate Direct Link</button>
		  <div class="output-box">
			<strong>Output Link:</strong>
			<div id="output-link">
			  <!-- Output link will be added dynamically -->
			</div>
			<button id="copy-link-btn">Copy Link</button>
		  </div>
		</div>

    <?php
    return ob_get_clean();
}

add_shortcode('gd_link_generator', 'gd_link_generator_shortcode');
