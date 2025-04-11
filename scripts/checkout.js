import {cart, removeFromCart,updateDeliveryOption } from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './ulits/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
      if(productId === product.id){
        matchingProduct = product;
      }
  });

  // save the cart's delivery id and using it
  const cartDeliveryId = cartItem.deliveryOptionId;
  
  // creating a delivery man (deliveryOption) to hold and execute the delivery(when and pricing) if the cart's delivery id matches the id of the delivery options  have here
  let deliveryOption;

  // looping through the delivery options to find the matching delivery id
  deliveryOptions.forEach((option) => {
      if(option.id === cartDeliveryId){
        deliveryOption = option;
      }
  });

  // using dayjs to get the delivery date and its format
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDay, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

const html = `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}>
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id= "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>`;

          

          cartSummaryHTML += html;   
});

  function deliveryOptionsHTML (matchingProduct,cartItem){
      let combineHTML = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDay, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


      const html = `<div class="delivery-option js-delivery-option" data-product-id= "${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-${matchingProduct.id}" ${isChecked ? 'checked' : ''} >
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} Shipping
                          </div>
                        </div>
                      </div>`;

                combineHTML += html;
    });
    return combineHTML;
  }

document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', () => {
    const {productId,deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
  });
});