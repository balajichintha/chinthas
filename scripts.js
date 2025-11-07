const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
const content = document.querySelector('.content');
const circle = document.querySelector('.circle');

// 💡 NEW: Map tab indices to desired body background colors
const colorMap = [
  '#8714ec', // Index 0:
  '#3f740f', // Index 1:
  '#024f4c', // Index 2:
  '#ae034a', // Index 3:
  '#137759', // Index 4:
  '#791ef0', // Index 5:
  '#ce1139', // Index 6;
  '#147c9e'  // Index 7:
];

// Variable to store the currently active index
let activeIndex = 0; 
let scrollTimeout;

// Function to check and set the active tab based on scroll position
function checkActiveSection() {
    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        
        // 💡 CHANGE: Use a more generous detection window. 
        // Checks if the section's top edge is near the center of the viewport (e.g., within 25% of the height).
        if (rect.top >= -window.innerHeight * 0.25 && rect.top < window.innerHeight * 0.75) {
            if (activeIndex !== i) { // Only update if the index has changed
                activeIndex = i;
                setActiveTab(i);
                rotateCircle(i);
            }
        }
    });
}

// Scroll to section on tab click
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.index;
    const target = document.querySelector(`.section[data-index="${idx}"]`);
    target.scrollIntoView({ behavior: 'smooth' });
    // Immediately update tab/rotation when clicking, not just on scroll
    setActiveTab(parseInt(idx));
    rotateCircle(parseInt(idx));
  });
});

// 💡 MODIFIED: Scroll listener with debounce/timeout for better scroll-snap handling
content.addEventListener('scroll', () => {
    // Check frequently during scroll to update quickly
    checkActiveSection(); 

    // Clear any pending timeout
    clearTimeout(scrollTimeout);
    
    // Set a new timeout to run the check one last time after scrolling finishes
    scrollTimeout = setTimeout(checkActiveSection, 150);
});

function setActiveTab(index) {
  tabs.forEach(tab => tab.classList.remove('active'));
  tabs[index].classList.add('active');

  // --- 💡 NEW FEATURE: Add/Update Body Class ---
  // 1. Remove all existing color classes (class names start with 'color-')
  document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.startsWith('color-'))
      .join(' ');

  // 2. Add the new class name based on the index (e.g., 'color-0', 'color-1')
  document.body.classList.add(`color-${index}`);
  // ---------------------------------------------

  // Change the body background color with a transition (inline style)
  document.body.style.background = colorMap[index];
  document.body.style.transition = 'background 0.8s ease'; 
}

function rotateCircle(index) {
  const angleStep = 15;
  const rotateDeg = -index * angleStep;
  circle.style.transform = `rotate(${rotateDeg}deg)`;
}

// Initialize
setActiveTab(0);
rotateCircle(0);