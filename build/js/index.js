"use strict";function createThumbs(e){var t=e.map(function(e){return'\n      <li>\n        <a href="#">\n          <div style="background-image: url('+e.src+')" class="image-thumbnail">\n            <img src="'+e.src+'" id="'+e.id+'" hidden>\n          </div>\n            <h2>'+e.title+"</h2>\n        </a>\n      </li>\n    "}).join("");thumbNails.innerHTML=t,document.querySelectorAll("nav a").forEach(function(e){e.onclick=function(e){e.preventDefault();var t=this.querySelector("img").getAttribute("src");menu.classList.add("toggled"),displayImage(t)}})}function displayImage(e){function t(){i.classList.remove("fade-in"),i.addEventListener("transitionend",function(){menu.classList.remove("toggled"),this.remove()})}var r='\n    <div style="background-image: url('+e+')" class="image-container">\n    </div>\n    <a href="#" class="close">x</a>\n  ';main.innerHTML=r;var i=main.querySelector(".image-container");menu.addEventListener("transitionend",function(){i.classList.add("fade-in")}),main.querySelector(".close").addEventListener("click",function(e){e.preventDefault(),this.remove(),t()})}function newestFirst(){images.sort(function(e,t){return e.date>t.date?1:-1});createThumbs(images)}function oldestFirst(){images.sort(function(e,t){return e.date>t.date?-1:1});createThumbs(images)}function filterCategory(){var e=this.dataset.filter;createThumbs(images.filter(function(t){return t.category.includes(e)}))}var images=[{src:"img/afro-soul.jpg",id:1,title:"Afro Soul Voyage",date:"2017-07-21",category:["music","art","typography"]},{src:"img/butterfly.jpg",id:2,title:"Butterfly",date:"2017-07-14",category:["geometry","nature"]},{src:"img/pistol.jpg",id:3,title:"Pistol",date:"2017-06-19",category:["pop-art"]},{src:"img/electric.jpg",id:4,title:"Electric",date:"2017-06-14",category:["photo","typography"]},{src:"img/eye.jpg",id:5,title:"Eye",date:"2017-05-21",category:["typography","psychedelia"]},{src:"img/lovehearts.jpg",id:6,title:"Lovehearts",date:"2017-05-24",category:["psychedelia","pop-art"]},{src:"img/deadhead.jpg",id:7,title:"Deadhead",date:"2017-08-11",category:["pop-art","tattooing"]},{src:"img/singer.jpg",id:8,title:"Singer",date:"2017-09-21",category:["music","art"]},{src:"img/smoke.jpg",id:9,title:"Smoke",date:"2017-09-14",category:["music","art"]},{src:"img/codeseventeen.jpg",id:10,title:"Code 17",date:"2017-07-16",category:["photo","typography"]},{src:"img/angelheart.jpg",id:11,title:"Angelheart",date:"2017-08-17",category:["pop-art","psychedelia"]},{src:"img/shadows.jpg",id:12,title:"Shadows",date:"2017-07-28",category:["photo","typography"]}],thumbNails=document.querySelector("nav ul");createThumbs(images);var toolbar=document.querySelector(".toolbar"),main=document.querySelector("main"),menu=document.querySelector(".nav");toolbar.querySelector(".btn--newest").addEventListener("click",function(){newestFirst()}),toolbar.querySelector(".btn--oldest").addEventListener("click",function(){oldestFirst()});var filterBtns=Array.from(toolbar.querySelectorAll(".btn[data-filter]"));filterBtns.forEach(function(e){e.addEventListener("click",filterCategory)});