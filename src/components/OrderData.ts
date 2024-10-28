import { IEvents } from "./base/events"


export class OrderData {
    
    protected _items: []
    protected _payment: string
    protected _email: string
    protected _phone: string
    protected _address: string
    protected _total: number
    protected events: IEvents

        constructor(events: IEvents) {
            this.events = events
        }

    set items(value: []) {
        this._items = value
    }

    set payment(value: string) {
        this._payment = value
    }

    set email(value: string) {
        this._email = value
    }

    set phone(value: string) {
        this._phone = value
    }

    set address(value: string){
        this._address = value
    }

    set total(value: number) {
        this._total = value
    }

    
}