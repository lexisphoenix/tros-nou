<?php
/**
 * Main template — single-page experience.
 *
 * @package Tros_Nou
 */

get_header();

$hero_video     = tros_nou_get_hero_video_url();
$hero_poster    = tros_nou_get_hero_image_url();
$logo_url       = TROS_NOU_URI . '/assets/images/logo-tros-nou.png';
$email_href     = tros_nou_get_email_href();
$contact_label  = tros_nou_get_contact_label();
$secondary_url  = tros_nou_get_secondary_url();
?>

<a class="tn-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'Tros Nou', 'tros-nou' ); ?>">
	<img
		class="tn-brand__logo"
		src="<?php echo esc_url( $logo_url ); ?>"
		alt="<?php esc_attr_e( 'Tros Nou', 'tros-nou' ); ?>"
		width="120"
		height="80"
		decoding="async"
	>
</a>

<button type="button" class="tn-close" id="tn-close" hidden aria-label="<?php esc_attr_e( 'Volver al inicio', 'tros-nou' ); ?>">×</button>

<main class="tn-site" id="tn-site">
	<section class="tn-hero" id="tn-hero" aria-label="<?php esc_attr_e( 'Entrada', 'tros-nou' ); ?>">
		<div class="tn-hero__sticky">
			<div class="tn-hero__media" aria-hidden="true">
				<?php if ( $hero_video ) : ?>
					<video
						class="tn-hero__video"
						id="tn-hero-video"
						src="<?php echo esc_url( $hero_video ); ?>"
						poster="<?php echo esc_url( $hero_poster ); ?>"
						muted
						playsinline
						loop
						autoplay
						preload="auto"
					></video>
				<?php else : ?>
					<img
						class="tn-hero__image"
						src="<?php echo esc_url( $hero_poster ); ?>"
						alt=""
						width="1920"
						height="1080"
						decoding="async"
					>
				<?php endif; ?>
			</div>
			<div class="tn-hero__veil" id="tn-hero-veil" aria-hidden="true"></div>
			<div class="tn-hero__contact" id="tn-hero-contact" aria-hidden="true">
				<div class="tn-contact-block">
					<img
						class="tn-contact__logo"
						src="<?php echo esc_url( $logo_url ); ?>"
						alt="<?php esc_attr_e( 'Tros Nou', 'tros-nou' ); ?>"
						width="120"
						height="80"
						decoding="async"
					>
					<a class="tn-hero__link" href="<?php echo esc_url( $email_href ); ?>">
						<?php echo esc_html( $contact_label ); ?>
					</a>
					<?php if ( $secondary_url ) : ?>
						<a
							class="tn-contact-extra"
							href="<?php echo esc_url( $secondary_url ); ?>"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="<?php esc_attr_e( 'Más información', 'tros-nou' ); ?>"
						><span class="tn-contact-extra__glyph" aria-hidden="true">+</span></a>
					<?php endif; ?>
				</div>
			</div>
			<p class="tn-hero__hint" id="tn-hero-hint">
				<span><?php esc_html_e( 'Desplázate para entrar', 'tros-nou' ); ?></span>
			</p>
		</div>
		<div class="tn-hero__spacer" aria-hidden="true"></div>
	</section>
</main>

<?php
get_footer();
