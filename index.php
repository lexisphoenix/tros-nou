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
$pau_url_ca     = tros_nou_get_pau_url_ca();
$pau_url_es     = tros_nou_get_pau_url_es();
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
					<?php if ( $pau_url_ca || $pau_url_es ) : ?>
						<div class="tn-pau" id="tn-pau">
							<button
								type="button"
								class="tn-pau__toggle"
								id="tn-pau-toggle"
								aria-expanded="false"
								aria-controls="tn-pau-menu"
							><span class="tn-pau__label"><?php esc_html_e( 'Pau I el cant dels ocells', 'tros-nou' ); ?></span><span class="tn-pau__chevron" aria-hidden="true"><svg viewBox="0 0 12 8" width="12" height="8" focusable="false"><path d="M1 1.2 L6 6.2 L11 1.2" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
							<div class="tn-pau__menu" id="tn-pau-menu" hidden>
								<?php if ( $pau_url_ca ) : ?>
									<a
										class="tn-pau__link"
										href="<?php echo esc_url( $pau_url_ca ); ?>"
										target="_blank"
										rel="noopener noreferrer"
									><?php esc_html_e( 'Catalán', 'tros-nou' ); ?></a>
								<?php endif; ?>
								<?php if ( $pau_url_es ) : ?>
									<a
										class="tn-pau__link"
										href="<?php echo esc_url( $pau_url_es ); ?>"
										target="_blank"
										rel="noopener noreferrer"
									><?php esc_html_e( 'Castellano', 'tros-nou' ); ?></a>
								<?php endif; ?>
							</div>
						</div>
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
