document.addEventListener('DOMContentLoaded', () => {

    // Intro Animation
    const introOverlay = document.querySelector('.intro-overlay');
    if (introOverlay) {
        // Wait for animation (3s) then fade out
        setTimeout(() => {
            introOverlay.classList.add('fade-out');

            // Allow body scroll if hidden (optional, depends on implementation)
            // document.body.style.overflow = 'auto'; 
        }, 3000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        });
    });

    // Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Theme Toggle
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    if (themeIcon) {
        themeIcon.parentElement.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            // Toggle Icon and Save Preference
            if (body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // FAQ Accordion
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            if (!answer) return;

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            const isActive = item.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // Project Case Study Modal Functionality
    const caseStudies = {
        'college-system': {
            title: "GCT Bhakkar Portal",
            category: "Academic Hub & Responsive Platform",
            problem: "The Government College of Technology, Bhakkar needed a centralized web presence to help students access notifications, download files, and explore departments. The existing layout was static and not optimized for mobile view grids.",
            solution: "Designed and implemented a fluid grid structure using Bootstrap and semantic HTML5. Integrated filterable departments view, a real-time notice board carousel, and contact inquiry validations.",
            role: "Frontend Developer (UI/UX Design, Bootstrap structures, Local state filters)",
            tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git"]
        },
        'ai-portal': {
            title: "AI Job & Hostel Portal",
            category: "Full UI Prototypes & Mockups",
            problem: "Job seekers and local students had to browse separate layouts to find jobs or local hostel details, resulting in poor user engagement and confusing user flows.",
            solution: "Crafted a MERN-ready mockup portal presenting filter queries, dynamic job registration pages, responsive dashboard modules, and interactive listings cards using customized Glassmorphism patterns.",
            role: "UX/UI Designer & Frontend Prototyper",
            tech: ["HTML5", "CSS3", "JavaScript ES6", "Figma Design"]
        },
        'easypaisa': {
            title: "EasyPaisa Console App",
            category: "Banking Logic Simulator",
            problem: "Simulating enterprise wallet transactions while ensuring correct variable flow, pin authorization, and local record preservation in low-level memory environments.",
            solution: "Programmed a console database script utilizing Object-Oriented C++ principles, validating PIN access, handling dynamic float balances, and printing transactional ledger tables.",
            role: "Core Developer (System Architecture, Memory State Logs)",
            tech: ["C++", "OOP", "Data Structures", "Console I/O"]
        },
        'quiz-app': {
            title: "Interactive Quiz App",
            category: "Frontend Web Application",
            problem: "Creating an engaging quiz experience with multiple categories, high performance, local storage score memory, and responsive layout constraints.",
            solution: "Built a vanilla JS application utilizing interval timers, dynamic DOM node updates, SVG scoring progress boards, and session history preservation.",
            role: "Solo Developer",
            tech: ["HTML5", "CSS3", "JavaScript ES6", "SVG Rendering"]
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body-content');

    const openModal = (projectKey) => {
        const data = caseStudies[projectKey];
        if (!data) return;

        let techBadges = data.tech.map(t => `<span class="skill-badge">${t}</span>`).join('');

        modalBody.innerHTML = `
            <h2>${data.title} <span>Case Study</span></h2>
            <p style="font-weight: 600; color: var(--secondary); margin-bottom: 20px;">${data.category}</p>
            <div class="modal-grid-content">
                <div>
                    <h4 class="modal-section-title"><i class="fas fa-exclamation-circle"></i> The Challenge</h4>
                    <p>${data.problem}</p>
                    <h4 class="modal-section-title"><i class="fas fa-check-circle"></i> The Solution</h4>
                    <p>${data.solution}</p>
                </div>
                <div>
                    <h4 class="modal-section-title"><i class="fas fa-user-tag"></i> My Role</h4>
                    <p>${data.role}</p>
                    <h4 class="modal-section-title"><i class="fas fa-laptop-code"></i> Technologies Used</h4>
                    <div class="modal-tech-list">${techBadges}</div>
                </div>
            </div>
        `;

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Save body state and scroll
    };

    const closeModal = () => {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    // Bind Detail Buttons
    document.querySelectorAll('.btn-case-study').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectKey = e.currentTarget.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Contact Form Valiadation / Simulated Submission
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !subject || !message) {
                showMessage("Please fill in all layout field values.", "error");
                return;
            }

            // Optional regex match
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage("Please enter a valid email address.", "error");
                return;
            }

            // Simulate sending feedback
            showMessage("Sending message...", "success");
            
            setTimeout(() => {
                showMessage("Thanks, Tamoor has received your message and will respond within 24 hours!", "success");
                contactForm.reset();
            }, 1500);
        });
    }

    function showMessage(text, type) {
        contactStatus.textContent = text;
        contactStatus.className = 'contact-status-msg ' + type;
        if (type === 'error') {
            contactStatus.style.display = 'block';
        }
    }

    // Optional Mouse Blob Parallax
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        if (blobs.length > 0) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
                const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

                blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        }
    });

});
