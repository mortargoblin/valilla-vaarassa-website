// main.js

const navbar = document.querySelector('#navbar');
const page = document.querySelector('#page')

loadPageContent('./home.html');

navbar.addEventListener('click', function(evt) {
  console.log(evt);
  let target = evt.target.id;
  loadPageContent(target + ".html");
  wonkify();
});


function loadPageContent(content) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', content, true);
  xhr.onreadystatechange= function() {
    page.innerHTML= this.responseText;
  };
  xhr.send();
}

// wonkify
function wonkify(ammount = -10) {
  const wonkies = document.querySelectorAll('.wonky-textbox');
  let deg;
  wonkies.forEach(function(box) {
    deg = Math.floor(Math.random() * ammount);
    box.style.transform = 'rotate('+ deg +'deg)';
    console.log(deg, box);
  });
}



// once document fully loaded
document.addEventListener('readystatechange', function(evt) {
  if(document.readyState === "complete"){
    console.log(document.readyState);
    wonkify();
  }
});

