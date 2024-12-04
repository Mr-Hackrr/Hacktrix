// **Variables and Selectors**

const contentArea = document.getElementById("content"); // Get the content area
console.log('Content area:', contentArea);

const header = document.querySelector('.header-bar'); // Get the header element
console.log('Header:', header);

const scrollTopButton = document.createElement('button'); // Create the scroll-to-top button
console.log('Scroll-to-top button:', scrollTopButton);

const SCROLL_THRESHOLD = 10; // Scroll threshold for header effects
console.log('Scroll threshold:', SCROLL_THRESHOLD);

const SCROLL_TO_TOP_VISIBILITY_THRESHOLD = 500; // Threshold to show scroll-to-top button
console.log('Scroll-to-top visibility threshold:', SCROLL_TO_TOP_VISIBILITY_THRESHOLD);

const sidebarWidth = '300px'; // Define the sidebar width
console.log('Sidebar width:', sidebarWidth);

// **Selectors**

const toggleButton = document.getElementById('toggle-menu');
console.log('Toggle button:', toggleButton);

const sideMenu = document.getElementById('sideMenu');
console.log('Sidebar menu:', sideMenu);

const closeButton = document.querySelector('.closebtn');
console.log('Close button:', closeButton);

const sidebarLinks = document.querySelectorAll('#sideMenu a');
console.log('Sidebar links:', sidebarLinks);

const content = document.getElementById('content');
console.log('Content:', content);

// **Initial State**

let isMenuOpen = false;
console.log('Initial menu state:', isMenuOpen);

// **Debounced Scroll Event Listener**

let debounceTimeout = null;

window.addEventListener('scroll', () => {

  console.log('Scroll event detected');

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(handleScroll, 100); // Debounce scroll event

});

// **Event Listeners**

toggleButton.addEventListener('click', toggleSidebar);
console.log('Toggle button event listener added');

closeButton.addEventListener('click', closeSidebar);
console.log('Close button event listener added');

// **Functions**

function toggleSidebar() {

  console.log('Toggle sidebar button clicked');

  if (!isMenuOpen) {

    openSidebar();

  } else {

    closeSidebar();

  }

}

function openSidebar() {

  console.log('Opening sidebar');

  sideMenu.style.width = sidebarWidth;

  content.style.marginLeft = sidebarWidth; // Shift the content

  isMenuOpen = true;

  console.log('Sidebar opened');

}

function closeSidebar() {

  console.log('Closing sidebar');

  sideMenu.style.width = '0';

  content.style.marginLeft = '0'; // Reset the content margin

  isMenuOpen = false;

  console.log('Sidebar closed');

}

// Handle Smooth Scrolling for Sidebar Links
sidebarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');
    const targetId = href && href.startsWith('#') ? href.substring(1) : null;

    if (targetId !== "") {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        try {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        } catch (error) {
          console.error('Error scrolling to target position:', error);
        }
      } else {
        console.error(`Target element with ID "${targetId}" not found. Please verify the element exists on the page.`);
      }
    } else {
      console.log("Ignoring link with empty href attribute.");
    }
  });
});


// **Header Scroll Effect**

function handleScroll() {

  console.log('Handling scroll event');

  if (window.pageYOffset > SCROLL_THRESHOLD) {

    header.classList.add('scrolled');

    console.log('Header scrolled class added');

  } else {

    header.classList.remove('scrolled');

    console.log('Header scrolled class removed');

  }

  // **Show/Hide Scroll-to-Top Button**

  if (window.scrollY > SCROLL_TO_TOP_VISIBILITY_THRESHOLD) {

    scrollTopButton.style.display = 'block';

    console.log('Scroll-to-top button displayed');

  } else {

    scrollTopButton.style.display = 'none';

    console.log('Scroll-to-top button hidden');

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

// **Scroll-to-Top Button Setup (continued)**
scrollTopButton.addEventListener('click', () => {
  console.log('Scroll-to-top button clicked');
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

    console.log('Copy code button clicked');

    const code = button.previousElementSibling.textContent.trim();

    console.log(`Copying code: ${code}`);

    navigator.clipboard.writeText(code)

      .then(() => {

        console.log('Code copied successfully');

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

  console.log('Initializing Highlight.js');

  document.querySelectorAll('pre code').forEach((block) => {

    console.log(`Highlighting code block: ${block.textContent}`);

    hljs.highlightBlock(block);

  });

});
