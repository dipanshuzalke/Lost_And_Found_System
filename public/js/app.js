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


