import { Product } from './Product/Product.js';
import { Basket } from './Basket/Basket.js';
import { productCategories } from './Product/productCategoriesEnum.js';
import { Coupon } from './Coupon/Coupon.js';
import { ShopSystem } from './ShopSystem/ShopSystem.js';
import { ShopOffer } from './ShopSystem/services/shopOffer.js';
import { ShopCoupons } from './ShopSystem/services/ShopCoupons.js';

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
const b1 = new Basket({ discount: 0.5 });
b1.addProduct(p1);
b1.addProduct(p1);
b1.addProduct(p2);
b1.addProduct(p2);
b1.removeProduct(p1);

console.log('>>>>>>>>>>>>>', b1.getFinalBasketValue());
// INITIALIZE SHOP INSTANCE WITH NECESSARY SERVICES
const shopOffer = new ShopOffer();
const shopCoupons = new ShopCoupons();
const shop = new ShopSystem(shopOffer, shopCoupons);

// ADD PRODUCTS TO STOCK TO SHOP INSTANCE AND STOCK MANIPULATION
shop.addShopProducts([
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
]);

shop.removeShopProducts([p5, p1]);

shop.addShopProducts([
  {
    product: p1,
    qty: 1,
  },
]);

shop.updateShopProductQty({
  product: p3,
  qty: 333,
});

// CHECK SHOP PRODUCTS STATUS AFTER MANIPULATION
console.log('SHOP PRODUCTS ----> ', shop.shopProducts);

// CREATE COUPONS
const c1 = new Coupon('QWER');
const c2 = new Coupon('ASDF');
const c3 = new Coupon('ZXCV');

// ADD COUPONS TO SHOP INSTANCE AND COUPONS MANIPULATION
shop.addShopCoupon([c1, c2]);
shop.addShopCoupon([c3]);
shop.removeShopCoupons([c2]);

console.log('SHOP UNUSED COUPONS ----> ', shop.showShopCoupons);

// CHECKOUT WITH BASKET EARLIER CREATED
shop.checkout(b1);

// CHECK STOP STATUS
console.log('SHOP PRODUCTS AFTER CHECKOUT ----> ', shop.shopProducts);
console.log('SHOP CLOSED BASKETS ----> ', shop.closedBaskets);
