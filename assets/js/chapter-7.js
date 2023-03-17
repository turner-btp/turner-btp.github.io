let matches = [];
let searchMatches;
let noSearchMatches;
window.addEventListener("DOMContentLoaded", function() {
    let filters = document.querySelectorAll(".donor-filters button");
    filters.forEach(el => {
       el.addEventListener('click', function(event) {
           showLevel(event.target.dataset.filter);
           event.preventDefault();
       });
    });

    document.querySelector(".donor-search-input").addEventListener('keyup', function(event) {
        search(event);
    });

    searchMatches = document.querySelector(".donor-search-matches")
    noSearchMatches = document.querySelector(".donor-search-matches .none")

    document.querySelector('.left-scroll').addEventListener('click', function (event) {
        let filter = document.querySelector('button.selected').dataset.filter;
        document.querySelector('.donor-list.a' + filter).scrollLeft -= 100;
        event.preventDefault();
    })
    document.querySelector('.right-scroll').addEventListener('click', function (event) {
        let filter = document.querySelector('button.selected').dataset.filter;
        document.querySelector('.donor-list.a' + filter).scrollLeft += 100;
        event.preventDefault();
    })
}, false);



function showLevel(className) {
    let donorLists = document.querySelectorAll(".donor-list-container ul");
    donorLists.forEach(el => {
       el.style.display = "none";
    });
    document.querySelector(`.donor-list-container ul.a${className}`).style.display = "grid";

    let donorHeadings = document.querySelectorAll(".donor-list-container h3");
    donorHeadings.forEach(el => {
        el.style.display = "none";
    });
    document.querySelector(`.donor-list-container h3.a${className}`).style.display = "block";

    let filters = document.querySelectorAll(".donor-filters button");
    filters.forEach(el => {
        el.classList.remove("selected");
    });
    document.querySelector(`.donor-filters button.a${className}`).classList.add("selected");
}

function search(event) {
    let searchTerm = event.target.value;
    if(searchTerm.length > 2) {
        matches = [];
        searchMatches.replaceChildren([]);
        let xpath = `//div[@class='donor-list-container white-bg']//ul//li[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'${searchTerm.toLowerCase()}')]`;
        let matchingElements = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
        while(element = matchingElements.iterateNext()) {
            matches.push(element);
        }
        searchMatches.style.display = "block"
        if(matches.length > 0) {
            noSearchMatches.style.display = "none"
            matches.forEach((el, i) => {
                el.className = "";
                el.classList.add(`a${i}`);
                searchMatches.appendChild(el.cloneNode(true));
            });
        }
        searchMatches.querySelectorAll('li').forEach(el => {
            el.addEventListener('click', function(event) {
                selectMatch(event.target)
            });
        });
    }
}

function selectMatch(item) {
    let matchClass = item.className;
    let index = matchClass.slice(1);
    let listClass = matches[index].parentElement.dataset.filter;
    showLevel(listClass);
    document.querySelectorAll('.donor-list-container ul li').forEach((el, i) => {
        el.style.backgroundColor = "transparent";
    });
    matches[index].style.backgroundColor = "#9DD1FF";
    matches[index].scrollIntoView({ behavior: 'smooth' });
    searchMatches.style.display = "none";
}