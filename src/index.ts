import './scss/styles.scss';
import { Card } from "./components/common/Cardview";

import { ApiHelper } from "./components/common/apiHelper";
import { CDN_URL, API_URL } from "./utils/constants";
import { IProductCard } from "./types/model/productCard";
import { CardsData } from './components/common/CardsData';
import { EventEmitter, IEvents } from './components/base/events';
import { Modal } from './components/common/Modal';
import { ensureElement, createElement } from './utils/utils';

const api = new ApiHelper(CDN_URL, API_URL);
const events: IEvents = new EventEmitter();

const template = document.querySelector('#card-catalog') as HTMLTemplateElement; 
const cardContainer = document.querySelector('.gallery') as HTMLElement;

const cardArray = new CardsData(events)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


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
                price: item.price !== null ? `${item.price} Cинапсов` : 'Бесплатно',
                category: item.category,
                image: item.image 
            });
            cardContainer.appendChild(cardElement);
        });
    });

events.on('cards:chosen', () => {
    modal.render({
        content: createElement<HTMLElement>('div', {}, [
            
            
        ])
    });
})   
/* api
    .getCards()
    .then((cards) => {
        
       
        cards.forEach((item) => {
            
            const card = new Card(template);
            const cardElement = card.render({
                title: item.title,
                price: item.price !== null ? `${item.price} Cинапсов` : 'Бесплатно',
                category: item.category,
                image: item.image 
            });
            cardContainer.appendChild(cardElement);
        });
    })
    .catch((error) => {
        console.log(222, error);
    });

*/

console.log(111, cardArray)