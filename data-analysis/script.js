// **Variables and Selectors**
const contentArea = document.getElementById("content"); // Get the content area
const header = document.querySelector('.header-bar'); // Get the header element
const scrollTopButton = document.createElement('button'); // Create the scroll-to-top button
const SCROLL_THRESHOLD = 10; // Scroll threshold for header effects
const SCROLL_TO_TOP_VISIBILITY_THRESHOLD = 500; // Threshold to show scroll-to-top button
const MOBILE_BREAKPOINT = 768; // Define the mobile breakpoint
const SIDE_MENU_WIDTH = 300; // Define the sidebar width

// **Debounced Scroll Event Listener**
let debounceTimeout = null;
window.addEventListener('scroll', () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(handleScroll, 100); // Debounce scroll event
});

// Selectors
const toggleButton = document.getElementById('toggle-menu');
const sideMenu = document.getElementById('sideMenu');
const closeButton = document.querySelector('.closebtn');
const content = document.getElementById('content'); // Add this selector

// Initial State
let isMenuOpen = false;
const sidebarWidth = '300px'; // Define the sidebar width

// Event Listeners
toggleButton.addEventListener('click', toggleSidebar);
closeButton.addEventListener('click', closeSidebar);

// Functions
function toggleSidebar() {
  if (!isMenuOpen) {
    openSidebar();
  } else {
    closeSidebar();
  }
}

function openSidebar() {
  sideMenu.style.width = sidebarWidth;
  content.style.marginLeft = sidebarWidth; // Shift the content
  isMenuOpen = true;
}

function closeSidebar() {
  sideMenu.style.width = '0';
  content.style.marginLeft = '0'; // Reset the content margin
  isMenuOpen = false;
}



// **2. Close Sidebar After Navigation (Mobile Devices)**
function closeSidebarAfterNavigation() {
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    closeNav(); // Automatically close the sidebar after navigation
  }
}

const sidebarLinks = document.querySelectorAll('#sideMenu a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', closeSidebarAfterNavigation);
});

// **3. Header Scroll Effect**
function handleScroll() {
  if (window.pageYOffset > SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // **Show/Hide Scroll-to-Top Button**
  if (window.scrollY > SCROLL_TO_TOP_VISIBILITY_THRESHOLD) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }

  // **Sidebar Scroll Effect (Added)**
  if (window.scrollY > 0) {
    sideMenu.classList.add('scrolled');
  } else {
    sideMenu.classList.remove('scrolled');
  }
}

// **4. Copy Code Button Functionality**
const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const code = button.previousElementSibling.textContent.trim();
    navigator.clipboard.writeText(code)
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy Code', 1500);
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
        button.textContent = 'Copy Error. Please try again.';
        setTimeout(() => button.textContent = 'Copy Code', 2500);
      });
  });
});

// **5. Scroll-to-Top Button**
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
scrollTopButton.style.display = 'none'; // Initially hidden
scrollTopButton.tabIndex = "0"; // Add for keyboard navigation
scrollTopButton.ariaLabel = "Scroll to Top"; // For screen readers
scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.body.appendChild(scrollTopButton);

// **6. Smooth Scrolling for Sidebar Links**
document.querySelectorAll('#sideMenu a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href').substring(1); // Extract the target section ID
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = header.offsetHeight; // Get header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close the sidebar after navigating to the section (on mobile)
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        closeNav();
      }
    } else {
      console.error('Target element not found for:', this.getAttribute('href'));
    }
  });
});

// **7. Error Handling for Debugging**
window.addEventListener('error', function (e) {
  console.error('An error occurred:', e.message, 'at', e.filename, 'line', e.lineno);
});

// **8. DOMContentLoaded Event**
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed.');
});
// **6. Smooth Scrolling for Sidebar Links**
document.querySelectorAll('#sideMenu a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href').substring(1); // Extract the target section ID
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = header.offsetHeight; // Get header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close the sidebar after navigating to the section (on mobile)
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        closeNav();
      }
    } else {
      console.error('Target element not found for:', this.getAttribute('href'));
    }
  });
});

// **7. Error Handling for Debugging**
window.addEventListener('error', function (e) {
  console.error('An error occurred:', e.message, 'at', e.filename, 'line', e.lineno);
});

// **8. DOMContentLoaded Event**
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed.');
});


