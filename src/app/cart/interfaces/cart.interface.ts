export interface Carts {
  ok:    boolean;
  carts: CartElement[];
}

export interface Cart {
  ok: boolean,
  cart: CartElement
}

export interface CartUpdate {
  ok: Cart['ok']
  cartUpdateWithoutDelete: Cart['cart']
}

export interface UpdateQuantity {
  ok: Cart['ok'],
  cartUpdated: Cart['cart']
}

export interface CartElement {
  products: ProductElement[];
  cid:      string;
}

export interface ProductElement {
  product:  ProductInCart;
  quantity: number;
  _id:      string;
}

export interface ProductInCart {
  title:       string;
  description: string;
  price:       number;
  thumbnail:   any[];
  code:        string;
  status:      boolean;
  category:    string;
  stock:       number;
  pid:         string;
}
