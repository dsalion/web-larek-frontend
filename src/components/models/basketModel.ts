import { IProductCardBasket } from "../../types/model/productCard";
import { IBasketItem } from "../../types/model/basket";

export class Basket implements IBasketItem {
    protected products: IProductCardBasket[] = [];

    constructor() {
        this.products = []
    };

    addProduct(product: IProductCardBasket) {
        return product
    }
    deleteProduct(id: number) {}

    getProducts() {}

   

    }
