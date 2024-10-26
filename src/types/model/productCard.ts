export interface IProductCard {
    id: string
    title: string
    description: string
    price: string
    image: string
    category: string
}


export type ICard = Pick<IProductCard, 'title' | 'price' | 'category' | 'image'>