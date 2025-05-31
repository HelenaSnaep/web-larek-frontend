import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';
import { IProduct, IBasket, IOrderForm, PaymentMethod } from './types';
import { CardMain } from './components/CardMain';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { CardPreview } from './components/CardPreview';
import { Basket } from './components/common/Basket';
import { CardBasket } from './components/CardBasket';


const events = new EventEmitter();

const api = new LarekApi(CDN_URL, API_URL);
const appData = new AppData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(
	cloneTemplate(basketTemplate),
	events
);



events.on('items:changed', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new CardMain(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});


events.on('preview:changed', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('card:select', (item: IProduct) => {
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			appData.addToBasket(item);
			modal.close();
			events.emit('basket:open'); 
		},
	});

	const previewElement = cardPreview.render(item);
	modal.render({ content: previewElement });
	modal.open();
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('basket:changed', () => {
	basket.items = appData.basket.items.map((id) => {
		const item = appData.items.find((i) => i.id === id);
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onDelete: () => events.emit('removeFromBasket', item),
		});
		return card.render(item);
	});
	basket.total = appData.basket.total;
});

events.on('basket:changed', (items: string[]) => {
	page.counter = items.length;
});


events.on('basket:remove', (item: IProduct) => {
	appData.removeFromBasket(item);
});



api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => {
		console.error(err);
	});
