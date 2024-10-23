import './scss/styles.scss';
import { Card } from "./components/common/Card";

import { ApiHelper } from "./components/common/apiHelper";
import { CDN_URL, API_URL } from "./utils/constants";
import { IProductCard } from "./types/model/productCard";

const api = new ApiHelper(CDN_URL, API_URL);

const template = document.querySelector('#card-catalog') as HTMLTemplateElement; 
const cardContainer = document.querySelector('.gallery') as HTMLElement;



api
    .getCards()
    .then((cards) => {
        
        console.log(cards);
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

