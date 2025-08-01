// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all main sections and cards
    const elementsToAnimate = document.querySelectorAll('.problem-card, .solution-part, .timeline-item, .roi-card, .main-risk');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        // Сохраняем tooltip если есть
        const tooltip = element.querySelector('.info-tooltip');
        const hasTooltip = !!tooltip;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            
            // Format number based on target and original text
            const originalText = element.getAttribute('data-original') || element.textContent;
            let newContent = '';
            
            if (originalText.includes('x')) {
                newContent = Math.floor(start) + 'x';
            } else if (originalText.includes('+')) {
                newContent = '+' + Math.floor(start) + '%';
            } else if (originalText.includes('%') || target >= 10) {
                newContent = Math.floor(start) + '%';
            } else {
                newContent = Math.floor(start);
            }
            
            // Обновляем только текст, не трогая HTML
            if (hasTooltip) {
                element.innerHTML = newContent + tooltip.outerHTML;
            } else {
                element.textContent = newContent;
            }
        }, 16);
    }

    // Team member tooltips are handled via CSS using data-member-info attribute

    // Animate hero statistics when they come into view
    const heroStats = document.querySelectorAll('.stat-number');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                entry.target.setAttribute('data-original', text);
                
                if (text.includes('55%')) {
                    animateCounter(entry.target, 55);
                } else if (text.includes('4x')) {
                    animateCounter(entry.target, 4);
                } else if (text === '24/7') {
                    // Special case for 24/7
                    entry.target.textContent = '24/7';
                } else {
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (text.includes('%')) {
                        animateCounter(entry.target, number);
                    } else if (text.includes('x')) {
                        animateCounter(entry.target, number);
                    }
                }
            }
        });
    }, observerOptions);

    heroStats.forEach(stat => heroObserver.observe(stat));

    // Animate ROI metrics
    const roiMetrics = document.querySelectorAll('.roi-metric');
    const roiObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                entry.target.setAttribute('data-original', text);
                
                if (text.includes('65%')) {
                    animateCounter(entry.target, 65);
                } else if (text.includes('70%')) {
                    animateCounter(entry.target, 70);
                } else if (text.includes('+25%')) {
                    animateCounter(entry.target, 25);
                } else if (text.includes('+15%')) {
                    animateCounter(entry.target, 15);
                } else {
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (text.includes('%')) {
                        animateCounter(entry.target, number);
                    } else if (text.includes('x')) {
                        animateCounter(entry.target, number);
                    }
                }
            }
        });
    }, observerOptions);

    roiMetrics.forEach(metric => roiObserver.observe(metric));

    // Animate ROI result
    const roiResult = document.querySelector('.roi-result');
    if (roiResult) {
        const roiResultObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, 65, 3000);
                }
            });
        }, observerOptions);

        roiResultObserver.observe(roiResult);
    }

    // Parallax effect for hero section disabled to fix clipping
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const hero = document.querySelector('.hero');
    //     const parallaxSpeed = 0.5;
    //     
    //     if (hero) {
    //         hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    //     }
    // });

    // Removed duplicate hover effects that conflict with CSS
    // CSS :hover pseudo-classes are more performant and don't cause scroll artifacts

    // Global click handler for various events
    document.addEventListener('click', function(e) {
        // Handle smooth scrolling for anchor links
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Close tooltips when clicking outside
        if (!e.target.closest('.info-tooltip')) {
            document.querySelectorAll('.info-tooltip').forEach(tooltip => {
                tooltip.classList.remove('active');
            });
        }
    });

    // Add floating animation to hero logo
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        // CSS animation is already handling the float effect
        // No additional JavaScript needed
    }

    // Timeline item sequential animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 200);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Info tooltips functionality
    function initTooltips() {
        const tooltips = document.querySelectorAll('.info-tooltip');
        
        tooltips.forEach(tooltip => {
            const icon = tooltip.querySelector('.info-icon');
            const content = tooltip.querySelector('.tooltip-content');
            
            if (icon && content) {
                // Handle touch devices
                icon.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other tooltips
                    tooltips.forEach(otherTooltip => {
                        if (otherTooltip !== tooltip) {
                            otherTooltip.classList.remove('active');
                        }
                    });
                    
                    // Toggle current tooltip
                    tooltip.classList.toggle('active');
                });
                
                // Handle mouse events for desktop
                tooltip.addEventListener('mouseenter', function() {
                    if (!('ontouchstart' in window)) {
                        tooltip.classList.add('hover');
                    }
                });
                
                tooltip.addEventListener('mouseleave', function() {
                    tooltip.classList.remove('hover');
                });
            }
        });
        
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                tooltips.forEach(tooltip => {
                    tooltip.classList.remove('active');
                });
            }
        });
    }
    
    // Initialize tooltips after DOM is loaded
    initTooltips();
    
    // Avatar tooltips are now handled purely with CSS using data-member-info attribute

});