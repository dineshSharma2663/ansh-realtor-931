import { useEffect } from 'react';
import siteConfig from './config/siteConfig.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectIntro from './components/ProjectIntro';
import Projects from './components/Projects';
import Amenities from './components/Amenities';
import Location from './components/Location';
import Brands from './components/Brands';
import Videos from './components/Videos';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import { getSectionOrder } from './utils/site';
import { hydrateConfigWithAssets } from './utils/assets';

const sectionComponents = {
  Hero,
  ProjectIntro,
  Projects,
  Amenities,
  Location,
  Brands,
  Videos,
  Gallery,
  Contact,
};

const hydratedConfig = hydrateConfigWithAssets(siteConfig);

function App() {
  const orderedSections = getSectionOrder(hydratedConfig.sections);

  useEffect(() => {
    document.title = hydratedConfig.site?.title || 'Ansh Realtor';
    document.documentElement.style.setProperty('--theme-color', hydratedConfig.site?.themeColor || '#0f172a');
    document.documentElement.style.setProperty('--accent-color', hydratedConfig.site?.accentColor || '#d4af37');
    document.documentElement.style.setProperty(
      '--body-font',
      hydratedConfig.site?.font ? `"${hydratedConfig.site.font}", sans-serif` : 'Poppins, sans-serif',
    );
    document.documentElement.style.scrollBehavior = hydratedConfig.animations?.smoothScroll === false ? 'auto' : 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar site={hydratedConfig.site} contact={hydratedConfig.contact} ui={hydratedConfig.ui} />
      <main>
        {orderedSections.map((sectionName) => {
          const SectionComponent = sectionComponents[sectionName];

          if (!SectionComponent) {
            return null;
          }

          return <SectionComponent key={sectionName} config={hydratedConfig} />;
        })}
      </main>
    </div>
  );
}

export default App;
