const toScroll = document.querySelector(".toScroll");
const scrolled = document.querySelector(".scrolled");
console.log(toScroll);
console.log(scrolled);
toScroll.addEventListener("click", () => {
    // if (window.innerWidth <)
    scrolled.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
})

const right = document.querySelectorAll(".u-right");
window.addEventListener('resize', function () {
    if (window.innerWidth < 757) {
        console.log(window.innerWidth);
        right[0].classList.add('invisible');
        right[1].classList.remove('invisible');
    }
    else {
        right[0].classList.remove('invisible');
        right[1].classList.add('invisible');
    }
})

