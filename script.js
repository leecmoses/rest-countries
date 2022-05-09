"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = (data, className) => {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
    </article>
`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const renderError = (msg) => {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

// const getCountryData = (country) => {
//   const apiUrl = `https://restcountries.com/v2/name/${country}`;
//   ///////////////////////////////////////
//   // Old school way of making AJAX call
//   const request = new XMLHttpRequest();
//   request.open("GET", apiUrl);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//   });
// };

// getCountryData("korea (republic of)");
// getCountryData("usa");
// getCountryData("dominican republic");

const getJSON = (url, errMsg = "Something went wrong") => {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw new Error(`${errMsg}: ${resp.status}`);
    }
    return resp.json();
  });
};

///////////////////////////////////////
// Modern Way for AJAX
// Promises do not get rid of callbacks but does get rid of callback hell
// Flat chain or promises
// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((resp) => {
//       console.log(resp);

//       if (!resp.ok) {
//         throw new Error(`Country not found ${resp.status}`);
//       }
//       return resp.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((resp) => resp.json())
//     .then((data) => {
//       renderCountry(data, "neighbour");
//     })
//     .catch((err) => {
//       console.error(`${err}`);
//       renderError(`Something went wrong: ${err.message}.`);
//     })
//     .finally(() => {
//       // Not always useful but will be called no matter the result of the promise
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("korea (republic of)", "neighbour");
// });

///////////////////////////////////////
// Modern Way for AJAX using the getJSON function
const getCountryData = (country) => {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then((data) => {
      renderCountry(data, "neighbour");
    })
    .catch((err) => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}.`);
    })
    .finally(() => {
      // Not always useful but will be called no matter the result of the promise
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("korea (republic of)", "neighbour");
});
