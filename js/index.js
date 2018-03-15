const images = [
  {
      src: "img/afro-soul.jpg", 
      id: 1,
      title: "Afro Soul Voyage",
      date: "2017-07-21",
      category: ["music", "art", "typography"],
  },
  {
      src: "img/butterfly.jpg", 
      id: 2,
      title: "Butterfly",
      date: "2017-07-14",
      category: ["geometry", "nature"],
  },
  {
      src: "img/pistol.jpg", 
      id: 3,
      title: "Pistol",
      date: "2017-06-19",
      category: ["pop-art"],
  },
  {
      src: "img/electric.jpg", 
      id: 4,
      title: "Electric",
      date: "2017-06-14",
      category: ["photo", "typography"],
  },
  {
      src: "img/eye.jpg", 
      id: 5,
      title: "Eye",
      date: "2017-05-21",
      category: ["typography", "psychedelia"],
  },
  {
      src: "img/lovehearts.jpg", 
      id: 6,
      title: "Lovehearts",
      date: "2017-05-24",
      category: ["psychedelia", "pop-art"],
  },
  {
      src: "img/deadhead.jpg", 
      id: 7,
      title: "Deadhead",
      date: "2017-08-11",
      category: ["pop-art", "tattooing"],
  },
  {
      src: "img/singer.jpg", 
      id: 8,
      title: "Singer",
      date: "2017-09-21",
      category: ["music", "art"],
  },
  {
      src: "img/smoke.jpg", 
      id: 9,
      title: "Smoke",
      date: "2017-09-14",
      category: ["music", "art"],
  },
  {
      src: "img/codeseventeen.jpg", 
      id: 10,
      title: "Code 17",
      date: "2017-07-16",
      category: ["photo", "typography"],
  },
  {
      src: "img/angelheart.jpg", 
      id: 11,
      title: "Angelheart",
      date: "2017-08-17",
      category: ["pop-art", "psychedelia"],
  },
  {
      src: "img/shadows.jpg", 
      id: 12,
      title: "Shadows",
      date: "2017-07-28",
      category: ["photo", "typography"],
  },
];

const toolbar = document.querySelector('.toolbar');
const main = document.querySelector('main');
const menu = document.querySelector('.nav');
const thumbNails = document.querySelector('.thumbnails');

function createThumbs(source) {
  const thumbs = source.map(image => {
    return `
      <li>
        <a href="#">
          <div style="background-image: url(${image.src})" class="image-thumbnail">
            <img src="${image.src}" id="${image.id}" hidden>
          </div>
            <h2>${image.title}</h2>
        </a>
      </li>
    `;
  }).join('');
  thumbNails.innerHTML = thumbs;
  
  const links = document.querySelectorAll('.thumbnails a');

  //Clicking a thumbnail link reveals the poster version and hides the menu
  links.forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const imageSrc = this.querySelector('img').getAttribute('src');    
      menu.classList.add('toggled');
      displayImage(imageSrc);       
    }
  });
}

createThumbs(images);


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


//Order by date
//Newest First
function newestFirst() {
  const newest = images.sort((a, b) => a.date > b.date ? 1 : -1)
  createThumbs(images);
}

toolbar.querySelector('.btn--newest').addEventListener('click', function(){
  newestFirst()
});

//Oldest first
function oldestFirst() {
  const oldest = images.sort((a, b) => a.date > b.date ? -1 : 1)
  createThumbs(images);
}

toolbar.querySelector('.btn--oldest').addEventListener('click', function(){
  oldestFirst()
});

//Create filterBtns
function createFilterButtons() {
  const categories = images.map(image => image.category);
  const catsArray = [].concat.apply([], categories);
  const individualCats = Array.from(new Set(catsArray));
  const catButtons = individualCats.map(catButton => {
    return `
      <li>
        <button type="button" name="button" class="btn" data-filter="${catButton}">${catButton}</button>
      </li>
    `;
  }).join('');
  document.querySelector('.filters').innerHTML = catButtons;
}

createFilterButtons()

//Filter based on category
function filterCategory() {
  const keyword = this.dataset['filter'];
  const categories = images.filter(image => image.category.includes(keyword));
  createThumbs(categories);
}

const filterBtns = Array.from(toolbar.querySelectorAll('.btn[data-filter]'));

filterBtns.forEach(filterBtn => {
  filterBtn.addEventListener('click', filterCategory)
})

//Reset
document.querySelector('.btn--reset').addEventListener('click', function() {
  createThumbs(images);
});