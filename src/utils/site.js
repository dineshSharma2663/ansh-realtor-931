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

export function extractGoogleDriveFileId(url = '') {
  if (!url) {
    return '';
  }

  const directMatch = url.match(/\/file\/d\/([^/]+)/i);

  if (directMatch?.[1]) {
    return directMatch[1];
  }

  const queryMatch = url.match(/[?&]id=([^&]+)/i);
  return queryMatch?.[1] || '';
}

export function isGoogleDriveUrl(url = '') {
  return /drive\.google\.com/i.test(url);
}

export function getGoogleDrivePreviewUrl(url = '') {
  const fileId = extractGoogleDriveFileId(url);

  if (!fileId) {
    return '';
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getPreferredVideoSource(config) {
  return config?.assets?.heroVideoUrl || config?.assets?.heroVideo || '';
}
