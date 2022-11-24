'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputContry = document.querySelector('.contryName');
const search = document.querySelector('form');

///////////////////////////////////////
const renderData = function (data, classname = ``) {
  console.log(data);
  const html = `
      <article class="country ${classname}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000
            ).toFixed(1)}K people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

const getneibors = function (country3) {
  const requestNei = new XMLHttpRequest();
  requestNei.open('GET', `https://restcountries.com/v2/alpha/${country3}`);
  requestNei.send();

  //
  requestNei.addEventListener('load', function () {
    const neiData = JSON.parse(requestNei.responseText);
    renderData(neiData, 'neighbour');
  });
};
const getContryDataWithNeibor = function (country) {
  const request = new XMLHttpRequest();
  //creating connection
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  //requesting data
  request.send();
  //waiting for data

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderData(data);

    //requesting for neibhor country

    //this is call back hell
    if (!data.borders) return;

    data.borders.forEach(c => getneibors(c));
  });
};
const removeprevious = function () {
  countriesContainer.innerHTML = '';
};
search.addEventListener('submit', function (e) {
  e.preventDefault();
  removeprevious();
  const country2 = inputContry.value;

  getContryDataWithNeibor(country2);
});
