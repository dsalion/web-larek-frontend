import { Component } from './base/Component';
import { IEvents } from './base/events';

interface IAddressFormView {
    address: HTMLInputElement
    buttonOnline: HTMLButtonElement
    buttonOffline: HTMLButtonElement
    buttonSubmit: HTMLButtonElement
}

export class FormsView extends Component<IAddressFormView> {
	protected element: HTMLElement;
	protected _address: HTMLInputElement;
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonOffline: HTMLButtonElement;
	protected _buttonSubmit: HTMLButtonElement;
	protected events: IEvents;
	protected errors: HTMLSpanElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

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
		this.errors = this.container.querySelector(
			'.form__error'
		) as HTMLSpanElement;
		this._buttonOnline.addEventListener('click', () => {
			this.events.emit('addressform:online');
		});
		this._buttonOffline.addEventListener('click', () => {
			this.events.emit('addressform:offline');
		});
		this._buttonSubmit = this.container.querySelector(
			'.order__button'
		) as HTMLButtonElement;
		this._buttonSubmit.addEventListener('click', () => {
			event.preventDefault();
			this.events.emit('addressform:submit', { address: this._address.value });
		});
	}

	addressInputValidate(): void {
		const addressValue = this._address.value;

		if (addressValue.length === 0) {
			this._buttonSubmit.disabled = true;
			this.errors.textContent = 'Заполните адресс доставки';
		} else {
			this.errors.textContent = '';
			this._buttonSubmit.disabled = false;
		}
	}
}
