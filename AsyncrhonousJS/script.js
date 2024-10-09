const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const countries = ["portugal", "bulgaria", "france", "germany", "usa"];

const renderCountry = function (data, className) {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const displayCountry = function (countryName) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`
  )
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0]; // Check if borders exist and grab the first one

      if (!neighbour) throw new Error("No neighbour found");

      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => renderError(`Something went wrong! ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Challenge 1
const requestOptions = {
  method: "GET",
};
const key = "";
function getCoordinates(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        callback(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// When the button is clicked, get the coordinates and make the API call
btn.addEventListener("click", function () {
  getCoordinates((latitude, longitude) => {
    const inputText = `${latitude},${longitude}`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${inputText}&apiKey=${key}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const countryName = result.features[0].properties.country;
        displayCountry(countryName);
      }) // Handle the result here
      .catch((error) => console.log("error", error));
  });
});

// Challenge 2
// Function to create and load an image
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    // Handle image load event
    img.addEventListener("load", function () {
      document.querySelector(".images").appendChild(img);
      resolve(img);
    });

    // Handle error event
    img.addEventListener("error", function () {
      reject(new Error("Image failed to load"));
    });
  });
};

// Wait function
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const images = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];
let currentImage; // Global variable to track the currently displayed image

// Consume the promise and handle the flow
const loadImages = async function () {
  try {
    for (const image of images) {
      // Load image
      currentImage = await createImage(image);
      console.log(`${image} loaded successfully`);

      // Wait for 2 seconds
      await wait(2);

      // Hide the current image
      currentImage.style.display = "none";
    }
  } catch (err) {
    console.error(err); // Handle any errors during image loading
  }
};

// Start loading images
loadImages();

// const displayCountry = function (countryName) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then((responce) => responce.json())
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => renderError(`Something went wrong ! ${err}`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// Old way of api requests
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//     `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// countries.forEach((country) => getCountryData(country));

// Callback Hell

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);

//     // Get Neighbour Country
//     const neighbour = data.borders?.[0];

//     if (neighbour === undefined) return;

//     const request2 = new XMLHttpRequest();
//     request2.open(
//       "GET",
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);

//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// getCountryAndNeighbour("usa");
