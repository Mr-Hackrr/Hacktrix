// Smooth scroll for sidebar links
document.querySelectorAll('#sidebar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Header shrink effect on scroll
window.addEventListener('scroll', function () {
  document.querySelector('.header-bar').classList.toggle('scrolled', window.scrollY > 50);
});

// Animation for main content sections
const sections = document.querySelectorAll('#content section');
sections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    section.style.transform = 'scale(1.01)';
    section.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.2)';
  });
  section.addEventListener('mouseleave', () => {
    section.style.transform = 'scale(1)';
    section.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
  });
});

// Fade-in animation for main content sections on page load
window.addEventListener('load', () => {
  sections.forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  });
});

// Scroll-to-top button
const scrollTopButton = document.createElement('button');
scrollTopButton.textContent = '↑';
scrollTopButton.style.position = 'fixed';
scrollTopButton.style.bottom = '20px';
scrollTopButton.style.right = '20px';
scrollTopButton.style.padding = '10px';
scrollTopButton.style.borderRadius = '50%';
scrollTopButton.style.border = 'none';
scrollTopButton.style.backgroundColor = '#4a90e2';
scrollTopButton.style.color = '#ffffff';
scrollTopButton.style.cursor = 'pointer';
scrollTopButton.style.fontSize = '1.5rem';
scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
document.body.appendChild(scrollTopButton);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
});

const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
  toggleBtn.classList.toggle('active');
});




// Toggle sidebar on smaller screens (mobile)
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Hide sidebar on smaller screens when content is clicked
document.addEventListener('click', (e) => {
  if (window.innerWidth < 769 && e.target !== sidebar && e.target !== menuBtn) {
    sidebar.classList.remove('active');
  }
});

// Navigate to respective content and hide sidebar on smaller screens
document.addEventListener('click', (e) => {
  if (window.innerWidth < 769 && e.target.tagName === 'A' && e.target.parentNode === sidebar) {
    sidebar.classList.remove('active');
  }
});

// Copy Code Button Functionality (Improved)
const copyButtons = document.querySelectorAll('.copy-button');

copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const code = button.previousElementSibling.textContent.trim(); //Improved selector
    navigator.clipboard.writeText(code)
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy Code', 1500);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        button.textContent = 'Copy Failed!';
      });
  });
});
document.getElementById('toggle-btn').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('hidden');
});


hljs.highlightAll(); //Initialize Highlight.js after the page loads

