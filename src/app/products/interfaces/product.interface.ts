export interface Product {
  ok:            boolean;
  payload:       Payload[];
  totalDocs:     number;
  limit:         number;
  totalPages:    number;
  page:          number;
  pagingCounter: number;
  hasPrevPage:   boolean;
  hasNextPage:   boolean;
  prevPage:      null;
  nextPage:      number;
}

export interface Payload {
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
