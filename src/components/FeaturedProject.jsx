import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';
import { createWhatsAppLink, isPlotProject } from '../utils/site';

function FeaturedProject({ project, config }) {
  const plotProject = isPlotProject(project);
  const whatsappHref = createWhatsAppLink(
    config.contact?.whatsapp,
    `Hi, I am interested in ${project.title} in ${project.location}. Please share details.`,
  );

  return (
    <motion.article
      variants={fadeInUp(config.animations)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold/25 bg-white/[0.04] shadow-luxe gold-ring"
    >
      <div className="grid items-stretch gap-0 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="relative h-44 overflow-hidden sm:h-52 lg:h-56">
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-900 text-white/45">Image coming soon</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:hidden">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{project.location}</p>
            <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">{project.title}</h3>
          </div>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-6">
          <div>
            <div className="hidden flex-wrap gap-2 lg:flex">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Badge label="Featured" tone="gold" />
              </motion.div>
              <StatusBadge status={project.status} />
              {project.source ? <Badge label={project.source || 'Direct from Company'} tone="emerald" /> : null}
              {project.video ? <Badge label="Video Available" tone="slate" /> : null}
            </div>
            <h3 className="hidden lg:block font-display text-[2rem] leading-none text-white">{project.title}</h3>
            <p className="mt-1 hidden text-sm uppercase tracking-[0.28em] text-white/45 lg:block">{project.location}</p>

            <div className="mt-1 flex flex-wrap gap-2 lg:hidden">
              <Badge label="Featured" tone="gold" />
              <StatusBadge status={project.status} />
              {project.source ? <Badge label={project.source || 'Direct from Company'} tone="emerald" /> : null}
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm leading-6 text-white/74">{project.description}</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <FeatureStat label="Price" value={project.price || 'On Request'} />
              <FeatureStat label="Availability" value={project.status || 'Status Pending'} />
              <FeatureStat
                label={plotProject ? 'Plot Size' : 'Category'}
                value={plotProject ? project.plotSize : project.tags?.[0] || 'Luxury'}
              />
            </div>

            {plotProject ? (
              <div className="mt-4 rounded-[1.4rem] border border-gold/20 bg-slate-950/55 p-4">
                <p className="text-base font-semibold text-white">📏 Plot Size: {project.plotSize}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold">Ideal for Investment</p>
              </div>
            ) : null}

            {project.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Enquire on WhatsApp
            </motion.a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-gold/40"
            >
              Request Callback
            </a>
            <span className="text-xs uppercase tracking-[0.24em] text-white/45">
              Priority Response
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeatureStat({ label, value }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/45 p-4">
      <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white sm:text-base">{value}</p>
    </div>
  );
}

function Badge({ label, tone }) {
  const toneClasses = {
    gold: 'border-gold/40 bg-gold/15 text-gold',
    emerald: 'border-emerald/40 bg-emerald/15 text-emerald-100',
    danger: 'border-rose-400/40 bg-rose-500/10 text-rose-200',
    slate: 'border-white/15 bg-white/10 text-white',
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const available = (status || '').toLowerCase() === 'available';
  return <Badge label={status || 'Status Pending'} tone={available ? 'gold' : 'slate'} />;
}

export default FeaturedProject;
