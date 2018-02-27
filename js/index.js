const images = [
  {
      "src": "img/afro-soul.jpg", 
      "id": 1,
      "title": "Afro Soul Voyage",
  },
  {
      "src": "img/butterfly.jpg", 
      "id": 2,
      "title": "Butterfly",
  },
  {
      "src": "img/pistol.jpg", 
      "id": 3,
      "title": "Pistol",
  },
  {
      "src": "img/electric.jpg", 
      "id": 4,
      "title": "Electric",
  },
  {
      "src": "img/eye.jpg", 
      "id": 5,
      "title": "Eye",
  },
  {
      "src": "img/lovehearts.jpg", 
      "id": 6,
      "title": "Lovehearts",
  },
  {
      "src": "img/deadhead.jpg", 
      "id": 7,
      "title": "Deadhead",
  },
  {
      "src": "img/singer.jpg", 
      "id": 8,
      "title": "Singer",
  },
  {
      "src": "img/smoke.jpg", 
      "id": 9,
      "title": "Smoke",
  },
  {
      "src": "img/codeseventeen.jpg", 
      "id": 10,
      "title": "Code 17",
  },
  {
      "src": "img/angelheart.jpg", 
      "id": 11,
      "title": "Angelheart",
  },
  {
      "src": "img/shadows.jpg", 
      "id": 12,
      "title": "Shadows",
  },
];

const thumbNails = document.querySelector('nav ul');

function createThumbs() {
  const thumbs = images.map(image => {
    return `
      <li>
        <a href="#" >
          <div style="background-image: url(${image.src})" class="image-thumbnail">
            <img src="${image.src}" id="${image.id}" hidden>
          </div>
            <h2>${image.title}</h2>
        </a>
      </li>
    `;
  }).join('');
  thumbNails.innerHTML = thumbs;
}

createThumbs();


function displayImage(imageSrc) {
  
  const html = `
    <div style="background-image: url(${imageSrc})" class="image-container">
    </div>
    <a href="#" class="close">x</a>
  `;
  
  //Render img and closeBtn
  main.innerHTML = html;
  
  //Fade in img
  const image = main.querySelector('.image-container');
  menu.addEventListener('transitionend', function(){
    image.classList.add('fade-in');
  }); 
  
  //Remove img and restore menu
  function removeImage() {
    image.classList.remove('fade-in');
    image.addEventListener('transitionend', function(){
      menu.classList.remove('toggled');
      this.remove();
    });
  }
  
  //Click closeBtn to initiate removeImage function and remove closeBtn
  const closeBtn = main.querySelector('.close');
  closeBtn.addEventListener('click', function(e){
    e.preventDefault();
    this.remove();
    removeImage();
  });
}

const main = document.querySelector('main');
const menu = document.querySelector('nav');
const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.onclick = function(e) {
    e.preventDefault();
    const imageSrc = this.querySelector('img').getAttribute('src');    
    menu.classList.add('toggled');
    displayImage(imageSrc);       
  }
});