const toggleButton = document.querySelector('.toggle-menu'); //Get the toggle button element
const sideMenu = document.getElementById("sideMenu"); //Get the sidebar element
const contentArea = document.getElementById("content"); //Get the content element

let isMenuOpen = false; //Track the current state of the menu


toggleButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen; // Toggle the menu state

    if (isMenuOpen) {
        openNav();
    } else {
        closeNav();
    }
});

function closeSidebarAfterNavigation() {
  if (window.innerWidth <= 768) { // Check if it's a mobile device
      sideMenu.classList.remove('open');
      content.classList.remove('content-shifted');
  }
}

// Add event listeners to the sidebar links to close the sidebar after navigation
const sidebarLinks = document.querySelectorAll('#sideMenu a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', closeSidebarAfterNavigation);
});


window.addEventListener('scroll', handleScroll);

function handleScroll() {
  const header = document.querySelector('.header-bar');
  const scrollThreshold = 10; // Adjust as needed

  if (window.pageYOffset > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

function openNav() {
    sideMenu.style.width = "300px";
    contentArea.style.marginLeft = "300px";
}

function closeNav() {
    sideMenu.style.width = "0";
    contentArea.style.marginLeft = "0";
}


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