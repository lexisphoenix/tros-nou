<?php
/**
 * Theme Customizer settings.
 *
 * @package Tros_Nou
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Customizer options.
 *
 * @param WP_Customize_Manager $wp_customize Customizer instance.
 */
function tros_nou_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'tros_nou_contact',
		array(
			'title'       => 'Tros Nou — Contacto',
			'description' => 'Email, enlace + y color de la pantalla final. No hace falta tocar código.',
			'priority'    => 30,
		)
	);

	$wp_customize->add_setting(
		'tros_nou_contact_email',
		array(
			'default'           => 'trosnou@trosnoufilms.com',
			'sanitize_callback' => 'sanitize_email',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		'tros_nou_contact_email',
		array(
			'label'       => 'Email de contacto',
			'description' => 'Se mostrará en pantalla y abrirá el cliente de correo al hacer clic.',
			'section'     => 'tros_nou_contact',
			'type'        => 'email',
		)
	);

	$wp_customize->add_setting(
		'tros_nou_secondary_url',
		array(
			'default'           => 'https://readymag.website/u1424541209/6545478/',
			'sanitize_callback' => 'esc_url_raw',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		'tros_nou_secondary_url',
		array(
			'label'       => 'URL del «+»',
			'description' => 'Enlace del símbolo + debajo del email. Se abre en una pestaña nueva.',
			'section'     => 'tros_nou_contact',
			'type'        => 'url',
		)
	);

	$wp_customize->add_setting(
		'tros_nou_contact_bg_color',
		array(
			'default'           => '#000000',
			'sanitize_callback' => 'sanitize_hex_color',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'tros_nou_contact_bg_color',
			array(
				'label'       => 'Color de fondo (pantalla de contacto)',
				'description' => 'Color del fundido final y del fondo de la pantalla con el email.',
				'section'     => 'tros_nou_contact',
			)
		)
	);

	$wp_customize->add_section(
		'tros_nou_hero',
		array(
			'title'       => 'Tros Nou — Hero',
			'description' => 'Vídeo e imagen de la secuencia de entrada (opcional).',
			'priority'    => 31,
		)
	);

	$wp_customize->add_setting(
		'tros_nou_hero_video_url',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		'tros_nou_hero_video_url',
		array(
			'label'       => 'URL del vídeo hero (opcional)',
			'description' => 'Si se deja vacío, se usa el vídeo incluido en el tema.',
			'section'     => 'tros_nou_hero',
			'type'        => 'url',
		)
	);

	$wp_customize->add_setting(
		'tros_nou_hero_image',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'tros_nou_hero_image',
			array(
				'label'       => 'Imagen poster del hero (opcional)',
				'description' => 'Se muestra antes de cargar el vídeo. Si se deja vacía, se usa la del tema.',
				'section'     => 'tros_nou_hero',
			)
		)
	);
}
add_action( 'customize_register', 'tros_nou_customize_register' );
