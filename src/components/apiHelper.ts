import { Api, ApiListResponse } from "./base/api";
import { IProductCard } from "../types/model/productCard";

interface IProductCardApi  {
    getCards: () => Promise<IProductCard[]>
}

export class ApiHelper extends Api implements IProductCardApi {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options)
        this.cdn = cdn
    }

    getCards(): Promise<IProductCard[]> {
        return this.get('/product').then((data: ApiListResponse<IProductCard>) => {
            const cards = data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image,
            }));
            console.log('Преобразованные данные:', cards);
            return cards;
        });
    }

  /*  getCards(): Promise<IProductCard[]> {
        console.log(data)
        return this.get('/product').then((data: ApiListResponse<IProductCard>) => data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image,
            
        }
    ))
    );
    } */


}