import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

function Brands({ config }) {
  const brandLogos = config.brands?.logos || [];

  return (
    <section id="brands" className="py-12">
      <div className="section-shell">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-luxe"
        >
          <p className="text-sm uppercase tracking-[0.38em] text-gold">Brands & Developers</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="font-display text-4xl text-white sm:text-5xl">Trusted names across prime micro-markets</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/68">{config.brands?.description}</p>
            </div>
            <motion.div
              variants={staggerContainer(config.animations)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {brandLogos.length ? (
                brandLogos.map((logo, index) => (
                  <motion.div
                    key={`${logo}-${index}`}
                    variants={fadeInUp(config.animations, index * 0.04)}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="group flex min-h-32 items-center justify-center rounded-[1.5rem] border border-white/12 bg-[#f6efe2] px-5 py-6 shadow-[0_14px_40px_rgba(8,17,31,0.16)]"
                  >
                    <img
                      src={logo}
                      alt="Trusted partner logo"
                      loading="lazy"
                      className="h-20 w-full object-contain transition duration-300 group-hover:scale-[1.03] sm:h-24"
                    />
                  </motion.div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-white/15 p-6 text-white/60">
                  Brand data will appear here when added to the config.
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Brands;
