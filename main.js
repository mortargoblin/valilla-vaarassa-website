// main.js

const navbar = document.querySelector('#navbar');
const page = document.querySelector('#page')

let loaded = false;

loadPageContent('./home.html');

navbar.addEventListener('click', function(evt) {
  let target = evt.target.id;
  loadPageContent(target + ".html");
});


function loadPageContent(content) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', content, true);
  xhr.onreadystatechange= function() {
    if (this.readyState === 4 && this.status === 200) {
      page.innerHTML = this.responseText;
      // specify wonkiness for different pages
      if (content == 'artistsmap.html') {
        wonkify(35);
      } else {
        wonkify();
      }
    }
  };
  xhr.send();
  wonkify();
}

// wonkify
function wonkify(ammount = 10) {
  const wonkies = document.querySelectorAll('.wonky');
  wonkies.forEach(function(box) {
    deg = Math.floor(Math.random() * ammount) - ammount / 2;
    box.style.transform = 'rotate('+ deg +'deg)';
  });
}

