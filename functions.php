<?php
/**
 * Tros Nou theme bootstrap.
 *
 * @package Tros_Nou
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TROS_NOU_VERSION', '1.1.0' );
define( 'TROS_NOU_DIR', get_template_directory() );
define( 'TROS_NOU_URI', get_template_directory_uri() );

/**
 * Default contact URL. Override in wp-config.php before loading WordPress:
 * define( 'TROS_NOU_CONTACT_URL', 'https://example.com' );
 */
if ( ! defined( 'TROS_NOU_CONTACT_URL' ) ) {
	define( 'TROS_NOU_CONTACT_URL', 'mailto:trosnou@trosnoufilms.com' );
}

/**
 * Secondary link below email (e.g. portfolio).
 * Override in wp-config.php: define( 'TROS_NOU_SECONDARY_URL', 'https://...' );
 */
if ( ! defined( 'TROS_NOU_SECONDARY_URL' ) ) {
	define( 'TROS_NOU_SECONDARY_URL', 'https://readymag.website/u1424541209/6545478/' );
}

require_once TROS_NOU_DIR . '/inc/customizer.php';
require_once TROS_NOU_DIR . '/inc/theme-updates.php';

/**
 * Theme setup.
 */
function tros_nou_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Menú principal', 'tros-nou' ),
		)
	);
}
add_action( 'after_setup_theme', 'tros_nou_setup' );

/**
 * Enqueue front-end assets.
 */
function tros_nou_enqueue_assets() {
	wp_enqueue_style(
		'tros-nou-main',
		TROS_NOU_URI . '/assets/css/main.css',
		array(),
		TROS_NOU_VERSION
	);

	wp_enqueue_script(
		'tros-nou-main',
		TROS_NOU_URI . '/assets/js/main.js',
		array(),
		TROS_NOU_VERSION,
		true
	);

	wp_add_inline_style(
		'tros-nou-main',
		':root { --tn-black: ' . tros_nou_get_contact_bg_color() . '; }'
	);
}
add_action( 'wp_enqueue_scripts', 'tros_nou_enqueue_assets' );

/**
 * Theme favicon from bundled logo.
 */
function tros_nou_site_icon() {
	if ( has_site_icon() ) {
		return;
	}

	$favicon = TROS_NOU_URI . '/assets/images/favicon.png';
	echo '<link rel="icon" href="' . esc_url( $favicon ) . '" type="image/png">' . "\n";
}
add_action( 'wp_head', 'tros_nou_site_icon', 5 );

/**
 * Contact email from Customizer (with legacy fallback).
 */
function tros_nou_get_contact_email() {
	$email = get_theme_mod( 'tros_nou_contact_email', '' );

	if ( ! empty( $email ) && is_email( $email ) ) {
		return sanitize_email( $email );
	}

	$legacy_url = get_theme_mod( 'tros_nou_contact_url', '' );
	if ( ! empty( $legacy_url ) && 0 === strpos( $legacy_url, 'mailto:' ) ) {
		$legacy_email = substr( $legacy_url, 7 );
		if ( is_email( $legacy_email ) ) {
			return sanitize_email( $legacy_email );
		}
	}

	$legacy_label = get_theme_mod( 'tros_nou_contact_label', '' );
	if ( ! empty( $legacy_label ) && is_email( $legacy_label ) ) {
		return sanitize_email( $legacy_label );
	}

	return 'trosnou@trosnoufilms.com';
}

/**
 * Email href — always mailto.
 */
function tros_nou_get_email_href() {
	return 'mailto:' . tros_nou_get_contact_email();
}

/**
 * Background color for the contact screen.
 */
function tros_nou_get_contact_bg_color() {
	$color = get_theme_mod( 'tros_nou_contact_bg_color', '#000000' );

	if ( empty( $color ) ) {
		return '#000000';
	}

	$sanitized = sanitize_hex_color( $color );

	return $sanitized ? $sanitized : '#000000';
}

/**
 * Secondary URL shown as «+» below the email.
 */
function tros_nou_get_secondary_url() {
	$custom = get_theme_mod( 'tros_nou_secondary_url', '' );

	if ( ! empty( $custom ) ) {
		return esc_url( $custom );
	}

	return TROS_NOU_SECONDARY_URL;
}

/**
 * Resolve contact label.
 */
function tros_nou_get_contact_label() {
	return tros_nou_get_contact_email();
}

/**
 * Hero video URL. Customizer overrides bundled provisional clip.
 */
function tros_nou_get_hero_video_url() {
	$custom = get_theme_mod( 'tros_nou_hero_video_url', '' );

	if ( ! empty( $custom ) ) {
		return esc_url( $custom );
	}

	return TROS_NOU_URI . '/assets/video/casa-entrada-liked.mp4';
}

/**
 * Hero poster / still image URL.
 */
function tros_nou_get_hero_image_url() {
	$custom = get_theme_mod( 'tros_nou_hero_image', '' );

	if ( ! empty( $custom ) ) {
		return esc_url( $custom );
	}

	return TROS_NOU_URI . '/assets/images/casa-ilustracion-bn-3-oscuro-2.png';
}
