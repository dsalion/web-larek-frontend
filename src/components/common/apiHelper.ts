import { Api, ApiListResponse } from "../base/api";
import { IProductCard } from "../../types/model/productCard";

export class ApiHelper extends Api {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options)
        this.cdn = cdn
    }

    getCards(): Promise<IProductCard[]> {
        return this.get('/product').then((data: ApiListResponse<IProductCard>) => data.items)
    }


}