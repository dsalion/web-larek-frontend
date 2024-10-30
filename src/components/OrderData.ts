import { IOrderDataPost } from '../types';
import { IEvents } from './base/events';

export class OrderData {
	protected _items: string[];
	protected _payment = 'offline';
	protected _email: string;
	protected _phone: string;
	protected _address: string;
	protected _total: number;
	protected events: IEvents;
	protected _totalResponse: number;

	constructor(events: IEvents) {
		this.events = events;
	}

	set items(value: string[]) {
		this._items = value;
	}

	get items(): string[] {
		return this._items;
	}

	set payment(value: string) {
		this._payment = value;
	}

	get payment(): string {
		return this._payment;
	}

	set email(value: string) {
		this._email = value;
	}

	get email(): string {
		return this._email;
	}

	set phone(value: string) {
		this._phone = value;
	}

	get phone(): string {
		return this._phone;
	}

	set address(value: string) {
		this._address = value;
	}

	get address(): string {
		return this._address;
	}

	set total(value: number) {
		this._total = value;
	}

	get total(): number {
		return this._total;
	}

	set totalResponse(value: number) {
		this._totalResponse = value;
	}

	get totalResponse(): number {
		return this._totalResponse;
	}

	getOrder(): IOrderDataPost {
		return {
			items: this.items,
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
		};
	}
	clear(): void {
		this._items = [];
		this._phone = '';
		this._email = '';
		this._address = '';
		this._total = 0;
	}
}
