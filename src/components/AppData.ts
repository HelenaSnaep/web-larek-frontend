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
	items: IProduct[] = [];
	preview: IProduct | null = null;
	basket: IBasket = {
		item: [],
		total: 0
	};

	order: IOrderForm = {
		email: '',
		phone: '',
		address: '',
		payment: 'card'

	};

	formErrors: Partial<Record<keyof IOrderForm, string>> = {};

	constructor(protected events: IEvents) {

	}

	setItems(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:changed', this.items);
	}

	setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:changed', this.preview);
	}

	inBasket(item: IProduct) {
		return this.basket.item.includes(item.id);
	}

	addToBasket(item: IProduct) {
		if (!this.inBasket(item)) {
			this.basket.item.push(item.id);
			this.updateTotal();
			this.events.emit('basket:changed', this.basket);
		}
	}

	removeFromBasket(item: IProduct) {

	}

	updateTotal() {
		this.basket.total = this.basket.item.reduce((total, id) => {
			const product = this.items.find(p => p.id === id);
			return total + (product?.price || 0);
		}, 0);
	}
	
	setOrderField(field: keyof IOrderForm, value: string) {

	}

	setPayment(method: PaymentMethod) {
		this.order.payment = method;
		this.events.emit('order:updated', this.order);
	}

	setFormError(field: keyof IOrderForm, error: string) {
		this.formErrors[field] = error;
		this.events.emit('form:error', { field, error });
	}

	clearBasket() {
		this.basket.item = [];
		this.basket.total = 0;
		this.events.emit('basket:changed', this.basket);
	}

	validateOrder(){
}

}
