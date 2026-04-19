import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

function Amenities({ config }) {
  const amenities = config.amenities || [];

  return (
    <section id="amenities" className="py-12">
      <div className="section-shell">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10"
        >
          <p className="text-sm uppercase tracking-[0.38em] text-gold">Amenities</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Designed for elevated everyday living</h2>
        </motion.div>

        {amenities.length ? (
          <motion.div
            variants={staggerContainer(config.animations)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {amenities.map((item, index) => (
              <motion.div
                key={item}
                variants={fadeInUp(config.animations, index * 0.05)}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Amenity {String(index + 1).padStart(2, '0')}</p>
                <p className="mt-4 text-xl font-medium text-white">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <FallbackText text="Amenities will be updated shortly." />
        )}
      </div>
    </section>
  );
}

function FallbackText({ text }) {
  return <div className="rounded-[2rem] border border-dashed border-white/15 p-8 text-white/60">{text}</div>;
}

export default Amenities;
