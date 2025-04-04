/* =====================================================
   Resume section tabs and tab contents
===================================================== */

const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

var resumeTabNav = function(resumeTabClick) {
   
   resumeTabContents.forEach((content) => content.style.display = "none");
   resumeTabContents.forEach((content) => content.classList.remove("active"));
   resumePortfolioTabBtns.forEach((btn) => btn.classList.remove("active"));

   
   resumeTabContents[resumeTabClick].style.display = "flex";

   setTimeout(() => {
      resumeTabContents[resumeTabClick].classList.add("active");
   }, 100);
  

   resumePortfolioTabBtns[resumeTabClick].classList.add("active");
}

resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
   resumePortfolioTabBtn.addEventListener("click", () => {
      resumeTabNav(i);
   });
});


/* =====================================================
   Service modal open/close function
===================================================== */

const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModals) => {
   const serviceCard = serviceCardWithModals.querySelector(".service-card");
   const serviceBackDrop = serviceCardWithModals.querySelector(".service-modal-backdrop");
   const serviceModal = serviceCardWithModals.querySelector(".service-modal");
   const modalCloseBtn = serviceCardWithModals.querySelector(".modal-close-btn");

   serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex"; // ✅ Fixed the typo

      setTimeout(() => {
         serviceBackDrop.classList.add("active");
      }, 100);

      setTimeout(() => {
         serviceModal.classList.add("active");
      }, 300);
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
         serviceBackDrop.style.display = "none"; 
      }, 500);  


      setTimeout(() => {
         serviceBackDrop.classList.remove("active");
         serviceModal.classList.remove("active");
      }, 100);
   });
});



/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */


// Filter portfolio cards according to portfolio tabs.
document.addEventListener("DOMContentLoaded", () => {
   const portfolioTabs = document.querySelector(".portfolio-tabs");
   const resumePortfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
   const cardWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

   resumePortfolioTabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
         const filter = tabBtn.getAttribute("data-filter");

         cardWithModals.forEach((cardWithModal) => {
            cardWithModal.style.transition = "opacity 0.5s ease"; // Ensure transition is always set

            if (filter === "all" || cardWithModal.classList.contains(filter)) {
               cardWithModal.style.display = "block"; // Make visible immediately
               setTimeout(() => {
                  cardWithModal.style.opacity = "1";
               }, 10); // Small delay to trigger the animation
            } else {
               cardWithModal.style.opacity = "0"; // Start fading out
               setTimeout(() => {
                  cardWithModal.style.display = "none"; // Hide after fade out
               }, 500); // Delay should match the transition duration
            }
         });

         // Fix: Use `resumePortfolioTabBtns` instead of `portfolioTabBtns`
         resumePortfolioTabBtns.forEach((btn) => btn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });
});




// Open/Close Portfolio modals.



const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

portfolioCardsWithModals.forEach((portfolioCardWithModal) => { // Fixed typo in parameter name
   const portfolioCard = portfolioCardWithModal.querySelector(".portfolio-card");
   const portfolioBackdrop = portfolioCardWithModal.querySelector(".portfolio-modal-backdrop");
   const portfolioModal = portfolioCardWithModal.querySelector(".portfolio-modal");
   const modalCloseBtn = portfolioCardWithModal.querySelector(".modal-close-btn");

   portfolioCard.addEventListener("click", () => {
      portfolioBackdrop.style.display = "flex";

      setTimeout(() => {
         portfolioBackdrop.classList.add("active");
         portfolioModal.classList.add("active"); // Moved inside to ensure smooth animation
      }, 300);
   });

   modalCloseBtn.addEventListener("click", () => {
      portfolioModal.classList.remove("active"); // Removes active class from modal first

      setTimeout(() => {
         portfolioBackdrop.classList.remove("active");
      }, 100); // Adjusted timing for smooth transition

      setTimeout(() => {
         portfolioBackdrop.style.display = "none";
      }, 300);
   });
});




/* =====================================================
   Testimonial Swiper
===================================================== */
document.addEventListener('DOMContentLoaded', function() {
   const container = document.getElementById('testimonialContainer');
   const dotsContainer = document.getElementById('carouselDots');
   const prevBtn = document.getElementById('prevBtn');
   const nextBtn = document.getElementById('nextBtn');
   const cards = document.querySelectorAll('.testimonial-card');
   let currentIndex = 0;
   const cardCount = cards.length;
   
   // Calculate how many cards are visible at once
   function getVisibleCardCount() {
       const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginLeft) * 2;
       return Math.floor(container.offsetWidth / cardWidth);
   }
   
   // Create dots based on number of testimonial groups
   function createDots() {
       dotsContainer.innerHTML = '';
       const visibleCards = getVisibleCardCount();
       const dotCount = Math.ceil(cardCount / visibleCards);
       
       for (let i = 0; i < dotCount; i++) {
           const dot = document.createElement('div');
           dot.classList.add('dot');
           if (i === 0) dot.classList.add('active');
           dot.addEventListener('click', () => {
               scrollToIndex(i * visibleCards);
           });
           dotsContainer.appendChild(dot);
       }
   }
   
   // Initialize dots
   createDots();
   
   // Handle window resize
   window.addEventListener('resize', () => {
       createDots();
       updateArrows();
   });
   
   // Scroll to specific index
   function scrollToIndex(index) {
       currentIndex = Math.max(0, Math.min(index, cardCount - 1));
       cards[currentIndex].scrollIntoView({
           behavior: 'smooth',
           block: 'nearest',
           inline: 'start'
       });
       updateDots();
       updateArrows();
   }
   
   // Update dot indicators
   function updateDots() {
       const dots = document.querySelectorAll('.dot');
       const visibleCards = getVisibleCardCount();
       const activeDot = Math.floor(currentIndex / visibleCards);
       
       dots.forEach((dot, index) => {
           dot.classList.toggle('active', index === activeDot);
       });
   }
   
   // Update arrow states
   function updateArrows() {
       prevBtn.classList.toggle('disabled', currentIndex === 0);
       nextBtn.classList.toggle('disabled', currentIndex >= cardCount - getVisibleCardCount());
   }
   
   // Arrow navigation
   prevBtn.addEventListener('click', () => {
       const visibleCards = getVisibleCardCount();
       scrollToIndex(currentIndex - visibleCards);
   });
   
   nextBtn.addEventListener('click', () => {
       const visibleCards = getVisibleCardCount();
       scrollToIndex(currentIndex + visibleCards);
   });
   
   // Initialize
   updateArrows();
});


/* =====================================================
 Send/ Receivr emails from clients
===================================================== */

document.addEventListener('DOMContentLoaded', function() {
   // Initialize EmailJS
   emailjs.init({
       publicKey: "3F_An-Cn3Rly3dZ2F",
   });

   // Get form and alert elements (corrected selectors)
   const contactForm = document.getElementById('sue-contact-form');
   const formAlert = document.querySelector('.contact-form-alert'); // Fixed typo in class name
   
   if (contactForm && formAlert) {
       contactForm.addEventListener('submit', function(event) {
           event.preventDefault();
           
           // Show loading state
           formAlert.innerHTML = `<span>Sending message...</span> <i class="ri-loader-4-line spin"></i>`;
           formAlert.style.display = 'block';
           formAlert.className = 'contact-form-alert alert-loading';

           emailjs.sendForm('service_i0fodjt', 'template_9w4xwun', contactForm)
               .then(function() {
                   // Success message
                   formAlert.innerHTML = `<span>Message sent successfully!</span> <i class="ri-checkbox-circle-fill"></i>`;
                   formAlert.className = 'contact-form-alert alert-success';
                   contactForm.reset();
                   
                   // Hide alert after 5 seconds
                   setTimeout(() => {
                       formAlert.style.display = 'none';
                   }, 5000);
               }, function(error) {
                   // Error message
                   formAlert.innerHTML = `<span>Failed to send message!</span> <i class="ri-error-warning-fill"></i>`;
                   formAlert.className = 'contact-form-alert alert-error';
                   console.error('EmailJS Error:', error);
               });
       });
   } else {
       console.error('Form or alert element not found');
   }
});

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
window.addEventListener("scroll", ()=> {
   const sueHeader = document.querySelector(".sue-header");

   sueHeader.classList.toggle("shrink", window.scrollY > 0);
});

/* =====================================================
   Shrink the height of the header on scroll
===================================================== */

/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
    const navMenuSections =  document.querySelectorAll(".nav-menu-section");
    const scrollY = window.pageXOffset;

   navMenuSections.forEach((navMenuSections) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop- 50;
      let id = navMenuSection.getAttribute("id")

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.remove("current");
      }
   });

});

// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");

   bottomNav.classList.toggle("active",  window.scrollY < 10);
});

// Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");

let navTimeout;
let isNavVisible = false;

// Initial setup
function setupNavigation() {
  // Show the menu button by default when page loads
  setTimeout(() => {
    menuShowBtn.classList.add('active');
  }, 1000);
}

// Handle scroll events
window.addEventListener("scroll", () => {
  if (!isNavVisible) {
    bottomNav.classList.add("active");
    menuHideBtn.classList.add("active");
    menuShowBtn.classList.remove('active');
    isNavVisible = true;
  }
  
  clearTimeout(navTimeout);
  
  navTimeout = setTimeout(() => {
    bottomNav.classList.remove("active");
    menuHideBtn.classList.remove("active");
    menuShowBtn.classList.add('active');
    isNavVisible = false;
  }, 2500);
});

// Hide button click handler
menuHideBtn.addEventListener("click", () => {
  bottomNav.classList.remove("active");
  menuHideBtn.classList.remove("active");
  menuShowBtn.classList.add('active');
  isNavVisible = false;
});

// Show button click handler
menuShowBtn.addEventListener("click", () => {
  bottomNav.classList.add("active");
  menuHideBtn.classList.add("active");
  menuShowBtn.classList.remove('active');
  isNavVisible = true;
  
  // Auto-hide after timeout
  clearTimeout(navTimeout);
  navTimeout = setTimeout(() => {
    bottomNav.classList.remove("active");
    menuHideBtn.classList.remove("active");
    menuShowBtn.classList.add('active');
    isNavVisible = false;
  }, 2500);
});

// Initialize
setupNavigation();


/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */

window.addEventListener("scroll", () => {
const toTopBtn = document.querySelector(".to-top-btn");

toTopBtn.classList.toggle("active", window.scrollY > 0);


const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

const pageScroll =  document.body-scrollTop || document.documentElement.scrollTop;
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

const scrollValue = (pageScroll / height) * 100;

scrollIndicatorBar.style.height = scrollValue + "%";
});

/* =====================================================
   Customized cursor on mousemove
===================================================== */

// Cursor effects on hover website elements.

/* =====================================================
   Website dark/light theme
===================================================== */

// Theme Toggle Functionality
const themeBtn = document.querySelector(".theme-btn");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

// Function to set theme
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-theme");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
    localStorage.setItem("darkTheme", "true");
  } else {
    document.body.classList.remove("dark-theme");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
    localStorage.setItem("darkTheme", "false");
  }
}

// Toggle theme on button click
themeBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-theme");
  setTheme(isDark);
});

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("darkTheme");
  
  // Default to light theme if no preference saved
  if (savedTheme === null) {
    setTheme(false);
  } else {
    setTheme(savedTheme === "true");
  }
});
/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.

document.addEventListener('DOMContentLoaded', function() {
   // Select only the sections you want to animate (excluding navbar)
   const sectionsToAnimate = document.querySelectorAll('.sue-section:not(.sue-header):not(.bottom-nav-container)');
   
   // Options for the Intersection Observer
   const observerOptions = {
     root: null,
     rootMargin: '0px',
     threshold: 0.1
   };
   
   // Create the observer
   const observer = new IntersectionObserver(function(entries) {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('visible');
         observer.unobserve(entry.target);
       }
     });
   }, observerOptions);
   
   // Observe each section
   sectionsToAnimate.forEach(section => {
     observer.observe(section);
   });
 });

/* =====================================================
 canvas
===================================================== */

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particles array
let particles = [];
const particleCount = 100;

// Particle colors
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create particles
function init() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    // Connect particles
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Start animation
init();
animate();