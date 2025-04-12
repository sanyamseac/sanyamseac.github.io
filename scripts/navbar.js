document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuOverlay = document.querySelector('.menu-overlay');

    let lastScrollPosition = window.pageYOffset;
    
    // Scroll handler for hiding/showing navbar
    document.addEventListener('scroll', function (event) {
        // Only handle scroll events when menu is closed
        if (!hamburger.classList.contains('active')) {
            const currentScrollPosition = window.pageYOffset;
            
            if (currentScrollPosition < lastScrollPosition) {
                // Scrolling up
                navbar.classList.add('visible');
            } else {
                // Scrolling down
                navbar.classList.remove('visible');
            }
            
            lastScrollPosition = currentScrollPosition;
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : ''; // Prevent scrolling when menu is open
    });

    // Close menu when overlay is clicked
    menuOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});