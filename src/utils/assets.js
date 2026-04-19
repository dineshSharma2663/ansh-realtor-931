const imageModules = import.meta.glob('../images/*', {
  eager: true,
  import: 'default',
});

const galleryModules = import.meta.glob('../gallery/*', {
  eager: true,
  import: 'default',
});

const profileModules = import.meta.glob('../profile/*', {
  eager: true,
  import: 'default',
});

const brandLogoModules = import.meta.glob('../brand-logos/*', {
  eager: true,
  import: 'default',
});

const videoModules = import.meta.glob('../videos/*', {
  eager: true,
  import: 'default',
});

const imageMap = createAssetMap(imageModules);
const galleryMap = createAssetMap(galleryModules);
const profileMap = createAssetMap(profileModules);
const brandLogoMap = createAssetMap(brandLogoModules);
const videoMap = createAssetMap(videoModules);

function createAssetMap(modules) {
  return Object.entries(modules).reduce((accumulator, [modulePath, resolvedUrl]) => {
    const fileName = modulePath.split('/').pop();

    if (fileName) {
      accumulator[fileName] = resolvedUrl;
    }

    return accumulator;
  }, {});
}

export function resolveImage(image) {
  if (!image) {
    return '';
  }

  return imageMap[image] || image;
}

export function resolveVideo(video) {
  if (!video) {
    return '';
  }

  return videoMap[video] || video;
}

export function resolveProfileImage(image) {
  if (!image) {
    return '';
  }

  return profileMap[image] || image;
}

export function resolveBrandLogo(image) {
  if (!image) {
    return '';
  }

  return brandLogoMap[image] || image;
}

export function resolveGalleryImages() {
  return Object.entries(galleryMap)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([fileName, src], index) => ({
      id: `${fileName}-${index + 1}`,
      title: `Gallery View ${String(index + 1).padStart(2, '0')}`,
      fileName,
      src,
    }));
}

export function hydrateConfigWithAssets(config) {
  return {
    ...config,
    assets: {
      ...config.assets,
      wallpaper: resolveImage(config.assets?.wallpaper),
      heroVideo: resolveVideo(config.assets?.heroVideo),
    },
    profile: config.profile
      ? {
          ...config.profile,
          image: resolveProfileImage(config.profile.image),
        }
      : null,
    brands: config.brands
      ? {
          ...config.brands,
          logos: (config.brands.logos || []).map((logo) => resolveBrandLogo(logo)).filter(Boolean),
        }
      : null,
    galleryImages: resolveGalleryImages(),
    projects: (config.projects || []).map((project) => ({
      ...project,
      image: resolveImage(project.image),
      video: resolveVideo(project.video),
    })),
  };
}
