import { IEvents } from './base/events';
import { Form, IFormState } from './common/Form';

interface IContactsFormView {
    formEmail: HTMLFormElement
    formPhone: HTMLFormElement
    button: HTMLButtonElement
}

export class ContactsFormView extends Form<IContactsFormView> {
	protected formEmail: HTMLFormElement;
	protected formPhone: HTMLFormElement;
	protected errorEmail: HTMLSpanElement;
	protected errorPhone: HTMLSpanElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.formEmail = this.container.querySelector('.form__input[name="email"]');
		this.formEmail.addEventListener('input', this.emailValidate.bind(this));
		this.formPhone = this.container.querySelector('.form__input[name="phone"]');
		this.formPhone.addEventListener('input', this.phoneValidate.bind(this));
		this.errorEmail = this.container.querySelector('.form__error_email');
		this.errorPhone = this.container.querySelector('.form__error_phone');
		
		this.container.addEventListener('submit', (event) => {
			
			event.preventDefault();
			super.onSubmit({email: this.formEmail.value, phone: this.formPhone.value});
			
		});
	}

	emailValidate(): void {
		const emailValue = this.formEmail.value;
		if (emailValue.length === 0) {
			this.setText(this.errorEmail,'Заполните email' ) 
		} else {
			this.setText(this.errorEmail,'' ) ;
		}
		this.chekValidation();
	}

	phoneValidate(): void {
		const phoneValue = this.formPhone.value;
		if (phoneValue.length === 0) {
			this.setText(this.errorPhone,'Заполните номер телефона' ) 
		} else {
			this.setText(this.errorPhone, '' ) ;
		}
		this.chekValidation();
	}

	chekValidation(): void {
		this.valid = this.formEmail.value.length > 0 && this.formPhone.value.length > 0
	}

	render(state: Partial<IContactsFormView> & IFormState) {
		super.render(state); 
		this.emailValidate(); 
		this.phoneValidate(); 

		return this.container;
}
}
