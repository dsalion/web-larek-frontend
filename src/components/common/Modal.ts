import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === this.container) {
            this.close();
        }
    };
	
    this._closeButton.addEventListener('click', () => this.close());
    this.container.addEventListener('click', handleOverlayClick);
    this._content.addEventListener('click', (event) => event.stopPropagation());
    this.handleEscUp = this.handleEscUp.bind(this);
}


	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.toggleClass(this.container, 'modal_active');
		document.addEventListener('keyup', this.handleEscUp);
		this.events.emit('modal:open');
	}

	close() {
		this.toggleClass(this.container, 'modal_active');
		this.content = null;
		document.removeEventListener('keyup', this.handleEscUp);
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}

	handleEscUp(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}
