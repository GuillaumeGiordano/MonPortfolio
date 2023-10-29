// FUNCTION A DEPLACER
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (section) {
    const offset = 60; // Ajoutez le décalage de 60 pixels
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionPosition - offset,
      behavior: "smooth",
    });
  }
};

export default scrollToSection;
