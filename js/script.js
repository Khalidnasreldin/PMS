const menuBtn = document.querySelector("#menuBtn");
menuBtn.addEventListener("click", function() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("show");
})