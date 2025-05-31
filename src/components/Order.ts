import { Form } from './common/Form';
import { IOrderForm, PaymentMethod } from '../types';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._address = ensureElement<HTMLInputElement>(
			'.form__input[name="address"]',
			container
		);

		this._paymentCard = ensureElement<HTMLButtonElement>(
			'.button_alt[name="card"]',
			container
		);
		this._paymentCash = ensureElement<HTMLButtonElement>(
			'.button_alt[name="cash"]',
			container
		);

		// Слушатели выбора оплаты
		this._paymentCard.addEventListener('click', () => {
			this.setPayment('card');
		});

		this._paymentCash.addEventListener('click', () => {
			this.setPayment('cash');
		});

		// Слушатель изменения адреса
		this._address.addEventListener('input', () => {
			this.onInputChange('address', this._address.value);
		});
	}

	// Метод установки активного способа оплаты и эмита события
	setPayment(method: PaymentMethod) {
		this.payment = method;
		this.onInputChange('payment', method);
	}

	set address(value: string) {
		this._address.value = value;
	}

	set payment(method: PaymentMethod) {
		if (method === 'card') {
			this._paymentCard.classList.add('button_alt_active');
			this._paymentCash.classList.remove('button_alt_active');
		} else {
			this._paymentCash.classList.add('button_alt_active');
			this._paymentCard.classList.remove('button_alt_active');
		}
	}
}
