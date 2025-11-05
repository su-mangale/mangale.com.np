document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            window.setTimeout(() => contactForm.reset(), 200);
        });
    }

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 32) {
                header.classList.add('header--compressed');
            } else {
                header.classList.remove('header--compressed');
            }
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const viewCounters = document.querySelectorAll('[data-view-key]');
    if (viewCounters.length) {
        const NAMESPACE = 'mangale-portfolio-blogs';

        const ensureCounter = async (key) => {
            const url = new URL('https://api.countapi.xyz/create');
            url.searchParams.set('namespace', NAMESPACE);
            url.searchParams.set('key', key);
            url.searchParams.set('value', '0');

            try {
                await fetch(url);
            } catch (error) {
                console.error('Failed to ensure counter', error);
            }
        };

        const requestCount = async (key, action) => {
            const endpoint = `https://api.countapi.xyz/${action}/${NAMESPACE}/${key}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`CountAPI ${action} failed`);
            }
            const payload = await response.json();
            return typeof payload.value === 'number' ? payload.value : 0;
        };

        const getCount = async (key, action) => {
            try {
                return await requestCount(key, action);
            } catch (error) {
                await ensureCounter(key);
                return requestCount(key, action === 'hit' ? 'hit' : 'get');
            }
        };

        const formatCount = (value) => {
            const safeValue = Number.isFinite(value) ? value : 0;
            const label = safeValue === 1 ? 'view' : 'views';
            return `${safeValue.toLocaleString()} ${label}`;
        };

        viewCounters.forEach((counter) => {
            const key = counter.dataset.viewKey;
            if (!key) return;

            const action = counter.dataset.viewAction === 'increment' ? 'hit' : 'get';

            getCount(key, action)
                .then((value) => {
                    counter.textContent = formatCount(value);
                })
                .catch((error) => {
                    console.error('Unable to load view count', error);
                    counter.textContent = '0 views';
                });
        });
    }
});
