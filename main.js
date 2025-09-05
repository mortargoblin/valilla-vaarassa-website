// main.js

const navbar = document.querySelector('#navbar');
const page = document.querySelector('#page');
const header = document.querySelector('#header');

let artistGrid;
let headerLoaded;

loadPageContent('home.html');

navbar.addEventListener('click', function(evt) {
  let target = evt.target.id;
  if (target !== 'navbar') {
    loadPageContent(target + ".html");
  }
});

function loadPageContent(content, target=page) {
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

      if (content === 'artists.html') {
        loadArtists();
        wonkify(40);
      } else {
        wonkify();
      }

    }
  };
  xhr.send();
}

function wonkify(amount = 10) {
  const wonkies = document.querySelectorAll('.wonky');
  wonkies.forEach(function(box) {
    deg = Math.floor(Math.random() * amount) - amount / 2;
    box.style.transform = 'rotate('+ deg +'deg)';
  });
}

function loadArtists() {
  artistGrid = document.querySelector('#artist-grid');
  artistGrid.innerHTML = '';
  const artists = [
    { fname: 'Zina', lname: 'Marpegan' },
    { fname: 'Vertti', lname: 'Luostarinen' }, 
    { fname: 'Vastiala', lname: '- Ylipieti' },
    { fname: 'Suthasinee', lname: 'Naktnasukajn' }, 
    { fname: 'Müge', lname: 'YILDIZ' }, 
    { fname: 'Minne', lname: 'Suoniemi' }, 
    { fname: 'Markku', lname: 'Laskuj&#228;rvi' }, 
    { fname: 'Mari', lname: 'Nurmenniemi' }, 
    { fname: ['Lù', 'Vera'], lname: ['Chén', 'Rantamaa'] }, 
    { fname: ['Laura', 'Jurgis'], lname: ['Beloff', 'Peters'] }, 
    { fname: ['Jonna', 'Zina'], lname: ['Eloranta', 'Marpegan'] }, 
    { fname: 'Joel', lname: 'Rännäri' }, 
    { fname: 'Henrik', lname: 'Frondelius' }, 
    { fname: 'Harri', lname: 'Laakso' }, 
    { fname: 'Gabriella', lname: 'Presnal' }, 
    { fname: 'Daniel', lname: 'Palpa' }, 
    { fname: 'Cynthia', lname: 'Blanchette' }, 
  ]
  artists.forEach(function(artist) {
    //console.log(artist.name);
    console.log(artist.fname, Array.isArray(artist.fname));
    if (!Array.isArray(artist.fname)) {
      artistGrid.innerHTML += 
        `<div id="artist_${artist.fname}" class="wonky">
          <div> ${artist.fname} </div>
          <div> ${artist.lname} </div>
        </div>` 
    } else {
      artistGrid.innerHTML += 
        `<div id="artist_${artist.fname[0]}" class="wonky">
          <div> ${artist.fname[0]} ${artist.lname[0]}</div>
          <div> ${artist.fname[1]} ${artist.lname[1]}</div>
        </div>` 
    }
  });
}
