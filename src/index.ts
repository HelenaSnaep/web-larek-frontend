import './scss/styles.scss';

import { LarekApi }   from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants'
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';
import { IProduct } from './types';


const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL);

const appData = new AppData(events);

const productListTest: IProduct[] = [
	{
		id: "854cef69-976d-4c2a-a18c-2aa45046c390",
		description: "Описание товара",
		image: "/test.png",
		title: "Тестовый товар",
		category: "другое",
		price: 100,
	},
];

const productItemTest: IProduct = {
	id: "854cef69-976d-4c2a-a18c-2aa45046c390",
	description: "Описание товара",
	image: "/test.png",
	title: "Тестовый товар",
	category: "другое",
	price: 100,
};

events.on('items:changed', (data) => {
	console.log('Товары обновлены:', data);
});

events.on('preview:changed', (data) => {
	console.log('Превью обновлено:', data);
});

events.on('basket:changed', (data) => {
	console.log('Корзина обновлена:', data);
});

appData.setItems(productListTest);

console.log('Товары:', appData.items);


appData.setPreview(productItemTest);

appData.addToBasket(productItemTest);

console.log('В корзине?', appData.inBasket(productItemTest));

appData.removeFromBasket(productItemTest);
console.log('В корзине после удаления?', appData.inBasket(productItemTest));
appData.clearBasket();
console.log('Корзина после очистки:', appData.basket);
appData.setOrderField('email', 'example@test.com');
appData.setOrderField('phone', '+79001234567');
appData.setOrderField('address', 'Тестовая улица, 1');

// Валидация заказа
const isValid = appData.validateOrder();
console.log('Заказ валиден?', isValid);




