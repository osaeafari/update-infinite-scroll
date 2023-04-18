const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];

// Unsplash API
const initialCount = 5;
const apikey = 'your API key';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${picCount}`;
}

//check if all images were loaded
function imageloaded(){
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set Attribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for lins and Photos, Add to Dom
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finsihed loading 
    img.addEventListener('load', imageloaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


// get photos from unsplash API
async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if(isInitialLoad){
      updateAPIURLWithNewCount(30) 
      isInitialLoad = false
    }
  } catch (error){
    //catch Error Here
  }
}

// check to see if scrolling is near page buttom so we load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= 
      document.body.offsetHeight - 1000 && ready) {
    getPhotos();
  }
});

//On load 
getPhotos();