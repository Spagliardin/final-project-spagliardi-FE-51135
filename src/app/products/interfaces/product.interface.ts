export interface Product {
  title:       string;
  description: string;
  price:       number;
  code:        string;
  status:      boolean;
  category:    string;
  stock:       number;
  thumbnail?:   any[];
}
