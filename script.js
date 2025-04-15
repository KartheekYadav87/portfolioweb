// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    
    // Hide loading screen after animations complete
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            startMainContentAnimations();
        }, 500);
    }, 4000);
});

// Start main content animations
function startMainContentAnimations() {
    const mainContent = document.querySelector('.main-content');
    const typingText = document.querySelector('.typing-text');
    const greeting = document.querySelector('.greeting');
    
    // Reset initial states
    mainContent.style.opacity = '0';
    greeting.style.opacity = '0';
    typingText.textContent = '';
    
    // Fade in main content
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transition = 'opacity 0.5s ease';
        
        // Start greeting animation
        setTimeout(() => {
            greeting.style.opacity = '1';
            greeting.style.transition = 'opacity 0.5s ease';
            
            // Start typing animation
            setTimeout(() => {
                typeText('Kartheek Yadav', typingText);
            }, 500);
        }, 500);
    }, 100);
}

// Improved typing animation
function typeText(text, element) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            // Random delay between 50ms and 150ms for more natural typing
            const randomDelay = Math.random() * (150 - 50) + 50;
            setTimeout(type, randomDelay);
        } else {
            // Add blinking cursor after typing completes
            element.classList.add('cursor-blink');
        }
    }
    
    type();
}

// Initialize other features
function initializeWebsite() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Scroll Progress and Navigation
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Update scroll progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Add scrolled class for styling when scrolled
        if (window.pageYOffset > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Initialize other features
    initializeFormSubmission();
    initializeAnimations();
}

function initializeFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .skill-card, .project-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Typing Effect for Hero Section
function startTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const nameToType = 'Kartheek Yadav';
    let charIndex = 0;

    typingText.textContent = ''; // Clear any existing content
    
    function typeWriter() {
        if (charIndex < nameToType.length) {
            typingText.textContent += nameToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing immediately when this function is called
    typeWriter();
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scrolling for all navigation links and CTA buttons
document.querySelectorAll('.nav-item, .cta-buttons .btn').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percent = progressBar.closest('.skill-bar').dataset.percent;
                progressBar.style.width = `${percent}%`;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bars animation when DOM is loaded
document.addEventListener('DOMContentLoaded', animateSkillBars);

// Project data
const projectData = {
    'web-dev': {
        title: 'Web Development Project',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
        overview: 'A comprehensive web development project showcasing modern technologies and best practices.',
        features: [
            'Responsive design for all devices',
            'Modern user interface with smooth animations',
            'RESTful API integration',
            'User authentication and authorization',
            'Real-time data updates'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    'ai-ml': {
        title: 'AI/ML Project',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
        overview: 'An innovative machine learning project focused on solving real-world problems.',
        features: [
            'Data preprocessing and analysis',
            'Machine learning model implementation',
            'Real-time predictions',
            'Interactive visualizations',
            'Performance metrics dashboard'
        ],
        technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'Matplotlib']
    },
    'gaming': {
        title: 'Gaming Project',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
        overview: 'An engaging gaming project built with modern game development technologies.',
        features: [
            'Multiple game levels',
            'Physics-based gameplay',
            'Custom character animations',
            'Score tracking system',
            'Sound effects and background music'
        ],
        technologies: ['Unity', 'C#', 'Blender', 'Adobe Photoshop']
    }
};

// Get DOM elements
const projectsGrid = document.querySelector('.projects-grid');
const projectDetailView = document.querySelector('.project-detail-view');
const backButton = document.querySelector('.back-button');

// Function to show project details
function showProjectDetails(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const detailContent = `
        <button class="back-button">← Back to Projects</button>
        <div class="project-content">
            <div class="project-showcase">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h2>${project.title}</h2>
                <section class="project-section">
                    <h3>Overview</h3>
                    <p>${project.overview}</p>
                </section>
                <section class="project-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </section>
                <section class="project-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </section>
            </div>
        </div>
    `;

    const projectDetailView = document.querySelector('.project-detail-view');
    const projectsGrid = document.querySelector('.projects-grid');

    // First, add the content
    projectDetailView.innerHTML = detailContent;
    
    // Then trigger the transitions
    requestAnimationFrame(() => {
        projectsGrid.classList.add('hidden');
        projectDetailView.classList.remove('hidden');
        
        // Use requestAnimationFrame to ensure the DOM has updated
        requestAnimationFrame(() => {
            projectDetailView.classList.add('active');
        });
    });

    // Add event listener to the back button
    document.querySelector('.back-button').addEventListener('click', hideProjectDetails);
}

// Function to hide project details
function hideProjectDetails() {
    const projectDetailView = document.querySelector('.project-detail-view');
    const projectsGrid = document.querySelector('.projects-grid');

    // First, start the transition out
    projectDetailView.classList.remove('active');

    // Wait for the transition to complete before hiding completely
    setTimeout(() => {
        projectDetailView.classList.add('hidden');
        projectsGrid.classList.remove('hidden');
    }, 500); // Match this with the CSS transition duration
}

// Add event listeners to project cards
document.querySelectorAll('.project-card .view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = e.target.closest('.project-card').dataset.project;
        showProjectDetails(projectId);
    });
});

// Theme Toggle Function
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    const themeText = document.querySelector('.theme-toggle .theme-text');
    
    if (icon && themeText) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
}

// Call theme initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
});

// Mobile Menu Functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
}); 