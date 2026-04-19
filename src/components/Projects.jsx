import { motion } from 'framer-motion';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import { separateProjects } from '../utils/site';
import { fadeInUp, staggerContainer } from '../utils/motion';

function Projects({ config }) {
  const { featuredProject, regularProjects } = separateProjects(config.projects);

  return (
    <section id="projects" className="py-12">
      <div className="section-shell">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-gold">Curated Listings</p>
            <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Luxury homes and high-conviction land opportunities</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/68">
            Visual-first discovery, fast scanning, and direct WhatsApp conversion for ready buyers and investors.
          </p>
        </motion.div>

        {!featuredProject && regularProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            {featuredProject ? <FeaturedProject project={featuredProject} config={config} /> : null}

            {regularProjects.length > 0 ? (
              <motion.div
                variants={staggerContainer(config.animations)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
              >
                {regularProjects.map((project) => (
                  <ProjectCard key={`${project.title}-${project.location}`} project={project} config={config} />
                ))}
              </motion.div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
      <p className="font-display text-3xl text-white">Fresh inventory is being curated.</p>
      <p className="mt-3 text-white/60">Contact us on WhatsApp for the latest premium availability.</p>
    </div>
  );
}

export default Projects;
