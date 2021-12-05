const images = document.querySelectorAll('.u-similar-container');
const images_text = document.querySelectorAll('.u-similar-container>.u-text');
// console.log(images);
// console.log(images_text);

// console.log(images[2].querySelector(".u-text").classList.toggle('profession-text'));

// console.log(images[2].querySelector(".u-text").classList.toggle('profession-text'));

images.forEach((image) => {
    image.addEventListener('mouseenter', () => {
        image.querySelector(".u-text").classList.toggle('profession-text');
    })
    image.addEventListener('mouseleave', () => {
        image.querySelector(".u-text").classList.toggle('profession-text');
    })
})


const items = document.querySelectorAll(".u-repeater-item");
items.forEach((item) => {
    item.style.backgroundImage = `url(${item.dataset.image})`
    item.style.backgroundPosition = "50% 32.28%";
    item.addEventListener('mouseenter', function () {
        a = item.querySelectorAll('.profession');
        a[0].classList.add('blacroundfull');
    })
    item.addEventListener('mouseleave', function () {
        a = item.querySelectorAll('.profession');
        a[0].classList.remove('blacroundfull');
    })
})

