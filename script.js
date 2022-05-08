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
  countriesContainer.style.opacity = 1;
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

///////////////////////////////////////
// Modern Way for AJAX
// Promises do not get rid of callbacks but does get rid of callback hell
// Flat chain or promises
const getCountryData = (country) => {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((resp) => resp.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((resp) => resp.json())
    .then((data) => {
      renderCountry(data, "neighbour");
    });
};

getCountryData("korea (republic of)", "neighbour");
