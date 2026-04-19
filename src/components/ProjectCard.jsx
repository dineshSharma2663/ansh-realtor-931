import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';
import { createWhatsAppLink, isPlotProject } from '../utils/site';

function ProjectCard({ project, config }) {
  const plotProject = isPlotProject(project);
  const whatsappHref = createWhatsAppLink(
    config.contact?.whatsapp,
    `Hi, I am interested in ${project.title} in ${project.location}. Please share details.`,
  );
  const available = (project.status || '').toLowerCase() === 'available';

  return (
    <motion.article
      variants={fadeInUp(config.animations)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-luxe"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-900 text-white/45">Image coming soon</div>
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${available ? 'bg-gold text-slate-950' : 'bg-white/15 text-white'}`}>
            {project.status || 'Status Pending'}
          </span>
          {plotProject ? (
            <span className="rounded-full border border-emerald/40 bg-emerald/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Plot Available
            </span>
          ) : null}
          {project.source ? (
            <span className="rounded-full border border-emerald/40 bg-emerald/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              {project.source}
            </span>
          ) : null}
        </div>

        {project.video ? (
          <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Video
          </div>
        ) : null}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-white">{project.title}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/45">{project.location}</p>
          </div>
          <p className="text-right text-lg font-semibold text-gold">{project.price}</p>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/68">{project.description}</p>

        {plotProject ? (
          <div className="mt-4 rounded-2xl border border-gold/20 bg-slate-950/45 p-4">
            <p className="text-sm font-semibold text-white">📏 Plot Size: {project.plotSize}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-gold">Ideal for Investment</p>
          </div>
        ) : null}

        {project.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/72"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
