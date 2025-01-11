
document.addEventListener('DOMContentLoaded', function () {
    const faders = document.querySelectorAll('.fadeInUp');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
