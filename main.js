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
        loadPageContent('header.html', header);
        headerLoaded = true;
      } 
      if (content === 'artists.html') {
        loadArtists();
      } else if (content === 'about.html') {
        loadAbout();
      }
      wonkify();
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
    { fname: 'Vastiala', lname: '/ Ylipieti' },
    { fname: 'Totti', lname: 'Korpua' },
    { fname: 'Suthasinee', lname: 'Naktnasukajn' }, 
    { fname: 'Sini', lname: 'Vihma' }, 
    { fname: 'Pia', lname: 'Euro' }, 
    { fname: 'Müge', lname: 'Yildiz' }, 
    { fname: 'Minna', lname: 'Suoniemi' }, 
    { fname: 'Markku', lname: 'Laskuj&#228;rvi' }, 
    { fname: 'Mari', lname: 'Nurmenniemi' }, 
    { fname: ['Lù', 'Vera'], lname: ['Chén', 'Rantamaa'] }, 
    { fname: 'Lily', lname: 'Díaz-Kommonen' }, 
    { fname: ['Laura', 'Jurgis'], lname: ['Beloff', 'Peters'] }, 
    { fname: ['Jonna', 'Zina', 'Mikael'], lname: ['Eloranta', 'Marpegan', 'Malin'] }, 
    { fname: 'Joel', lname: 'Rännäri' }, 
    { fname: 'Heya', lname: 'Kwon' }, 
    { fname: 'Henrik', lname: 'Frondelius' }, 
    { fname: 'Harri', lname: 'Laakso' }, 
    { fname: 'Gabriella', lname: 'Presnal' }, 
    { fname: 'Euro&', lname: 'Kiiveri' }, 
    { fname: 'Denise', lname: 'Ziegler' }, 
    { fname: 'Daniel', lname: 'Palpa' }, 
    { fname: 'Cynthia', lname: 'Blanchette' }, 
    { fname: 'Ricardo', lname: 'Atienza' },
  ];
  artists.forEach(function(artist) {
    if (!Array.isArray(artist.fname)) {
      artistGrid.innerHTML += 
        `<div id="artist_${artist.fname}" class="wonky">
          ${artist.fname} <br />
          ${artist.lname} 
        </div>` 
    } else {
      let artist_collective = '';
      for (let i = 0; i < artist.fname.length; i++) {
        artist_collective += `${artist.fname[i]} ${artist.lname[i]} <br />`
      }
      artistGrid.innerHTML += 
        `<div id="artist_${artist.fname[0]}" class="wonky">
         ` + artist_collective + `
        </div>`;
    }
  });
  artistGrid.addEventListener('click', function(evt) {
    let artist;
    if (evt.target.id.startsWith('artist')) {
      artist = evt.target.id.slice(7).toLowerCase();
      page.innerHTML = 
        `<div style="padding: 20px; max-width: 850px; margin: auto;">
          <img src="artists/${artist}.JPG" alt="artist work">
          <div class="packed" id="artist-text"> </div>
        </div>`;
      loadPageContent(('artists/' + artist + '.html'), document.querySelector('#artist-text'));
    }
  });
}
function loadAbout() {
  const picture_count = 37;
  document.querySelector('#about_images').innerHTML = '';
  for (let i = 0; i < picture_count; i++) {
    document.querySelector('#about_images').innerHTML += `<img src="./img/about/small_about_${i+1}.JPG" alt="about picture ${i+1}">`;
  } 
}
