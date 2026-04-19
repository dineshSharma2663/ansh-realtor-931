import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';
import {
  getGoogleDrivePreviewUrl,
  getPreferredVideoSource,
  isGoogleDriveUrl,
} from '../utils/site';

function Videos({ config }) {
  const configVideo = getPreferredVideoSource(config);
  const configVideoProject = configVideo
    ? [
        {
          title: config.projectInfo?.name || 'Featured Video',
          location: config.projectInfo?.location || 'Project Showcase',
          video: configVideo,
          image: config.projects?.[0]?.image || '',
        },
      ]
    : [];
  const projectVideos = (config.projects || []).filter((project) => project.video);
  const videoProjects = configVideo ? configVideoProject : projectVideos;

  return (
    <section id="videos" className="py-12">
      <div className="section-shell">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10"
        >
          <p className="text-sm uppercase tracking-[0.38em] text-gold">Videos</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Cinematic project glimpses</h2>
        </motion.div>

        {videoProjects.length ? (
          <motion.div
            variants={staggerContainer(config.animations)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {videoProjects.map((project) => (
              <motion.article
                key={`${project.title}-video`}
                variants={fadeInUp(config.animations)}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-luxe"
              >
                <div className="aspect-video bg-slate-900">
                  {isGoogleDriveUrl(project.video) ? (
                    <iframe
                      src={getGoogleDrivePreviewUrl(project.video)}
                      title={`${project.title} video`}
                      allow="autoplay; fullscreen"
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <video
                      controls
                      preload="none"
                      className="h-full w-full object-cover"
                      poster={project.image || undefined}
                    >
                      <source src={project.video} />
                    </video>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl text-white">{project.title}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/45">{project.location}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/15 p-8 text-white/60">Video tours will appear here when available.</div>
        )}
      </div>
    </section>
  );
}

export default Videos;
