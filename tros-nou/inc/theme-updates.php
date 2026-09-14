<?php
/**
 * GitHub updates via Plugin Update Checker.
 *
 * @package Tros_Nou
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once TROS_NOU_DIR . '/plugin-update-checker/plugin-update-checker.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$tros_nou_update_checker = PucFactory::buildUpdateChecker(
	'https://github.com/lexisphoenix/tros-nou/',
	TROS_NOU_DIR . '/style.css',
	'tros-nou'
);

$tros_nou_update_checker->setBranch( 'main' );
