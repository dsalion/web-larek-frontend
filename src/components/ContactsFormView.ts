import { IContactsFormView } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';
export class ContactsFormView extends Component<IContactsFormView> {
	protected element: HTMLElement;
	protected formEmail: HTMLFormElement;
	protected formPhone: HTMLFormElement;
	protected button: HTMLButtonElement;
	protected events: IEvents;
	protected errorEmail: HTMLSpanElement;
	protected errorPhone: HTMLSpanElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.formEmail = this.container.querySelector('.form__input[name="email"]');
		this.formEmail.addEventListener('input', this.emailValidate.bind(this));
		this.formPhone = this.container.querySelector('.form__input[name="phone"]');
		this.formPhone.addEventListener('input', this.phoneValidate.bind(this));
		this.errorEmail = this.container.querySelector('.form__error_email');
		this.errorPhone = this.container.querySelector('.form__error_phone');
		this.button = this.container.querySelector('.button');
		this.button.addEventListener('click', () => {
			event.preventDefault();
			this.events.emit('contacts:submit', {
				email: this.formEmail.value,
				phone: this.formPhone.value,
			});
		});
	}

	emailValidate(): void {
		const emailValue = this.formEmail.value;
		if (emailValue.length === 0) {
			this.errorEmail.textContent = 'Заполните email';
		} else {
			this.errorEmail.textContent = '';
		}
		this.chekValidation();
	}

	phoneValidate(): void {
		const phoneValue = this.formPhone.value;
		if (phoneValue.length === 0) {
			this.errorPhone.textContent = 'Заполните телефон';
		} else {
			this.errorPhone.textContent = '';
		}
		this.chekValidation();
	}

	chekValidation(): void {
		this.formEmail.value.length > 0 && this.formPhone.value.length > 0
			? (this.button.disabled = false)
			: (this.button.disabled = true);
	}
}
