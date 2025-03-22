// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        highlightNavOnScroll();
        animateOnScroll();
    });

    // Initialize contact form
    initContactForm();
    
    // Initialize tech stack animations
    initTechStackAnimations();
    
    // Initialize certifications modal
    initCertificationsModal();
});

// Initialize animations for tech stack categories and tags
function initTechStackAnimations() {
    // Set index attributes for staggered animations
    document.querySelectorAll('.tech-category').forEach((category, categoryIndex) => {
        category.style.setProperty('--category-index', categoryIndex + 1);
        
        category.querySelectorAll('.tech-tag').forEach((tag, tagIndex) => {
            tag.style.setProperty('--tag-index', tagIndex + 1);
        });
    });
    
    // Add hover effect for tech tags
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.setProperty('--hover', '1');
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.setProperty('--hover', '0');
        });
    });
}

// Initialize animations for elements that should animate on page load
function initAnimations() {
    // Animate hero section elements (these are handled by CSS animations)
    
    // Animate the first visible elements in other sections
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage && aboutText) {
        setTimeout(() => {
            aboutImage.classList.add('animate');
            aboutText.classList.add('animate');
            
            // Initialize skill bars with a slight delay for each
            const skillLevels = document.querySelectorAll('.skill-level');
            skillLevels.forEach((skill, index) => {
                setTimeout(() => {
                    const width = skill.style.width || '0%';
                    skill.style.setProperty('--width', width);
                }, 300 + (index * 100));
            });
        }, 300);
    }
    
    // Animate achievements section
    const achievementsVisual = document.querySelector('.achievements-visual');
    const achievementsText = document.querySelector('.achievements-text');
    
    if (achievementsVisual && achievementsText && isInViewport(achievementsVisual)) {
        setTimeout(() => {
            achievementsVisual.classList.add('animate');
            achievementsText.classList.add('animate');
            
            // Stagger animation for achievement list items
            const achievementItems = document.querySelectorAll('.achievement-list li');
            achievementItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 300 + (index * 150));
            });
        }, 300);
    }
}

// Check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Animate elements when they come into view during scrolling
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header:not(.animate), .testimonial-item:not(.animate), .timeline-item:not(.animate), .contact-item:not(.animate), .contact-form:not(.animate), .achievements-visual:not(.animate), .achievements-text:not(.animate), .achievement-list li:not(.animate)');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
            
            // If this is a section header, also animate its parent section's elements
            if (element.classList.contains('section-header')) {
                const parentSection = element.closest('section');
                if (parentSection) {
                    setTimeout(() => {
                        const elementsToAnimate = parentSection.querySelectorAll('.testimonial-item:not(.animate), .timeline-item:not(.animate), .contact-item:not(.animate), .achievement-list li:not(.animate)');
                        elementsToAnimate.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('animate');
                            }, 200 + (index * 100)); // Stagger the animations
                        });
                    }, 300);
                }
            }
        }
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const headerOffset = 70; // Offset for fixed header
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to current link
                this.classList.add('active');
                
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight navigation links based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const headerOffset = 100; // Slightly larger than scrolling offset
    
    let currentSection = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    // Show first testimonial
    if (testimonialItems.length > 0) {
        testimonialItems[0].style.display = 'block';
        setTimeout(() => {
            testimonialItems[0].classList.add('animate');
        }, 100);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto slide every 6 seconds
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }, 6000);
    
    // Pause slider on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                showTestimonial(currentIndex);
            }, 6000);
        });
    }
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animate');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected testimonial
        testimonialItems[index].style.display = 'block';
        setTimeout(() => {
            testimonialItems[index].classList.add('animate');
        }, 100);
        
        // Add active class to selected dot
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For now, we'll just show a success message
                contactForm.innerHTML = '<div class="success-message">Thank you for your message! I will get back to you soon.</div>';
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = '#ef4444';
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Add active class to nav link for current section on page load
window.addEventListener('load', function() {
    highlightNavOnScroll();
    
    // Trigger scroll event to animate elements in viewport on load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
});

// Initialize certifications modal functionality
function initCertificationsModal() {
    const viewAllCertsBtn = document.getElementById('view-all-certs');
    const certsModalOverlay = document.getElementById('certs-modal-overlay');
    const closeCertsModalBtn = document.getElementById('close-certs-modal');
    
    if (viewAllCertsBtn && certsModalOverlay && closeCertsModalBtn) {
        // Open modal when view all button is clicked
        viewAllCertsBtn.addEventListener('click', function() {
            certsModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Animate the modal container after a slight delay
            setTimeout(() => {
                const modalContainer = certsModalOverlay.querySelector('.modal-container');
                if (modalContainer) {
                    modalContainer.style.opacity = '1';
                    modalContainer.style.transform = 'translateY(0)';
                }
            }, 50);
        });
        
        // Close modal when close button is clicked
        closeCertsModalBtn.addEventListener('click', function() {
            closeModal();
        });
        
        // Close modal when clicking outside the modal content
        certsModalOverlay.addEventListener('click', function(e) {
            if (e.target === certsModalOverlay) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && certsModalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
        
        function closeModal() {
            const modalContainer = certsModalOverlay.querySelector('.modal-container');
            if (modalContainer) {
                modalContainer.style.opacity = '0';
                modalContainer.style.transform = 'translateY(30px)';
            }
            
            setTimeout(() => {
                certsModalOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        }
    }
} 