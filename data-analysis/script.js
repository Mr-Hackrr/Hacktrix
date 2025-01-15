// **Optimized JavaScript for Sidebar Navigation**

const sideMenu = document.getElementById('sideMenu');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggle-menu');
const closeButton = document.querySelector('.closebtn');
const sidebarLinks = document.querySelectorAll('#sideMenu a');
const header = document.querySelector('.header-bar');
const backdrop = document.createElement('div');
const scrollTopButton = document.createElement('button');
const copyButtons = document.querySelectorAll('.copy-button');
const SCROLL_THRESHOLD = 10;
const SCROLL_TO_TOP_VISIBILITY_THRESHOLD = 500;
const sidebarWidth = '300px';

let isMenuOpen = false;

// **Initial Setup**
sideMenu.style.width = '0';
sideMenu.style.transition = 'width 0.3s ease';
backdrop.className = 'backdrop';
backdrop.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5); display: none; z-index: 998; opacity: 0;
  transition: opacity 0.3s ease;
`;
document.body.appendChild(backdrop);

scrollTopButton.textContent = '↑';
scrollTopButton.style.cssText = `
  position: fixed; bottom: 20px; right: 20px; padding: 10px;
  border-radius: 50%; border: none; background-color: #4a90e2;
  color: #fff; cursor: pointer; font-size: 1.5rem; display: none;
  z-index: 1000; transition: opacity 0.3s ease;
`;
document.body.appendChild(scrollTopButton);

// **Functions**
function openSidebar() {
  if (window.innerWidth > 768) {
    // For large screens
    sideMenu.style.width = sidebarWidth;
    content.style.marginLeft = sidebarWidth;
  } else {
    // For mobile/portrait screens
    sideMenu.style.width = sidebarWidth;
    backdrop.style.display = 'block';
    setTimeout(() => (backdrop.style.opacity = '1'), 10);
  }
  isMenuOpen = true;
}

function closeSidebar() {
  sideMenu.style.width = '0';
  content.style.marginLeft = '0';
  backdrop.style.opacity = '0';
  setTimeout(() => (backdrop.style.display = 'none'), 300);
  isMenuOpen = false;
}

function toggleSidebar() {
  if (isMenuOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function scrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    if (window.innerWidth <= 768) closeSidebar();
  }
}

function handleScroll() {
  if (window.pageYOffset > SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (window.scrollY > SCROLL_TO_TOP_VISIBILITY_THRESHOLD) {
    scrollTopButton.style.display = 'block';
    scrollTopButton.style.opacity = '1';
  } else {
    scrollTopButton.style.opacity = '0';
    setTimeout(() => (scrollTopButton.style.display = 'none'), 300);
  }
}

function copyCode(button) {
  const codeBlock = button.closest('.code-box').querySelector('pre code');
  if (codeBlock) {
    navigator.clipboard.writeText(codeBlock.textContent.trim())
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => (button.textContent = 'Copy Code'), 1500);
      })
      .catch(err => {
        console.error('Error copying code:', err);
        button.textContent = 'Copy Error';
        setTimeout(() => (button.textContent = 'Copy Code'), 2500);
      });
  }
}

// **Event Listeners**
toggleButton.addEventListener('click', toggleSidebar);
closeButton.addEventListener('click', closeSidebar);
backdrop.addEventListener('click', closeSidebar);

sidebarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    sideMenu.style.width = sidebarWidth;
    content.style.marginLeft = sidebarWidth;
  } else if (!isMenuOpen) {
    sideMenu.style.width = '0';
    content.style.marginLeft = '0';
  }
});

// **Animations and Enhancements**
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    scrollToSection(hash);
  }

  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightBlock(block);
  });

  // Add fade-in animation to content
  content.style.opacity = '0';
  content.style.transition = 'opacity 0.5s ease';
  setTimeout(() => (content.style.opacity = '1'), 100);
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    scrollToSection(hash);
  }
});

// Attach event listeners to copy buttons
document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('click', () => copyCode(button));
});
