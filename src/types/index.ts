import { IProductsBasket } from "./model/productCard";

export interface IOrderForm {
    email: string;
    phone: string;
}


export interface IBasketView {
    products: IProductsBasket []
    total: number
}