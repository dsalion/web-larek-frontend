import { Component } from './base/Component';
import { IEvents } from './base/events';
interface ISuccessOrderView {
	title: string;
	description: string;
	button: HTMLButtonElement;
}

export class SuccessOrder extends Component<ISuccessOrderView> {
	protected _title: HTMLElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.events = events;

		this._title = container.querySelector('.order-success__title');
		this._description = container.querySelector('.order-success__description');
		this._button = container.querySelector('.order-success__close');
		this._button.addEventListener('click', () => {
			this.events.emit('order:success');
		});
	}

	set description(value: number) {
		this.setText(this._description,`Списано ${value} синапсов` ) ;
	}
}
