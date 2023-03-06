window.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.left-arrow').addEventListener('click', function(event) {
        document.querySelector('.timeline-entries').scrollLeft -= 240;
        document.querySelector('.right-arrow').style.display = "block";
        let timelineEntries = document.querySelector('.timeline-entries');
        if(timelineEntries.scrollLeft - 240 <= 0) {
            document.querySelector('.left-arrow').style.display = "none";
        }
        event.preventDefault();
    });
    document.querySelector('.right-arrow').addEventListener('click', function(event) {
        document.querySelector('.timeline-entries').scrollLeft += 240;
        document.querySelector('.left-arrow').style.display = "block";
        let timelineEntries = document.querySelector('.timeline-entries');
        if(timelineEntries.scrollLeft + timelineEntries.offsetWidth + 240 >= timelineEntries.scrollWidth) {
            document.querySelector('.right-arrow').style.display = "none";
        }
        event.preventDefault();
    });
});