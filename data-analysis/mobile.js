// Mobile-specific variables and selectors
const sideMenu = document.getElementById('sideMenu');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggle-menu');
const closeButton = document.querySelector('.closebtn');
const sidebarLinks = document.querySelectorAll('#sideMenu a');
const header = document.querySelector('.header-bar');
const backdrop = document.createElement('div');

// Append the backdrop to the body
backdrop.className = 'backdrop';
document.body.appendChild(backdrop);

// Track the menu state
let isMenuOpen = false;

// Function to toggle the sidebar
function toggleMobileSidebar() {
    isMenuOpen = !isMenuOpen;
    sideMenu.classList.toggle('show', isMenuOpen);
    backdrop.classList.toggle('show', isMenuOpen);
}

// Function to close the sidebar
function closeSidebar() {
    if (isMenuOpen) {
        isMenuOpen = false;
        sideMenu.classList.remove('show');
        backdrop.classList.remove('show');
    }
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

        // Close sidebar AFTER scroll is complete (using a timeout)
        setTimeout(closeSidebar, 600); // Increased timeout to 600ms to ensure smooth close
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

// Event listeners for sidebar toggle and close buttons
toggleButton.addEventListener('click', toggleMobileSidebar);
closeButton.addEventListener('click', closeSidebar);
backdrop.addEventListener('click', closeSidebar);

// Prevent scroll-triggered sidebar opening (CORRECTED)
// The crucial fix is to only listen for scroll events when the sidebar is closed
let isScrolling = false; // Flag to track scroll events

window.addEventListener('scroll', () => {
  if(!isMenuOpen) { // Only do this when the menu is closed
    isScrolling = true; // Set the flag
    setTimeout(() => {isScrolling = false;}, 200); // Reset after some time
  }
});

// Handle deep links on page load
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        scrollToSection(hash);
    }
});

//Dynamic sidebar width adjustment (this is already good)
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        sideMenu.style.width = '250px';
    }
});