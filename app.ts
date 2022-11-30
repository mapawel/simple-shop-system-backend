import { Product } from './Product/Product.js';
import { Basket } from './Basket/Basket.js';
import { productCategories } from './Product/productCategoriesEnum.js';
import { ShopSystem } from './ShopSystem/ShopSystem.js';
import { ShopSystemOffer } from './ShopSystem/services/ShopSystemOffer.js';
import { ShopSystemCoupons } from './ShopSystem/services/ShopSystemCoupons.js';

// CREATE EXAMPLE PRODUCTS INSTANCES
const p1 = new Product({
  name: 'Nice Jacket',
  category: productCategories.JACKET,
  basePrice: 350.333333333,
});

const p2 = new Product({
  name: 'Nice Trousers',
  category: productCategories.TROUSERS,
  basePrice: 250,
  discount: 0.2,
});

const p3 = new Product({
  name: 'Nice Shoes',
  category: productCategories.SHOES,
  basePrice: 200,
  discount: 0.2,
});

const p4 = new Product({
  name: 'Nice Belt',
  category: productCategories.BELT,
  basePrice: 100,
});

const p5 = new Product({
  name: 'Nice Socks',
  category: productCategories.SOCKS,
  basePrice: 30,
});

// ADD SOME PRODUCTS TO BASKET
const b1 = new Basket({ discount: 0 });
b1.addProduct(p1);
// b1.addProduct(p1);
// b1.addProduct(p1);
console.log(b1.addProduct(p2));
b1.addProduct(p2);
b1.addProduct(p2);
console.log(b1.removeProduct(p2));
// console.log(b1.removeAllProducts());
// b1.removeProduct(p3);
// console.log('>>>>>>>>>>>>>>>>>>>> ----> ', b1.basketList);
// console.log('>>>>>>>>>>>>>>>>>>>> ----> ', b1.getFinalBasketValue());
// b1.removeAllProducts();

// INITIALIZE SHOP INSTANCE WITH NECESSARY SERVICES
const shopSystemOffer = new ShopSystemOffer();
const shopSystemCoupons = new ShopSystemCoupons();
const shop = new ShopSystem(shopSystemOffer, shopSystemCoupons);

// ADD PRODUCTS TO STOCK TO SHOP INSTANCE AND STOCK MANIPULATION
[
  {
    product: p1,
    qty: 11,
  },
  {
    product: p2,
    qty: 22,
  },
  {
    product: p3,
    qty: 33,
  },
  {
    product: p4,
    qty: 44,
  },
  {
    product: p5,
    qty: 55,
  },
].forEach(({ product, qty }) =>
  console.log(
    'shop system add product: ',
    shop.addOrUpdateShopProduct(product, qty)
  )
);

console.log('shop system rm product: ', shop.removeShopProduct(p5));
shop.removeShopProduct(p1);

shop.addOrUpdateShopProduct(p1, 1);
shop.addOrUpdateShopProduct(p3, 333);

// CHECK SHOP PRODUCTS STATUS AFTER MANIPULATION
// console.log('SHOP PRODUCTS ----> ', shop.shopProducts);

// ADD COUPONS TO SHOP INSTANCE AND COUPONS MANIPULATION
console.log('coupon manipulation response: ', shop.addShopCoupon('QWE'));
shop.addShopCoupon('ASD');
shop.addShopCoupon('ZXC');
shop.addShopCoupon('ASD');

console.log('coupon manipulation response: ', shop.removeShopCoupon('ASD'));
console.log('coupon manipulation response: ', shop.useShopCoupon('QWE'));

// console.log('SHOP UNUSED COUPONS ----> ', shop.showShopCoupons);

// CHECKOUT WITH BASKET EARLIER CREATED
console.log('shop system checkout response: ', shop.checkout(b1));

// CHECK STOP STATUS
// console.log('SHOP PRODUCTS AFTER CHECKOUT ----> ', shop.shopProducts);
// console.log('SHOP CLOSED BASKETS ----> ', shop.closedBaskets);
