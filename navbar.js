document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    let lastScrollPosition = window.pageYOffset;
    
    document.addEventListener('scroll', function (event) {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition < lastScrollPosition) {
            // Scrolling up
            navbar.classList.add('visible');
        } else {
            // Scrolling down
            navbar.classList.remove('visible');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
});