import { IEvents } from "./base/events"


export class OrderData {
    
    protected _items: string[]
    protected _payment = 'offline'
    protected _email: string
    protected _phone: string
    protected _address: string
    protected _total: number
    protected events: IEvents

        constructor(events: IEvents) {
            this.events = events
        }

    set items(value: string[]) {
        this._items = value
    }

    get items(): string[] {
        return this._items
    }

    set payment(value: string) {
        this._payment = value
    }

    get payment(): string {
        return this._payment
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

    get total(): number {
        return this._total
    }
}