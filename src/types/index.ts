import { IProductsBasket } from "./model/productCard";

export interface IOrderForm {
    email: string;
    phone: string;
}


export interface IBasketView {
    products: IProductsBasket []
    total: number
    
}

export interface IAddressFormView {
    address: HTMLInputElement
    buttonOnline: HTMLButtonElement
    buttonOffline: HTMLButtonElement
    buttonSubmit: HTMLButtonElement
}

export interface IContactsFormView {
    formEmail: HTMLFormElement
    formPhone: HTMLFormElement
    button: HTMLButtonElement
}