const SECTION_MAP = {
  showHero: 'Hero',
  showProjectIntro: 'ProjectIntro',
  showProjects: 'Projects',
  showAmenities: 'Amenities',
  showLocation: 'Location',
  showBrands: 'Brands',
  showVideos: 'Videos',
  showGallery: 'Gallery',
  showContact: 'Contact',
};

export function getSectionOrder(sections = {}) {
  return Object.entries(SECTION_MAP)
    .filter(([key]) => sections[key] !== false)
    .map(([, value]) => value);
}

export function createWhatsAppLink(number, message) {
  if (!number) {
    return '#contact';
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function separateProjects(projects = []) {
  const featuredProject = projects.find((project) => project.featured === true) || null;
  const regularProjects = projects.filter((project) => project !== featuredProject);
  return { featuredProject, regularProjects };
}

export function isPlotProject(project = {}) {
  return Boolean(project.plotSize);
}

export function hasTag(tags = [], value = '') {
  return tags.some((tag) => tag.toLowerCase() === value.toLowerCase());
}
