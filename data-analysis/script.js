// **Variables and Selectors**

const contentArea = document.getElementById("content"); // Get the content area

const header = document.querySelector('.header-bar'); // Get the header element

const scrollTopButton = document.createElement('button'); // Create the scroll-to-top button

const SCROLL_THRESHOLD = 10; // Scroll threshold for header effects

const SCROLL_TO_TOP_VISIBILITY_THRESHOLD = 500; // Threshold to show scroll-to-top button

const MOBILE_BREAKPOINT = 768; // Define the mobile breakpoint

const sidebarWidth = '300px'; // Define the sidebar width

// **Selectors**

const toggleButton = document.getElementById('toggle-menu');

const sideMenu = document.getElementById('sideMenu');

const closeButton = document.querySelector('.closebtn');

const sidebarLinks = document.querySelectorAll('#sideMenu a');

const content = document.getElementById('content');

// **Initial State**

let isMenuOpen = false;

// **Debounced Scroll Event Listener**

let debounceTimeout = null;

window.addEventListener('scroll', () => {

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(handleScroll, 100); // Debounce scroll event

});

// **Event Listeners**

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

// **Handle Smooth Scrolling for Sidebar Links**

sidebarLinks.forEach(link => {

  link.addEventListener('click', function (e) {

    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1); // Extract target ID

    const targetElement = document.getElementById(targetId);

    if (targetElement) {

      const headerHeight = header.offsetHeight; // Get header height

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      // Smooth scroll to the target position

      window.scrollTo({

        top: targetPosition,

        behavior: 'smooth',

      });

      // Ensure sidebar closes for mobile devices after scroll

      if (window.innerWidth <= MOBILE_BREAKPOINT) {

        setTimeout(() => closeSidebar(), 300); // Allow scroll animation to finish

      }

    } else {

      console.error(`Target element with ID "${targetId}" not found.`);

    }

  });

});

// **Header Scroll Effect**

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

}

// **Scroll-to-Top Button Setup**

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

scrollTopButton.tabIndex = "0";

scrollTopButton.ariaLabel = "Scroll to Top";

scrollTopButton.addEventListener('click', () => {

  window.scrollTo({

    top: 0,

    behavior: 'smooth',

  });

});

document.body.appendChild(scrollTopButton);

// **Error Handling for Debugging**

window.addEventListener('error', function (e) {

  console.error('An error occurred:', e.message, 'at', e.filename, 'line', e.lineno);

});

// **Copy Code Button Functionality**

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

// **Highlight.js Initialization**

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('pre code').forEach((block) => {

    hljs.highlightBlock(block);

  });

});