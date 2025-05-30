import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';
import { IProduct, IBasket, IOrderForm, PaymentMethod } from './types';
import { CardMain } from './components/CardMain';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();

const api = new LarekApi(CDN_URL , API_URL);
const appData = new AppData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLElement>('#card-basket');

const page = new Page(document.body, events);





console.log('API_URL:', API_URL);


events.on('card:select', (item: IProduct) => {
    appData.setPreview(item);
});

events.on('items:changed', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new CardMain(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});

		card.id = item.id;
		card.title = item.title;
		card.price = item.price;
		card.image = item.image;
		card.category = item.category;

		return card.render();
	});
});




api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => {
		console.error(err);
	});