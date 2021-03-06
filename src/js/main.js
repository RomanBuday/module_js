//import './_vendor';
//import vars from './_vars';
//import './_functions';
import {items} from "./_components";
import './_components';

document.addEventListener('DOMContentLoaded', function () {
  const store = document.querySelector('.goods-items');

  const arr = [];
  // const getUrl = 'js/components/items.js';

  async function getTabs(url, fn) {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    data.forEach((el, index) => {
        generateTabs(
            data[index].id,
            data[index].imgUrl,
            data[index].name,
            data[index].orderInfo.inStock,
            data[index].price,
            data[index].orderInfo.reviews,
            data[index].orderInfo.orders);
        });
    fn();
  }

  // for (const index of items) {
  //   generateTabs (
  //     index.id,
  //     index.imgUrl,
  //     index.name,
  //     index.orderInfo.inStock,
  //     index.price,
  //     index.orderInfo.reviews,
  //     index.orderInfo.orders,
  //   );
  // }

  getTabs(items, selectId);

  function createTab(data) {
    return `
      <div class="goods-items">
        <div class="goods-items-top">
          <img class="goods-items-top_like" loading="lazy" src="img/svg/icons/like_empty.svg" alt="">
          <img class="goods-items-top_img" loading="lazy" src="${data.imgUrl}" alt="">
          <h2 class="goods-items-top_title title title_fz24">${data.name}</h2>
          <span class="goods-items-top_status title_fz14">
            <img class="goods-items-top_status__img" loading="lazy" src="img/svg/icons/check.svg" alt="">
            <span class="goods-items-top_status__quantity">${data.inStock}</span>left in stock
          </span>
          <span class="goods-items-top_price title_fz14">Price:
            <span class="goods-items-top_price__sum">${data.price}</span>$
          </span>
          <button class="btn goods-items-top_btn">Add to cart</button>
        </div>

        <div class="goods-items-bottom">
          <img class="goods-items-bottom_filledlike" loading="lazy" src="img/svg/icons/like_filled_red.svg" alt="">
          <span class="goods-items-bottom_reviews title_fz14">
            <span class="goods-items-bottom_reviews__percent">${data.reviews}</span>Positive reviews <br> Above avarage
          </span>
          <span class="goods-items-bottom_order title_fz14">
            <span class="goods-items-bottom_order__quantity">${data.orders}</span>orders
          </span>
        </div>
      </div>`;
  }

  function generateTabs(id, imgUrl, name, inStock, price, reviews) {
    store.insertAdjacentHTML('beforeend', createTab(id, imgUrl, name, inStock, price, reviews));
  }

  function selectId() {
    document.querySelectorAll('.goods-items-top_btn').forEach(el => {
        el.addEventListener('click', () => {
        console.log(el.parentElement.id);
        addStorage(el.parentElement.id);
        });
    });
  }

  function addStorage(id) {
    arr.push(id);
    localStorage.setItem('ID', arr);
    getStorageData();
  }

  function getStorageData() {
    if(localStorage.getItem('ID')) {
        document.querySelector('.card__title span').textContent = localStorage.getItem('ID');
    } else {
        document.querySelector('.card__title span').textContent = 0;
    }
    clearStorage();
  }

  getStorageData();

  function clearStorage() {
    document.querySelector('.card__clear').addEventListener('click', () => {
        localStorage.removeItem('ID');
        getStorageData();
    });
  }
});
