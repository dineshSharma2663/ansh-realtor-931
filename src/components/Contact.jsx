import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';
import { createWhatsAppLink } from '../utils/site';

function Contact({ config }) {
  const contact = config.contact || {};
  const profile = config.profile || {};
  const whatsappHref = createWhatsAppLink(
    contact.whatsapp,
    `Hi, I am interested in ${config.projectInfo?.name || 'your premium listings'}. Please share details.`,
  );

  return (
    <section id="contact" className="py-12">
      <div className="section-shell">
        <motion.div
          variants={fadeInUp(config.animations)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-gold/20 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 shadow-luxe lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-gold">Contact</p>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Let’s shortlist the right property for you</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Reach out for site visits, latest price sheets, payment plans, and direct inventory access.
              </p>

              {profile?.image ? (
                <div className="mt-8 flex max-w-2xl items-center gap-5 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
                  <img
                    src={profile.image}
                    alt={profile.name || 'Ansh Realtor'}
                    loading="lazy"
                    className="h-24 w-24 rounded-2xl object-cover ring-1 ring-gold/35"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-gold">Meet Your Realtor</p>
                    <h3 className="mt-2 font-display text-3xl text-white">{profile.name || 'Ansh Realtor'}</h3>
                    <p className="mt-1 text-sm font-medium text-white/70">{profile.role || 'Luxury Property Consultant'}</p>
                    <p className="mt-3 text-sm leading-7 text-white/68">{profile.bio}</p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6">
              <InfoLine label="Company" value={contact.companyName} />
              <InfoLine label="Representative" value={contact.owner} />
              <InfoLine label="Phone" value={contact.phone} href={`tel:${contact.phone || ''}`} />
              <InfoLine label="WhatsApp" value={contact.whatsapp} href={whatsappHref} external />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoLine({ label, value, href, external }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.26em] text-white/45">{label}</p>
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="mt-2 block text-base font-medium text-white transition hover:text-gold"
        >
          {value || 'Not available'}
        </a>
      ) : (
        <p className="mt-2 text-base font-medium text-white">{value || 'Not available'}</p>
      )}
    </div>
  );
}

export default Contact;
