const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

// Rating 
const stars = document.querySelectorAll('.stars label');
const starInputs = document.querySelectorAll('.stars input[type="radio"]');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    starInputs[index].checked = true;
    stars.forEach((s, i) => {
      s.style.color = i <= index ? '#ff9c1a' : '#e6e6e6';
    });
  });
});

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => {
      s.style.color = i <= index ? '#ff9c1a' : '#e6e6e6';
    });
  });

  star.addEventListener('mouseout', () => {
    const checkedIndex = [...starInputs].findIndex(input => input.checked);
    stars.forEach((s, i) => {
      s.style.color = i <= checkedIndex ? '#ff9c1a' : '#e6e6e6';
    });
  });
});

//Signup 
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//landing page
gsap.from(".logo", { opacity: 0, duration: 1, delay: 2, y: 10 });
gsap.from(".btn-action", { opacity: 0, duration: 1, delay: 3.2, y: 10 });
gsap.from(".nav-item", {
  opacity: 0,
  duration: 1,
  delay: 1,
  y: 40,
  stagger: 0.3,
});

gsap.from(".hero-title", { opacity: 0, duration: 1, delay: 1.6, y: 30 });
gsap.from(".hero-desp", { opacity: 0, duration: 1, delay: 1.8, y: 30 });
gsap.from(".start-btn", { opacity: 0, duration: 1, delay: 2.1, y: 30 });
gsap.from(".watch-btn", { opacity: 0, duration: 1, delay: 2.2, y: 30 });
gsap.from(".her-detail", { opacity: 0, duration: 1, delay: 1.3, y: 30 });
gsap.from(".player", { opacity: 0, duration: 1, delay: 1.3, y: 30 });


