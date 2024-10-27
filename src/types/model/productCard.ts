export interface IProductCard {
    id: string
    title: string
    description: string
    price: number
    image: string
    category: string
}


export type ICard = Pick<IProductCard, 'title' | 'price' | 'category' | 'image' | 'id'>

export type IPreviewCard = Pick<IProductCard, 'image' | 'title' | 'category'  | 'id'>;

export type IProductsBasket = Pick<IProductCard, 'title' | 'price' |  'id'>