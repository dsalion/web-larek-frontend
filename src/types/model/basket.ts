import { IProductCardBasket } from "./productCard";

export interface IBasketItem {
	products: IProductCardBasket[];
    addProduct(product: IProductCardBasket): IProductCardBasket;
    deleteProduct(id: number): void;
    
}
