import './scss/styles.scss';
import { Card } from './components/Cardview';
import { ApiHelper } from './components/apiHelper';
import { CDN_URL, API_URL } from './utils/constants';
import { IProductCard } from './types';
import { CardsData } from './components/CardsData';
import { EventEmitter, IEvents } from './components/base/events';
import { Modal } from './components/common/Modal';
import { ensureElement } from './utils/utils';
import { PreviewCard } from './components/PreviewCard';
import { BasketData } from './components/BasketData';
import { BasketView } from './components/BasketView';
import { OrderData } from './components/OrderData';
import { FormsView } from './components/AddressFormView';
import { cloneTemplate } from './utils/utils';
import { ContactsFormView } from './components/ContactsFormView';
import { address, contacts, IOrderResponse } from './types';
import { SuccessOrder } from './components/SuccesOrderView';
import { Page } from './components/Page';

const api = new ApiHelper(CDN_URL, API_URL);
const events: IEvents = new EventEmitter();
const template = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardContainer = document.querySelector('.gallery') as HTMLElement;
const templateBasket = document.querySelector('.basket') as HTMLTemplateElement;
const cardArray = new CardsData(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const previewcard = new PreviewCard(
	ensureElement<HTMLTemplateElement>('.card_full'),
	events
);
const pageView = document.querySelector('.page');
const page = new Page(pageView as HTMLElement);
const basket = new BasketData(events);
const iconBasket = document.querySelector('.header__basket');
const basketView = new BasketView(templateBasket, events, basket);
const headerBasketContent = document.querySelector('.header__basket-counter');
const order = new OrderData(events);
const addressTemplate = document.getElementById('order');
const formAddress = new FormsView(
	cloneTemplate(addressTemplate as HTMLTemplateElement),
	events
);
const contactsTemplate = document.getElementById('contacts');
const formContacts = new ContactsFormView(cloneTemplate(contactsTemplate as HTMLTemplateElement),
	events
);
const successTemplate = document.getElementById('success');
const successOrder = new SuccessOrder(
	cloneTemplate(successTemplate as HTMLTemplateElement),
	events
);



api
	.getCards()
	.then((cards: IProductCard[]) => {
		cardArray.cards = cards;
	})
	.catch((error) => {
		console.log(error);
	});


events.on('cards:added', () => {
	const cards = cardArray.cards;
	cards.forEach((item) => {
		const card = new Card(template, events);
		const cardElement = card.render({
			title: item.title,
			price: item.price,
			category: item.category,
			image: item.image,
			id: item.id,
		});
		cardContainer.appendChild(cardElement);
	});
});


events.on('cards:chosen', (card: IProductCard) => {
	const chosenCard = cardArray.getCard(card.id);
	modal.render({
		content: previewcard.render({
			title: chosenCard.title,
			description: chosenCard.description,
			price: chosenCard.price,
			category: chosenCard.category,
			image: chosenCard.image,
			id: chosenCard.id,
		}),
	});
});


events.on('modal:open', () => {
	page.locked = true;
});


events.on('modal:close', () => {
	page.locked = false;
});


events.on('product:addedtobasket', (data: IProductCard) => {
	const chosenCard = cardArray.getCard(data.id);
	basket.addToBasket(chosenCard);
	page.basketCounter = basket.products.length.toString();
});


events.on('basket:delItem', () => {
	page.basketCounter = basket.products.length.toString();
});


iconBasket.addEventListener('click', () => {
	modal.render({
		content: basketView.render(),
	});
});


events.on('basket:addedToOrder', (data: IProductCard[]) => {
	order.items = basket.convertToArrayId(data);
	order.total = basket.getSum();
	modal.close();
	modal.render({ content: formAddress.render() });
});


events.on('addressform:online', () => {
	order.payment = 'online';
});


events.on('addressform:offline', () => {
	order.payment = 'offline';
});


events.on('addressform:submit', (data: address) => {
	order.address = data.address;
	modal.close();
	modal.render({ content: formContacts.render() });
});


events.on('contacts:submit', (data: contacts) => {
	order.email = data.email;
	order.phone = data.phone;
	api
		.sendOrder(order.getOrder())
		.then((data: IOrderResponse) => {
			console.log('заказ оформлен. ID:', data.id);
			basket.clear();
			page.basketCounter = basket.products.length.toString();
			basketView.updateList();
			order.clear();
			order.totalResponse = data.total;
			successOrder.description = data.total;
			modal.close();
			modal.render({ content: successOrder.render() });
		})
		.catch((error) => {
			console.log('заказ не отправлен. Ошибка:', error);
		});
});


events.on('order:success', () => {
	modal.close();
});
