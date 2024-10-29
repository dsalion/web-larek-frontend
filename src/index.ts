import './scss/styles.scss';
import { Card } from "./components/Cardview";

import { ApiHelper } from "./components/apiHelper";
import { CDN_URL, API_URL } from "./utils/constants";
import { IPreviewCard, IProductCard } from "./types/model/productCard";
import { CardsData } from './components/CardsData';
import { EventEmitter, IEvents } from './components/base/events';
import { Modal } from './components/common/Modal';
import { ensureElement, createElement } from './utils/utils';
import { PreviewCard } from './components/PreviewCard';
import { BasketData } from './components/BasketData';
import { BasketView } from './components/BasketView';
import { OrderData } from './components/OrderData';
import { FormsView } from './components/AddressFormView';
import { cloneTemplate } from './utils/utils';
import { ContactsFormView } from './components/ContactsFormView';

const api = new ApiHelper(CDN_URL, API_URL);
const events: IEvents = new EventEmitter();

const template = document.querySelector('#card-catalog') as HTMLTemplateElement; 
const cardContainer = document.querySelector('.gallery') as HTMLElement;

const templateBasket = document.querySelector('.basket') as HTMLTemplateElement;

const cardArray = new CardsData(events)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const previewcard = new PreviewCard(ensureElement<HTMLElement>('.card_full'), events)

const pagelock = document.querySelector('.page__wrapper')

const basket = new BasketData(events)



const iconBasket = document.querySelector('.header__basket')



const basketView = new BasketView(templateBasket, events, basket)

const headerBasketContent = document.querySelector('.header__basket-counter')

const order = new OrderData(events)

const addressTemplate= document.getElementById('order') 
const formAddress = new FormsView(cloneTemplate(addressTemplate as HTMLTemplateElement), events)

const contactsTemplate= document.getElementById('contacts') 
const formContacts = new ContactsFormView(cloneTemplate(contactsTemplate as HTMLTemplateElement), events)

api
    .getCards()
    .then((cards: IProductCard[]) => {
       cardArray.cards = cards;
       console.log(222, cardArray.cards)
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
                id: item.id
            });
            cardContainer.appendChild(cardElement);
            console.log(555, card)
        });
    });

    

events.on('cards:chosen', (card: IProductCard) => {
    const chosenCard = cardArray.getCard(card.id)
    modal.render(
        {content: previewcard.render( {
            title: chosenCard.title,
            description: chosenCard.description,
            price: chosenCard.price,
           category: chosenCard.category,
           image: chosenCard.image,
           id: chosenCard.id
        }
            
        )}
    )
    console.log('1232222',card)
})   


events.on('modal:open', () => {pagelock.classList.add('page__wrapper_locked')})
events.on('modal:close', () => {pagelock.classList.remove('page__wrapper_locked')})


events.on('product:addedtobasket', (data: IProductCard) => {
    console.log('addeddata',data)
    const chosenCard = cardArray.getCard(data.id)
    basket.addToBasket(chosenCard)
    headerBasketContent.textContent = basket.products.length.toString()}
) 

events.on('basket:delItem', () => {
    headerBasketContent.textContent = basket.products.length.toString()
})


iconBasket.addEventListener('click', ()=> {
   
    modal.render( {
        content: basketView.render()

        })
    })


events.on('basket:addedToOrder', (data: IProductCard[]) => {
    order.items = basket.convertToArrayId(data)
    order.total = basket.getSum()
    modal.close()
   modal.render({content: formAddress.render()})
    console.log('order:',order.items)
    console.log('total:',order.total)
})


events.on('form:online', () => {
    order.payment = 'online'
    
})

events.on('form:offline', () => {
    order.payment = 'offline'
    
})

events.on('form:submit', () => {
    modal.close()
    modal.render({content: formContacts.render()})
})