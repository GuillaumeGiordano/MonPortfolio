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

    // Mettez à jour la classe active sur les liens de navigation
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      const linkId = link.getAttribute("href").substring(1); // Supprimez le "#"
      if (linkId === sectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
};

export default scrollToSection;
