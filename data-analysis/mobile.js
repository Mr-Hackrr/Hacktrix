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

// Toggle sidebar visibility

function toggleMobileSidebar() {

    const isOpen = sideMenu.classList.toggle('show'); // Toggle the 'show' class for the sidebar

    backdrop.classList.toggle('show', isOpen); // Show/hide the backdrop

}

// Close sidebar

function closeSidebar() {

    sideMenu.classList.remove('show'); // Remove the 'show' class

    backdrop.classList.remove('show'); // Hide the backdrop

}

// Scroll to a target section with header offset adjustment

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

    }

}

// Handle sidebar link clicks

sidebarLinks.forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault(); // Prevent default link behavior

        const targetId = this.getAttribute('href').substring(1); // Get the target section ID

        scrollToSection(targetId); // Scroll to the correct section

        closeSidebar(); // Close the sidebar after navigation

    });

});

// Event listeners for opening and closing the sidebar

toggleButton.addEventListener('click', toggleMobileSidebar); // Open/close sidebar with the toggle button

closeButton.addEventListener('click', closeSidebar); // Close sidebar with the close button

backdrop.addEventListener('click', closeSidebar); // Close sidebar by clicking on the backdrop

// Adjust sidebar width dynamically on resize (optional for additional responsiveness)

window.addEventListener('resize', function () {

    if (window.innerWidth <= 768) {

        sideMenu.style.width = '250px'; // Set sidebar width for mobile

    }

});

// Smooth scrolling on page load for deep links (optional)

document.addEventListener('DOMContentLoaded', function () {

    const hash = window.location.hash.substring(1);

    if (hash) {

        scrollToSection(hash); // Scroll to the target section on page load

    }

});