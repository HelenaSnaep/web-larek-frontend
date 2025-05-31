import {
	IProduct,
	IBasket,
	IOrderForm,
	PaymentMethod,
	FormErrors,
} from '../types';

import { IEvents } from '../components/base/events';

export class AppData {
	items: IProduct[] = [];
	preview: IProduct | null = null;
	
	basket: IBasket = {
		items: [],
		total: 0,
	};

	order: IOrderForm = {
		email: '',
		phone: '',
		address: '',
		payment: 'card',
	};

	constructor(protected events: IEvents) {}

	setItems(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:changed', this.items);
	}

	setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:changed', this.preview);
	}

	addToBasket(item: IProduct) {
		this.basket.items.push(item.id);
		this.basket.total += item.price ?? 0;
		this.events.emit('basket:changed', this.basket);
	}

	inBasket(item: IProduct) {
		return this.basket.items.includes(item.id);
	}

	removeFromBasket(item: IProduct) {
		this.basket.items = this.basket.items.filter((id) => id !== item.id);
		this.basket.total -= item.price;
		this.events.emit('basket:changed', this.basket);
	}

	clearBasket() {
		this.basket.items = [];
		this.basket.total = 0;
		this.events.emit('basket:changed', this.basket);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		if (field === 'payment') {
			this.order.payment = value as PaymentMethod;
		} else {
			this.order[field] = value;
		}
	}

	setPayment(method: PaymentMethod) {
		this.order.payment = method;
	}

	setFormError(field: keyof IOrderForm, error: string) {
		this.formErrors[field] = error;
		this.events.emit('form:error', { field, error });
	}

	formErrors: FormErrors = {};

validateOrder(): boolean {
	this.formErrors = {}; // очистка перед валидацией

	if (!this.order.email.trim()) {
		this.setFormError('email', 'Введите email');
	} else if (!/^\S+@\S+\.\S+$/.test(this.order.email)) {
		this.setFormError('email', 'Некорректный email');
	}

	if (!this.order.phone.trim()) {
		this.setFormError('phone', 'Введите номер телефона');
	} else if (!/^\+?\d{10,15}$/.test(this.order.phone)) {
		this.setFormError('phone', 'Некорректный номер телефона');
	}

	if (this.order.payment === 'card' && !this.order.address.trim()) {
		this.setFormError('address', 'Введите адрес');
	}

	return Object.keys(this.formErrors).length === 0;
}


	

}
