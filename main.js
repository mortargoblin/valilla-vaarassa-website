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
      //if (this.readyState!==4) return;
      //if (this.status!==200) return; 
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



for (let i = 0; i < 50; i++) {
  console.log(document.readyState);
}

wonkify();
