import {
	IProduct,
	IBasket,
	IOrder,
	IOrderForm,
	PaymentMethod,
	FormErrors
} from '../types';

import { IEvents } from '../components/base/events';

export class AppData {
	catalog: IProduct[] = [];
	basket: IBasket = {
		item: [],
		total: 0
	};
	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment:'card',
		items: []
	};
	preview: IProduct | null = null;
	formErrors: FormErrors = {};

	constructor(protected events: IEvents) {}

	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.events.emit('catalog:changed', this.catalog);
	}

	setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:changed', item);
	}

	isInBasket(item: IProduct): boolean {
		return this.basket.item.includes(item.id);
	}

	addToBasket(item: IProduct) {
		if (!this.isInBasket(item)) {
			this.basket.item.push(item.id);
			this.updateTotal();
			this.events.emit('basket:changed', this.basket);
		}
	}

	removeFromBasket(item: IProduct) {
		this.basket.item = this.basket.item.filter(id => id !== item.id);
		this.updateTotal();
		this.events.emit('basket:changed', this.basket);
	}

	updateTotal() {
		this.basket.total = this.basket.item.reduce((total, id) => {
			const product = this.catalog.find(p => p.id === id);
			return total + (product?.price || 0);
		}, 0);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		if (field === 'payment') {
			this.order.payment = value as PaymentMethod;
		} else {
			this.order[field] = value;
		}
		this.events.emit('order:updated', this.order);
	}

	setPayment(method: PaymentMethod) {
		this.order.payment = method;
		this.events.emit('order:updated', this.order);
	}

	validateOrderForm(): boolean {
		const errors: FormErrors = {};
		if (!this.order.address) errors.address = 'Укажите адрес';
		if (!this.order.payment) errors.payment = 'Выберите способ оплаты';
		this.formErrors = errors;
		this.events.emit('orderFormErrors:changed', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContactsForm(): boolean {
		const errors: FormErrors = {};
		if (!this.order.email) errors.email = 'Укажите email';
		if (!this.order.phone) errors.phone = 'Укажите телефон';
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:changed', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	prepareOrder() {
		this.order.items = [...this.basket.item];
		this.updateTotal();
		this.events.emit('order:ready', this.order);
	}

	clearBasket() {
		this.basket.item = [];
		this.basket.total = 0;
		this.events.emit('basket:changed', this.basket);
	}
}
