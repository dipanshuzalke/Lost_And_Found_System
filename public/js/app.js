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


