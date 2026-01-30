
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       SPLASH SCREEN
       ========================================= */
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        // Prevent scrolling while splash screen is visible
        document.body.style.overflow = 'hidden';
        
        // Hide splash screen after 2 seconds with fade out
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }, 1000); // Wait for fade out animation to complete
        }, 2000);
    }

    /* =========================================
       DARK MODE TOGGLE
       ========================================= */
    const themeToggleBtnDesktop = document.getElementById('theme-toggle-desktop');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    function toggleTheme() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    if (themeToggleBtnDesktop) {
        themeToggleBtnDesktop.addEventListener('click', toggleTheme);
    }


    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function closeMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMenu);

        if (mobileMenuCloseBtn) {
            mobileMenuCloseBtn.addEventListener('click', closeMenu);
        }

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }


    /* =========================================
       SCROLL ANIMATIONS (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));


    /* =========================================
       BOUNCE CARDS ANIMATION
       ========================================= */
    const bounceCards = document.querySelectorAll('.bounce-card');
    const transformStyles = [
        'rotate(10deg) translate(-170px)',
        'rotate(5deg) translate(-85px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(85px)',
        'rotate(2deg) translate(170px)'
    ];

    let bounceCardsAnimated = false;

    // Animate bounce cards when section comes into view
    if (bounceCards.length > 0 && typeof gsap !== 'undefined') {
        const bounceCardsSection = document.getElementById('creative-work');
        if (bounceCardsSection) {
            const bounceCardsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !bounceCardsAnimated) {
                        bounceCardsAnimated = true;
                        gsap.fromTo('.bounce-card', 
                            { scale: 0 },
                            {
                                scale: 1,
                                stagger: 0.06,
                                ease: 'elastic.out(1, 0.8)',
                                delay: 0.5
                            }
                        );
                    }
                });
            }, { threshold: 0.3 });

            bounceCardsObserver.observe(bounceCardsSection);
        }

        // Helper functions
        const getNoRotationTransform = (transformStr) => {
            const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
            if (hasRotate) {
                return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
            } else if (transformStr === 'none') {
                return 'rotate(0deg)';
            } else {
                return `${transformStr} rotate(0deg)`;
            }
        };

        const getPushedTransform = (baseTransform, offsetX) => {
            const translateRegex = /translate\(([-0-9.]+)px\)/;
            const match = baseTransform.match(translateRegex);
            if (match) {
                const currentX = parseFloat(match[1]);
                const newX = currentX + offsetX;
                return baseTransform.replace(translateRegex, `translate(${newX}px)`);
            } else {
                return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
            }
        };

        const pushSiblings = (hoveredIdx) => {
            bounceCards.forEach((card, i) => {
                const selector = `.card-${i}`;
                gsap.killTweensOf(selector);

                const baseTransform = transformStyles[i] || 'none';

                if (i === hoveredIdx) {
                    const noRotationTransform = getNoRotationTransform(baseTransform);
                    gsap.to(selector, {
                        transform: noRotationTransform,
                        duration: 0.4,
                        ease: 'back.out(1.4)',
                        overwrite: 'auto'
                    });
                } else {
                    const offsetX = i < hoveredIdx ? -160 : 160;
                    const pushedTransform = getPushedTransform(baseTransform, offsetX);

                    const distance = Math.abs(hoveredIdx - i);
                    const delay = distance * 0.05;

                    gsap.to(selector, {
                        transform: pushedTransform,
                        duration: 0.4,
                        ease: 'back.out(1.4)',
                        delay,
                        overwrite: 'auto'
                    });
                }
            });
        };

        const resetSiblings = () => {
            bounceCards.forEach((card, i) => {
                const selector = `.card-${i}`;
                gsap.killTweensOf(selector);
                const baseTransform = transformStyles[i] || 'none';
                gsap.to(selector, {
                    transform: baseTransform,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    overwrite: 'auto'
                });
            });
        };

        // Add event listeners
        bounceCards.forEach((card, idx) => {
            card.addEventListener('mouseenter', () => pushSiblings(idx));
            card.addEventListener('mouseleave', resetSiblings);
        });
    }


    /* =========================================
       CLICK SPARK EFFECT
       ========================================= */
    const sparkConfig = {
        sparkColor: '#C8A2C8', // brand-lilac - same as selected projects underline
        sparkSize: 15,
        sparkRadius: 30,
        sparkCount: 12,
        duration: 600,
        easing: 'ease-out',
        extraScale: 1.2
    };

        const canvas = document.getElementById('click-spark-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let sparks = [];
            let animationId = null;

            const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            };

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Initial resize after a short delay to ensure DOM is ready
            setTimeout(resizeCanvas, 100);

        const easeFunc = (t) => {
            switch (sparkConfig.easing) {
                case 'linear':
                    return t;
                case 'ease-in':
                    return t * t;
                case 'ease-in-out':
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t); // ease-out
            }
        };

        const createSparks = (x, y) => {
            const now = performance.now();
            const newSparks = Array.from({ length: sparkConfig.sparkCount }, (_, i) => ({
                x,
                y,
                angle: (2 * Math.PI * i) / sparkConfig.sparkCount,
                startTime: now
            }));
            sparks.push(...newSparks);
        };

        const draw = (timestamp) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (sparks.length > 0) {
                sparks = sparks.filter(spark => {
                    const elapsed = timestamp - spark.startTime;
                    if (elapsed >= sparkConfig.duration) {
                        return false;
                    }

                    const progress = elapsed / sparkConfig.duration;
                    const eased = easeFunc(progress);

                    const distance = eased * sparkConfig.sparkRadius * sparkConfig.extraScale;
                    const lineLength = sparkConfig.sparkSize * (1 - eased);

                    const x1 = spark.x + distance * Math.cos(spark.angle);
                    const y1 = spark.y + distance * Math.sin(spark.angle);
                    const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                    const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                    ctx.strokeStyle = sparkConfig.sparkColor;
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();

                    return true;
                });
            }

            // Continue animation loop if there are sparks
            if (sparks.length > 0) {
                animationId = requestAnimationFrame(draw);
            } else {
                animationId = null;
            }
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            createSparks(x, y);

            // Start animation loop if not already running
            if (!animationId) {
                animationId = requestAnimationFrame(draw);
            }
        };

        document.addEventListener('click', handleClick);
    }


    /* =========================================
       OTHER PROJECTS CARDS HOVER EFFECT
       ========================================= */
    const otherProjectCards = document.querySelectorAll('.other-project-card');
    
    if (otherProjectCards.length > 0) {
        // Store original z-index values
        const originalZIndex = ['10', '20', '10', '0'];
        const originalOpacity = ['1', '1', '1', '0.8'];
        
        otherProjectCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                // Bring hovered card to front
                card.style.zIndex = '50';
                card.classList.add('scale-110');
                card.style.opacity = '1';
                
                // Push other cards back
                otherProjectCards.forEach((otherCard, otherIndex) => {
                    if (otherCard !== card) {
                        otherCard.style.zIndex = '10';
                        otherCard.style.opacity = otherIndex === 3 ? '0.6' : '0.7';
                    }
                });
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset all cards to original state
                otherProjectCards.forEach((otherCard, otherIndex) => {
                    otherCard.style.zIndex = originalZIndex[otherIndex];
                    otherCard.style.opacity = originalOpacity[otherIndex];
                    otherCard.classList.remove('scale-110');
                });
            });
        });
    }

    /* =========================================
       PROJECTS PAGE TABS
       ========================================= */
    const softwareTab = document.getElementById('software-tab');
    const creativeTab = document.getElementById('creative-tab');
    const softwareProjects = document.getElementById('software-projects');
    const creativeProjects = document.getElementById('creative-projects');

    if (softwareTab && creativeTab && softwareProjects && creativeProjects) {
        const switchToSoftware = () => {
            softwareTab.classList.add('active', 'bg-brand-lilac', 'text-brand-black');
            softwareTab.classList.remove('bg-transparent', 'border-2', 'border-brand-lilac', 'text-brand-lilac');
            creativeTab.classList.remove('active', 'bg-brand-lilac', 'text-brand-black');
            creativeTab.classList.add('bg-transparent', 'border-2', 'border-brand-lilac', 'text-brand-lilac', 'dark:text-brand-lilac');
            softwareProjects.classList.remove('hidden');
            creativeProjects.classList.add('hidden');
        };

        const switchToCreative = () => {
            creativeTab.classList.add('active', 'bg-brand-lilac', 'text-brand-black');
            creativeTab.classList.remove('bg-transparent', 'border-2', 'border-brand-lilac', 'text-brand-lilac', 'dark:text-brand-lilac');
            softwareTab.classList.remove('active', 'bg-brand-lilac', 'text-brand-black');
            softwareTab.classList.add('bg-transparent', 'border-2', 'border-brand-lilac', 'text-brand-lilac', 'dark:text-brand-lilac');
            creativeProjects.classList.remove('hidden');
            softwareProjects.classList.add('hidden');
        };

        softwareTab.addEventListener('click', switchToSoftware);
        creativeTab.addEventListener('click', switchToCreative);
    }

    /* =========================================
       PROJECT ACCORDION FUNCTIONALITY
       ========================================= */
    const accordionItems = document.querySelectorAll('.project-accordion-item');
    
    accordionItems.forEach((item) => {
        const header = item.querySelector('.project-accordion-header');
        const content = item.querySelector('.project-accordion-content');
        const toggle = item.querySelector('.project-accordion-toggle');
        
        if (header && content && toggle) {
            const toggleAccordion = (e) => {
                // Prevent event bubbling if clicking the button
                if (e.target.closest('.project-accordion-toggle')) {
                    e.stopPropagation();
                }
                
                const isOpen = content.classList.contains('open');
                
                // Close all other accordions (optional - remove if you want multiple open)
                accordionItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.project-accordion-content');
                        const otherToggle = otherItem.querySelector('.project-accordion-toggle');
                        if (otherContent && otherToggle) {
                            otherContent.classList.remove('open');
                            otherToggle.classList.remove('open');
                        }
                    }
                });
                
                // Toggle current accordion
                if (isOpen) {
                    content.classList.remove('open');
                    toggle.classList.remove('open');
                } else {
                    content.classList.add('open');
                    toggle.classList.add('open');
                }
            };
            
            header.addEventListener('click', toggleAccordion);
            toggle.addEventListener('click', toggleAccordion);
        }
    });

});
