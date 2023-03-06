window.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.navigation .activator').addEventListener('click', () => {
        document.querySelector('body').style.position = "fixed";
        document.querySelector('.navigation-container').style.display = "block";
    });

    document.querySelector('.navigation-container .close-navigation').addEventListener('click', () => {
        document.querySelector('body').style.position = "static";
        document.querySelector('.navigation-container').style.display = "none";
    });

    let readMores = document.querySelectorAll('.read-more');

    readMores.forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.style.display = "none";
            let special = event.target.dataset.special
            if(special === undefined) {
                event.target.nextElementSibling.style.display = "block";
            } else {
                let specials = document.querySelectorAll('.read-more-hidden[data-special="' + special + '"]');
                console.log(specials);
                specials.forEach(el => {
                    el.style.display = "block";
                });
            }
        });
    });
});