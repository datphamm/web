/**
 * The Coffee Shop - Custom JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize Bootstrap Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize Testimonials Slider
    if (document.querySelector('.testimonials-slider')) {
        const testimonialSlider = tns({
            container: '.testimonials-slider',
            items: 1,
            slideBy: 1,
            autoplay: true,
            autoplayButtonOutput: false,
            autoplayTimeout: 5000,
            speed: 800,
            nav: false,
            controlsText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive: {
                768: {
                    items: 2,
                    gutter: 30
                },
                992: {
                    items: 3,
                    gutter: 30
                }
            }
        });
    }

    // Animate on scroll (simple implementation)
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    // Initial check
    checkIfInView();

    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Simple form validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');

            formInputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }

                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    }
                }
            });

            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For now, we'll just show a success message
                const formElements = contactForm.elements;
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = 'Thank you for your message! We will get back to you soon.';

                contactForm.reset();
                contactForm.appendChild(successMessage);

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });

        // Remove is-invalid class on input focus
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('is-invalid');
            });
        });
    }

    // Add to Cart functionality (simple implementation)
    const addToCartButtons = document.querySelectorAll('.btn-outline-primary');

    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(event) {
                event.preventDefault();

                // Get product information
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h4').textContent;
                const productPrice = productCard.querySelector('.price').textContent;

                // Show notification (in a real implementation, this would add to a cart)
                const notification = document.createElement('div');
                notification.className = 'toast position-fixed bottom-0 end-0 m-3';
                notification.setAttribute('role', 'alert');
                notification.setAttribute('aria-live', 'assertive');
                notification.setAttribute('aria-atomic', 'true');
                notification.innerHTML = `
                    <div class="toast-header bg-primary text-white">
                        <strong class="me-auto">Added to Cart</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${productName} (${productPrice}) has been added to your cart.
                    </div>
                `;

                document.body.appendChild(notification);

                const toast = new bootstrap.Toast(notification);
                toast.show();

                // Remove toast after it's hidden
                notification.addEventListener('hidden.bs.toast', function() {
                    notification.remove();
                });
            });
        }
    });

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                return;
            }

            // In a real implementation, this would subscribe the email to a newsletter
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = 'Thank you for subscribing to our newsletter!';

            newsletterForm.reset();
            newsletterForm.appendChild(successMessage);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });

        // Remove is-invalid class on input focus
        newsletterForm.querySelector('input[type="email"]').addEventListener('focus', function() {
            this.classList.remove('is-invalid');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();

                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add some CSS for the back to top button
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            background-color: var(--secondary);
            color: var(--light);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            text-align: center;
            z-index: 99;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
        }

        #back-to-top.show {
            display: block;
            opacity: 1;
        }

        #back-to-top:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
});
