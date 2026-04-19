import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

function Navbar({ site, contact, ui }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparentOnTop = ui?.navbar?.transparentOnTop;
  const sticky = ui?.navbar?.sticky;

  return (
    <header
      className={[
        sticky ? 'sticky top-0 z-50' : 'relative',
        'transition-all duration-300',
        transparentOnTop && !scrolled ? 'bg-transparent' : 'border-b border-white/10 bg-slate-950/80 backdrop-blur-xl',
      ].join(' ')}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#hero" className="space-y-1">
          <p className="font-display text-3xl font-semibold tracking-wide text-sand">{contact?.companyName || site?.title}</p>
          <p className="text-xs uppercase tracking-[0.35em] text-white/55">{site?.tagline}</p>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/72 transition hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`https://wa.me/${contact?.whatsapp || ''}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-gold/50 bg-gold px-5 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
        >
          {contact?.ctaText || 'Enquire Now'}
        </a>
      </div>
    </header>
  );
}

export default Navbar;
