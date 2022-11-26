'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputContry = document.querySelector('.contryName');
const search = document.querySelector('form');

///////////////////////////////////////
const renderData = function (data, classname = ``) {
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

// const getneibors = function (country3) {
//   const requestNei = new XMLHttpRequest();
//   requestNei.open('GET', `https://restcountries.com/v2/alpha/${country3}`);
//   requestNei.send();

//   //
//   requestNei.addEventListener('load', function () {
//     const neiData = JSON.parse(requestNei.responseText);
//     renderData(neiData, 'neighbour');
//   });
// };
// const getContryDataWithNeibor = function (country) {
//   const request = new XMLHttpRequest();
//   //creating connection
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   //requesting data
//   request.send();
//   //waiting for data

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderData(data);

//     //requesting for neibhor country

//     //this is call back hell
//     if (!data.borders) return;

//     data.borders.forEach(c => getneibors(c));
//   });
// };

const getContryDataWithNeibor = function (country2) {
  fetch(`https://restcountries.com/v2/name/${country2}`)
    .then(e => {
      if (!e.ok) throw new Error('country not found');
      return e.json();
    })
    .then(e => {
      const [data] = e;
      renderData(data);

      ////// loading border contries

      if (!data.borders) return;

      data.borders.forEach(nei => {
        fetch(`https://restcountries.com/v2/alpha/${nei}`)
          .then(e => {
            if (!e.ok) throw new Error('Invalid country');
            return e.json();
          })
          .then(e => renderData(e));
      });
    })
    .catch(err => console.log(`${err.message}`));
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

// promisefying jio location Api which is an asyc

const currlocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      e => resolve(e),
      () => reject(new Error('user denide acces'))
    );
  });
};
currlocation()
  .then(e => console.log(e))
  .catch(err => console.log(err));

//challenge 2
//wait

// let b;
// const imgPromise = function (src) {
//   return new Promise((resolve, reject) => {
//     resolve(src);
//     reject(new Error('img not sound'));
//   });
// };

// imgPromise(`img/img-1.jpg`)
//   .then(e => {
//     const html = `<img src="${e}" >`;
//     b = document.querySelector('.images');
//     b.insertAdjacentHTML('afterbegin', html);
//     return wait(2);
//   })
//   .then(e => (b.style.display = 'none'))
//   .catch(err => console.log(err));

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgPromise = function (url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const imgContainer = document.querySelector('.images');

    img.src = url;

    img.addEventListener('load', () => {
      imgContainer.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Invalid Path'));
    });
  });
};

const repromise = async function (url, url2) {
  try {
    //first img
    let img = await imgPromise(url);
    await wait(2);
    img.style.display = 'none';

    //second img
    img = await imgPromise(url2);
    img.style.display = 'none';
    await wait(2);
  } catch (err) {
    console.error(err);
  }
};

repromise('img/img-1.jpg', 'img/img-1.jpg');



async function loadAll(imgArr){
  imgArr.map((img)=>)
}