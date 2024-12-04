// Mobile-specific variables and selectors

const sideMenu = document.getElementById('sideMenu'); // Sidebar menu element

const content = document.getElementById('content'); // Content area

const toggleButton = document.getElementById('toggle-menu'); // Sidebar toggle button

const closeButton = document.querySelector('.closebtn'); // Close button inside sidebar

const sidebarLinks = document.querySelectorAll('#sideMenu a'); // Links in the sidebar

const header = document.querySelector('.header-bar'); // Fixed header

const backdrop = document.createElement('div'); // Create backdrop

// Append the backdrop to the body

backdrop.className = 'backdrop';

document.body.appendChild(backdrop);

// Track the menu state

let isMenuOpen = false;

// Function to toggle the sidebar

function toggleMobileSidebar() {

    isMenuOpen = !isMenuOpen;

    sideMenu.classList.toggle('show', isMenuOpen); // Toggle sidebar visibility

    backdrop.classList.toggle('show', isMenuOpen); // Toggle backdrop visibility

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

        const headerHeight = header ? header.offsetHeight : 0; // Get the header height

        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        // Smooth scroll to the target position

        window.scrollTo({

            top: targetPosition,

            behavior: 'smooth',

        });

        // Wait for scrolling to finish before closing the sidebar

        setTimeout(closeSidebar, 500); // Adjust timeout to match the scroll duration

    }

}

// Event listeners for sidebar links

sidebarLinks.forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault(); // Prevent default link behavior

        const targetId = this.getAttribute('href').substring(1); // Get the target section ID

        scrollToSection(targetId); // Scroll to the correct section

    });

});

// Event listeners for sidebar toggle and close buttons

toggleButton.addEventListener('click', toggleMobileSidebar); // Open/close sidebar

closeButton.addEventListener('click', closeSidebar); // Close sidebar on button click

backdrop.addEventListener('click', closeSidebar); // Close sidebar on backdrop click

// Fix: Disable scroll-triggered sidebar opening

window.addEventListener('scroll', () => {

    if (isMenuOpen) {

        console.log('Sidebar is already open; ignoring scroll behavior.');

        return; // Prevent unintended interactions when the sidebar is open

    }

});

// Adjust sidebar width dynamically on resize

window.addEventListener('resize', function () {

    if (window.innerWidth <= 768) {

        sideMenu.style.width = '250px'; // Set sidebar width for mobile

    }

});

// Handle deep links on page load

document.addEventListener('DOMContentLoaded', function () {

    const hash = window.location.hash.substring(1);

    if (hash) {

        scrollToSection(hash); // Scroll to the target section on page load

    }

});