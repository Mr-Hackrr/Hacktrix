// document.addEventListener('DOMContentLoaded', () => {
//     // Scroll smoothly to sections
//     document.querySelectorAll('.nav-link').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth'
//             });
//         });
//     });
// });



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
