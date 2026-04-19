import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

function Location({ config }) {
  const highlights = config.locationHighlights || [];

  return (
    <section id="location" className="py-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-luxe"
        >
          <p className="text-sm uppercase tracking-[0.38em] text-gold">Location Highlights</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">{config.projectInfo?.location}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
            Prime connectivity, green surroundings, and access to lifestyle infrastructure make this address ideal for both end use and investment.
          </p>
        </motion.div>

        {highlights.length ? (
          <motion.div
            variants={staggerContainer(config.animations)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                variants={fadeInUp(config.animations, index * 0.05)}
                className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-gold">Highlight</p>
                <p className="mt-4 text-lg text-white">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/15 p-8 text-white/60">Location details will be added soon.</div>
        )}
      </div>
    </section>
  );
}

export default Location;
