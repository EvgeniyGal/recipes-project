const getLimitForViewport = () => {
  const isMobile = window.innerWidth < 768;
  return isMobile ? 8 : 12;
};

export default getLimitForViewport;
