const scrollPosition = (top) => {
  window.scrollTo({
    top: top,
    behavior: "smooth",
  });
};

export default scrollPosition;
