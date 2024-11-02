import { Component } from './base/Component';
import { IEvents } from './base/events';
import { Form } from './common/Form';
import { IFormState } from './common/Form';

interface IAddressFormView {
	address: HTMLInputElement;
	buttonOnline: HTMLButtonElement;
	buttonOffline: HTMLButtonElement;
	buttonSubmit: HTMLButtonElement;
}

export class FormsView extends Form<IAddressFormView> {
	protected _address: HTMLInputElement;
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonOffline: HTMLButtonElement;
	protected _buttonSubmit: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._address = this.container.querySelector(
			'.form__input'
		) as HTMLInputElement;
		this._buttonOnline = this.container.querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;
		this._buttonOffline = this.container.querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;
		this._address.addEventListener(
			'input',
			this.addressInputValidate.bind(this)
		);
		this._buttonOnline.addEventListener('click', () => {
			this.events.emit('addressform:online');
		});
		this._buttonOffline.addEventListener('click', () => {
			this.events.emit('addressform:offline');
		})
		this._buttonSubmit = this.container.querySelector('.order__button');
		this.container.addEventListener('submit', (event) => {
			event.preventDefault();
			super.onSubmit({
				address: this._address.value,
			});
		});
	}
	addressInputValidate(): void {
		const addressValue = this._address.value;
		if (addressValue.length === 0) {
			this.valid = false;
			this.errors = 'Заполните адрес доставки';
		} else {
			this.valid = true;
			this.errors = '';
		}
	}

	render(state: Partial<IAddressFormView> & IFormState) {
		super.render(state);
		this.addressInputValidate();

		return this.container;
	}
}

