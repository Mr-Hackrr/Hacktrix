// script.js
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// Add smooth scrolling to anchor links (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// Example of a simple animation (you can enhance this)
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseover', () => {
  heroSection.style.transform = 'scale(1.02)'; // subtle zoom on hover
});
heroSection.addEventListener('mouseout', () => {
  heroSection.style.transform = 'scale(1)';
});