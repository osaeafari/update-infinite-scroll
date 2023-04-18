const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apikey = 'QZx9dNNSEPA59aPu2Vpz-crOy3fRyDEZOu7XILZ4V5A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// Helper function to set Attribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for lins and Photos, Add to Dom
function displayPhotos(){
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
  } catch (error){
    //catch Error Here
  }
}

//On load 
getPhotos();