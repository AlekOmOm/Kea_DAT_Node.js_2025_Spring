// footer.js (as a module)
// Import company name from main.js module

// If using modules (Option 3), you can import from main.js
// import { companyName } from './main.js';

document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.querySelector('footer');
  
  if (!footerContainer) {
    console.error('Footer element not found');
    return;
  }
  
  const copyRightTag = document.createElement('p');
  const currentYear = new Date().getFullYear();
  
  // companyName from window object (in main.js)
  const companyName = window.companyName || 'DogInder';
  
  copyRightTag.textContent = `© ${currentYear} ${companyName}`;
  footerContainer.appendChild(copyRightTag);
});
