const image = document.getElementById("sec-746c");
image.style.backgroundImage = `url(${image.dataset.image})`

const plus = document.getElementsByClassName('addImage')[0];
const form = document.getElementsByClassName('form1')[0];
plus.addEventListener('click', ()=>{
    form.classList.toggle('unvisible');
    plus.classList.toggle('unvisible');
})

const submit = document.getElementById("submit");
submit.addEventListener('click', ()=>{
    form.classList.toggle('unvisible');
})