import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { createWhatsAppLink } from '../utils/site';

function Hero({ config }) {
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, config.animations?.parallax ? 120 : 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.08]);
  const heroImage = config.assets?.wallpaper;
  const heroVideo = config.assets?.heroVideo;
  const whatsappHref = createWhatsAppLink(
    config.contact?.whatsapp,
    `Hi, I am interested in ${config.projectInfo?.name || 'your luxury properties'}. Please share details.`,
  );

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.defaultPlaybackRate = 0.6;
    videoElement.playbackRate = 0.6;
    videoElement.preservesPitch = true;

    const ensurePlayback = async () => {
      try {
        await videoElement.play();
      } catch {
        // Autoplay can be blocked transiently; the browser will retry once it can.
      }
    };

    const handleEnded = () => {
      videoElement.currentTime = 0;
      void ensurePlayback();
    };

    videoElement.loop = true;
    videoElement.currentTime = 0;
    void ensurePlayback();
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [heroVideo]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0 bg-hero-luxury"
      >
        {heroVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage || undefined}
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 0.6;
              event.currentTarget.playbackRate = 0.6;
            }}
          >
            <source src={heroVideo} />
          </video>
        ) : null}
        {heroImage ? (
          <img
            src={heroImage}
            alt={config.projectInfo?.name || 'Luxury property'}
            className={`h-full w-full object-cover ${heroVideo ? 'absolute inset-0 opacity-10' : 'opacity-25'}`}
            loading="eager"
          />
        ) : null}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/60 to-ink" />

      <div className="section-shell relative flex min-h-[92vh] items-center py-12">
        <motion.div
          variants={staggerContainer(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={fadeInUp(config.animations)}
              className="mb-5 inline-flex rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-gold"
            >
              Signature Real Estate Portfolio
            </motion.p>
            <motion.h1
              variants={fadeInUp(config.animations)}
              className="text-balance font-display text-5xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl"
            >
              {config.site?.tagline}
            </motion.h1>
            <motion.p
              variants={fadeInUp(config.animations)}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/72"
            >
              {config.projectInfo?.description}
            </motion.p>
            <motion.div variants={fadeInUp(config.animations)} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Explore Listings
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:border-gold/50 hover:text-gold"
              >
                {config.contact?.ctaText || 'Book Site Visit'}
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp(config.animations)}
            className="glass-panel gold-ring ml-auto w-full max-w-xl rounded-[2rem] p-6 shadow-luxe"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-gold">Curated Highlight</p>
              <h2 className="mt-4 font-display text-4xl text-white">{config.projectInfo?.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Info label="Location" value={config.projectInfo?.location} />
                <Info label="Type" value={config.projectInfo?.type} />
                <Info label="Configurations" value={config.projectInfo?.bhk?.join(' • ')} />
                <Info label="Developer" value={config.projectInfo?.developer} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-white/45">{label}</p>
      <p className="mt-2 text-base font-medium text-white">{value || 'Available on request'}</p>
    </div>
  );
}

export default Hero;
