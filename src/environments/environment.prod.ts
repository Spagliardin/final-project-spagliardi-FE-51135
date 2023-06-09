export const environment = {
  production: true,
  wsUrl: 'http://localhost:8080',
  base_url: 'http://localhost:8080/api',
  apis: {
    products: `products`,
    carts: `carts/#cartId#/product/#productId#`,
    user: `users/register`
  }
};
