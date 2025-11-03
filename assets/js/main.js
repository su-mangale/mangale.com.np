document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const header = document.querySelector('.header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 32) {
            header.classList.add('header--compressed');
        } else {
            header.classList.remove('header--compressed');
        }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});
