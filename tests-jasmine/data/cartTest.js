import {addToCart, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: AddToCart', () => {

  it('item already exits in cart',() => {

     //  faking the (save into localStorage)
     spyOn(localStorage,'setItem');

    // lets fake the cart data so it already has the item
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
      
    });

    loadFromStorage();

    // lets add the item to the cart
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

     // this is to ascertain that the item has been added to the cart
     expect(cart.length).toEqual(1);

     // this is to ascertain that the item is added to localStorage
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
 
     // this is to ascertain whether the first product is the one that was added
     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
 
     // this is to ascertain whether the quantity of the product is 1
     expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    //  faking the (save into localStorage)
    spyOn(localStorage,'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    // this is to ascertain that the item has been added to the cart
    expect(cart.length).toEqual(1);

    // this is to ascertain that the item is added to localStorage
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // this is to ascertain whether the first product is the one that was added
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // this is to ascertain whether the quantity of the product is 1
    expect(cart[0].quantity).toEqual(1);
  })
});