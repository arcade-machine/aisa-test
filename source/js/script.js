var headline = document.querySelector(".headline");
var openButton = headline.querySelector(".headline__button");

openButton.addEventListener("click", function () {
    if (headline.classList.contains("headline--open")) {
        headline.classList.remove("headline--open")
    } else {
        headline.classList.add("headline--open")
    }
});