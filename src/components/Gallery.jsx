import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

function Gallery({ config }) {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const galleryItems = config.galleryImages || [];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ySlow = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yFast = useTransform(scrollYProgress, [0, 1], [55, -95]);
  const columns = splitIntoColumns(galleryItems, 3);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncViewport = (event) => setIsDesktop(event.matches);

    syncViewport(mediaQuery);
    mediaQuery.addEventListener('change', syncViewport);

    return () => {
      mediaQuery.removeEventListener('change', syncViewport);
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-64 w-64 rounded-full bg-gold/12 blur-3xl" />
      <div className="section-shell">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-gold">Gallery</p>
            <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
              {config.gallery?.title || 'Visual-first discovery for serious buyers'}
            </h2>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 lg:ml-auto lg:max-w-2xl">
            <p className="text-base leading-8 text-white/70">
              {config.gallery?.subtitle || 'A curated gallery of project imagery.'}
            </p>
            <div className="mt-6 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              {galleryItems.length} Gallery Frames
            </div>
          </div>
        </motion.div>

        {galleryItems.length ? (
          <motion.div
            variants={staggerContainer(config.animations)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 lg:grid-cols-3"
          >
            <motion.div style={{ y: config.animations?.parallax && isDesktop ? ySlow : 0 }} className="space-y-5">
              {columns[0].map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} animations={config.animations} tall={index % 2 === 0} />
              ))}
            </motion.div>
            <motion.div style={{ y: config.animations?.parallax && isDesktop ? yMedium : 0 }} className="space-y-5 lg:pt-12">
              {columns[1].map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index + columns[0].length} animations={config.animations} featured={index === 0} />
              ))}
            </motion.div>
            <motion.div style={{ y: config.animations?.parallax && isDesktop ? yFast : 0 }} className="space-y-5 lg:pt-4">
              {columns[2].map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index + columns[0].length + columns[1].length} animations={config.animations} tall={index % 2 !== 0} />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/15 p-8 text-white/60">Gallery images are not available yet.</div>
        )}
      </div>
    </section>
  );
}

function GalleryCard({ item, index, animations, tall = false, featured = false }) {
  const mediaHeightClass = featured
    ? 'h-52 sm:h-60 lg:h-72'
    : tall
      ? 'h-48 sm:h-56 lg:h-72'
      : 'h-44 sm:h-52 lg:h-72';

  return (
    <motion.article
      variants={fadeInUp(animations, index * 0.04)}
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.04] shadow-luxe"
    >
      <div className={`relative overflow-hidden ${mediaHeightClass}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="mt-2 text-xs leading-5 text-white/75 sm:mt-3 sm:text-sm sm:leading-6">
            {featured ? 'Premium lobby and signature design language.' : 'Architectural detail and elevated lifestyle imagery.'}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function splitIntoColumns(items, columnCount) {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex),
  );
}

export default Gallery;
