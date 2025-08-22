// main.js

const navbar = document.querySelector('#navbar');
const page = document.querySelector('#page')
const header = document.querySelector('#header')

let headerLoaded = false;

loadPageContent('home.html');

navbar.addEventListener('click', function(evt) {
  let target = evt.target.id;
  if (target !== 'navbar') {
    loadPageContent(target + ".html");
  }
});

function loadPageContent( content, target=page ) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', content, true);
  xhr.onreadystatechange= function() {
    if (this.readyState === 4 && this.status === 200) {
      target.innerHTML = this.responseText;
      // conditionally load header
      if (content === 'home.html') {
        header.innerHTML = '';
        headerLoaded = false;
      } else if (!headerLoaded) {
        console.log('loading header');
        loadPageContent('header.html', header);
        headerLoaded = true;
      }
      // specify wonkyness for pages
      if (content === 'artists.html') {
        wonkify(35);
      } else {
        wonkify();
      }

    }
  };
  xhr.send();
  wonkify();
}

function wonkify(ammount = 10) {
  const wonkies = document.querySelectorAll('.wonky');
  wonkies.forEach(function(box) {
    deg = Math.floor(Math.random() * ammount) - ammount / 2;
    box.style.transform = 'rotate('+ deg +'deg)';
  });
}

