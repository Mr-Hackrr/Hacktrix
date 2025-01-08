// Mobile-specific variables and selectors
const sideMenu = document.getElementById('sideMenu');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggle-menu');
const closeButton = document.querySelector('.closebtn');
const sidebarLinks = document.querySelectorAll('#sideMenu a');
const header = document.querySelector('.header-bar');
const backdrop = document.createElement('div');

// Explicitly set initial state to closed
sideMenu.style.width = '0';
backdrop.style.display = 'none';

// Append the backdrop to the body
backdrop.className = 'backdrop';
document.body.appendChild(backdrop);

// Function to toggle the sidebar
function toggleMobileSidebar() {
  sideMenu.classList.toggle('show');
  backdrop.classList.toggle('show');
}

// Function to close the sidebar
function closeSidebar() {
  sideMenu.classList.remove('show');
  backdrop.classList.remove('show');
}

// Function to scroll to the target section with a header offset
function scrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Close sidebar AFTER scroll is complete
    document.addEventListener('scroll', function onScroll() {
      if (window.scrollY >= targetPosition) {
        closeSidebar();
        document.removeEventListener('scroll', onScroll);
      }
    }, { passive: true, once: true }); // Use 'once' to auto-remove the listener
  }
}

// Event listeners for sidebar links
sidebarLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

// Event listener for sidebar toggle button
toggleButton.addEventListener('click', toggleMobileSidebar);

// Event listener for close button and backdrop
closeButton.addEventListener('click', closeSidebar);
backdrop.addEventListener('click', closeSidebar);

// Style the backdrop
backdrop.style.position = 'fixed';
backdrop.style.top = '0';
backdrop.style.left = '0';
backdrop.style.width = '100%';
backdrop.style.height = '100%';
backdrop.style.background = 'rgba(0, 0, 0, 0.5)';

// Handle deep links on page load
document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    scrollToSection(hash);
  }
});

// Dynamic sidebar width adjustment (if necessary)
window.addEventListener('resize', function() {
  if (window.innerWidth <= 768) {
    sideMenu.style.width = '250px';
  }
});
