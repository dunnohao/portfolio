document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scrolled State
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation for Grids
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(revealCallback, observerOptions);

    // Stagger items wrapper
    const staggerContainers = document.querySelectorAll('.grid-stagger');
    
    staggerContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            // Setup delay based on index for stagger effect
            item.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(item);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Development / CMS Widget (Only visible on localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const adminHtml = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); padding: 15px; border-radius: 8px; z-index: 9999; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <p style="margin:0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #aaa;">Local CMS Admin</p>
                <div style="font-size: 11px; color: #666; max-width: 180px; line-height: 1.4; margin-bottom: 5px;">
                    Drop a folder in <code style="background:#222;padding:2px 4px;border-radius:2px;">projects/</code>, add <code>info.txt</code>, then rebuild.
                </div>
                <button id="rebuild-site-btn" style="background:#fff; color:#000; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-size: 12px; font-weight:bold; transition: 0.2s;">Rebuild Content ↻</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', adminHtml);
        
        document.getElementById('rebuild-site-btn').addEventListener('click', async (e) => {
            const btn = e.target;
            const originalText = btn.innerText;
            btn.innerText = 'Rebuilding... ⏳';
            btn.style.opacity = '0.7';
            try {
                const res = await fetch('/api/build', { method: 'POST' });
                if (res.ok) {
                    btn.style.background = '#4CAF50';
                    btn.style.color = '#fff';
                    btn.innerText = 'Success! Reloading...';
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    btn.style.background = '#f44336';
                    btn.innerText = 'Error Rebuilding';
                }
            } catch(err) {
                btn.style.background = '#f44336';
                btn.innerText = 'Network Error';
            }
            setTimeout(() => {
                btn.style.background = '#fff';
                btn.style.color = '#000';
                btn.style.opacity = '1';
                btn.innerText = originalText;
            }, 3000);
        });
    }
});
