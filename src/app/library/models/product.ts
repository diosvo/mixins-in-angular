interface BaseProduct {
  productId: number;
  productName: string;
  productImage: string;
  productStock: number;
  productPrice: number;
  productSalePrice: number;
  rating: number;
}

interface IProduct extends BaseProduct {
  categoryId: number;
}

export { IProduct };

