export interface IProductCard {
    id: string
    title: string
    description?: string
    price: number
    image: string
    category?: string
}

export type ICard = Pick<IProductCard, 'title' | 'price' | 'category' | 'image' | 'id' >

export type IPreviewCard = Pick<IProductCard, 'image' | 'title' | 'category'  | 'id'>;

export type IProductsBasket = Pick<IProductCard, 'title' | 'price' |  'id'>
export interface ICardsData {
    cards: IProductCard[]
}
export interface IOrderForm {
    email: string;
    phone: string;
}

export interface Basket {
    products: IProductCard[]
}

export type address = {
    address: string
}

export type contacts = {
    email: string
    phone: string
}

export interface IOrderDataPost {
    items: string[]
    payment: string
    email: string
    phone: string
    address: string
    total: number
}

export interface IOrderResponse {
    id: string
    total: number
}

