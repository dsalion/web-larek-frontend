import { Api, ApiListResponse } from './base/api';
import { IProductCard } from '../types';
import { IOrderDataPost, IOrderResponse } from '../types';

interface IProductCardApi {
	getCards: () => Promise<IProductCard[]>;
	sendOrder: (data: IOrderDataPost) => Promise<IOrderResponse>;
}

export class ApiHelper extends Api implements IProductCardApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCards(): Promise<IProductCard[]> {
		return this.get('/product').then((data: ApiListResponse<IProductCard>) => {
			const cards = data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}));
			return cards;
		});
	}

	sendOrder(data: IOrderDataPost): Promise<IOrderResponse> {
		return this.post('/order', data).then((data: IOrderResponse) => data);
	}
}
