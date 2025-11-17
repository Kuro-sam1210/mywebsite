// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Animate progress bars on scroll
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.querySelector('.progress');
      const width = progress.style.width;
      progress.style.width = '0%';
      setTimeout(() => {
        progress.style.width = width;
      }, 100);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill').forEach(skill => {
  progressObserver.observe(skill);
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // In a real implementation, you'd send this to a backend service
  alert('Thank you for your message! I\'ll get back to you soon.');
  contactForm.reset();
});

// Cycling titles for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const titles = [
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'Tech Innovator'
];
let titleIndex = 0;

function cycleTitles() {
  heroSubtitle.textContent = titles[titleIndex];
  titleIndex = (titleIndex + 1) % titles.length;
}

// Start cycling after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    cycleTitles();
    setInterval(cycleTitles, 3000); // Change every 3 seconds
  }, 1000);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  document.querySelector('.hero-bg').style.transform = `translateY(${rate}px)`;
});

// Skills slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);

// Dot click handlers
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});