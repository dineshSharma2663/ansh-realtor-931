export function fadeInUp(animations, delay = 0) {
  const enabled = animations?.enable !== false;

  if (!enabled) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animations?.duration || 0.8,
        delay,
        ease: 'easeOut',
      },
    },
  };
}

export function staggerContainer(animations) {
  const enabled = animations?.enable !== false;

  if (!enabled) {
    return {
      hidden: {},
      show: {},
    };
  }

  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: animations?.stagger || 0.15,
      },
    },
  };
}
