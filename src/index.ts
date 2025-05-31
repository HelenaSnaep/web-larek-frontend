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
import { Order } from './components/Order';
import { Success } from './components/common/Success';

const events = new EventEmitter();

const api = new LarekApi(CDN_URL, API_URL);
const appData = new AppData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

events.on('items:changed', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new CardMain(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('preview:changed', item),
		});
		return card.render(item);
	});
});

events.on('preview:changed', (item: IProduct) => {
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			appData.addToBasket(item);
		},
	});

	cardPreview.button = 'В корзину';
	modal.render({ content: cardPreview.render(item) });
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('basket:close', () => {
	modal.close();
});

events.on('basket:changed', () => {
	const basketItems = appData.items.filter((product) =>
		appData.basket.items.includes(product.id)
	);

	const basketCards = basketItems.map((item, index) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onDelete: () => appData.removeFromBasket(item),
		});
		card.index = index + 1;
		return card.render(item);
	});

	basket.items = basketCards;
	basket.total = appData.basket.total;
	events.on('basket:changed', () => {
		const basketItems = appData.items.filter((product) =>
			appData.basket.items.includes(product.id)
		);

		const basketCards = basketItems.map((item, index) => {
			const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
				onDelete: () => appData.removeFromBasket(item),
			});
			card.index = index + 1;
			return card.render(item);
		});

		basket.items = basketCards;
		basket.total = appData.basket.total;
		basket.selected = appData.basket.items;
		page.counter = appData.basket.items.length;
	});
	page.counter = appData.basket.items.length;
});

events.on('item:remove', (item: IProduct) => {
	appData.removeFromBasket(item);
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: 'card',
			valid: false,
			errors: [],
		}),
	});
});

events.on('form:change', (data: { field: string; value: string }) => {
	appData.setOrderField(data.field as keyof IOrderForm, data.value);
});


events.on('form:submit', () => {
	if (appData.validateOrder()) {
		api.orderProduct({
			...appData.order,
			items: appData.basket.items,
		}).then((result) => {
			appData.clearBasket();

			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => modal.close()
			});
			success.total = result.total;

			modal.render({
				content: success.render(),
			});
		});
	}
});


events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => {
		console.error(err);
	});
