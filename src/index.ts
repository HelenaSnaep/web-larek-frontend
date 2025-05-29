import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';
import { IProduct, IBasket, IOrderForm, PaymentMethod } from './types';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ensureElement } from './utils/utils';

const events = new EventEmitter();

const api = new LarekApi(API_URL, CDN_URL);
const appData = new AppData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLElement>('#card-basket');

const page = new Page(ensureElement<HTMLElement>('.page'), events);

// Тестовый товар
const testProduct: IProduct = {
            id: "6a834fb8-350a-440c-ab55-d0e9b959b6e3",
            description: "Даст время для изучения React, ООП и бэкенда",
            image: "/Butterfly.svg",
            title: "Микровселенная в кармане",
            category: "другое",
            price: 750
};

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardElement = (
	cardTemplate.content.querySelector('.card') as HTMLElement
).cloneNode(true) as HTMLElement;

const card = new Card(cardElement, {
	onClick: () => {
		console.log('Карточка кликнута:', testProduct.id);
	},
});

card.id = testProduct.id;
card.title = testProduct.title;
card.description = testProduct.description;
card.image = testProduct.image;
card.category = testProduct.category;
card.price = testProduct.price;
card.button = 'В корзину';

document.querySelector('.gallery')?.appendChild(card.getContainer());
