// **Improved JavaScript Code**

// **Variables and Selectors**
const toggleButton = document.querySelector('.toggle-menu'); // Get the toggle button element
const sideMenu = document.getElementById("sideMenu"); // Get the sidebar element
const contentArea = document.getElementById("content"); // Get the content element
const scrollTopButton = document.createElement('button'); // Create the scroll-to-top button

let isMenuOpen = false; // Track the current state of the menu

// **Debounced Scroll Event Listener**
let scrollTimeout = null;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 100); // Debounce scroll event
});

// **Improved Functionality**

// 1. **Sidebar Toggle**
toggleButton.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen; // Toggle the menu state

  if (isMenuOpen) {
    openNav();
  } else {
    closeNav();
  }
});

// 2. **Close Sidebar After Navigation (Mobile Devices)**
function closeSidebarAfterNavigation() {
  if (window.innerWidth <= 768) { // Check if it's a mobile device
    sideMenu.classList.remove('open');
    contentArea.classList.remove('content-shifted');
  }
}

const sidebarLinks = document.querySelectorAll('#sideMenu a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', closeSidebarAfterNavigation);
});

// 3. **Header Scroll Effect**
function handleScroll() {
  const header = document.querySelector('.header-bar');
  const scrollThreshold = 10; // Adjust as needed

  if (window.pageYOffset > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // **Show/Hide Scroll-to-Top Button**
  if (window.scrollY > 500) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
}

// 4. **Copy Code Button Functionality**
const copyButtons = document.querySelectorAll('.copy-button');

copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const code = button.previousElementSibling.textContent.trim(); // Improved selector
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

// 5. **Scroll-to-Top Button**
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

// **Sidebar Toggle Functions**
function openNav() {
  sideMenu.style.width = "300px";
  contentArea.style.marginLeft = "300px";
  sideMenu.classList.add('open');
  contentArea.classList.add('content-shifted');
}

function closeNav() {
  sideMenu.style.width = "0";
  contentArea.style.marginLeft = "0";
  sideMenu.classList.remove('open');
  contentArea.classList.remove('content-shifted');
}
