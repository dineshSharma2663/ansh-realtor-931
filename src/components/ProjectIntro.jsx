import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';

function ProjectIntro({ config }) {
  const info = config.projectInfo;

  return (
    <section id="project-intro" className="py-12">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp(config.animations)}
          className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-luxe lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-gold">Project Overview</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">{info?.name}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailBlock title="Location" value={info?.location} />
            <DetailBlock title="Property Type" value={info?.type} />
            <DetailBlock title="Available Layouts" value={info?.bhk?.join(', ')} />
            <DetailBlock title="Developer" value={info?.developer} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DetailBlock({ title, value }) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-slate-950/50 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-white/45">{title}</p>
      <p className="mt-3 text-base leading-7 text-white/80">{value || 'Coming soon'}</p>
    </div>
  );
}

export default ProjectIntro;
