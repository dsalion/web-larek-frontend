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

const api = new ApiHelper(CDN_URL, API_URL);
const events: IEvents = new EventEmitter();

const template = document.querySelector('#card-catalog') as HTMLTemplateElement; 
const cardContainer = document.querySelector('.gallery') as HTMLElement;

const cardArray = new CardsData(events)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const previewcard = new PreviewCard(ensureElement<HTMLElement>('.card_full'), events)
const pagelock = document.querySelector('.page__wrapper')

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
                image: item.image, 
                id: item.id
            });
            cardContainer.appendChild(cardElement);
        });
    });

    

events.on('cards:chosen', (card:  any) => {
    const chosenCard = cardArray.getCard(card.card.id)
    modal.render(
        {content: previewcard.render( {
            title: chosenCard.title,
            description: chosenCard.description,
           // price: chosenCard.price !== null ? `${chosenCard.price} Cинапсов` : 'Бесплатно',
           category: chosenCard.category,
           image: chosenCard.image
        }
            
        ) }
    )
   
             
            
    
    



console.log(chosenCard)
console.log(card)
})   


events.on('modal:open', () => {pagelock.classList.add('page__wrapper_locked')})
events.on('modal:close', () => {pagelock.classList.remove('page__wrapper_locked')})
    


console.log(111, cardArray)