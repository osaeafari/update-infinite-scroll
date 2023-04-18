// Unsplash API
const count = 10;
const apikey = 'QZx9dNNSEPA59aPu2Vpz-crOy3fRyDEZOu7XILZ4V5A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// get photos from unsplash API
async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error){
    //catch Error Here
  }
}

//On load 
getPhotos();