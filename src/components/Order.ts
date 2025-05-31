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
			this.container
		);

		this._paymentCard = ensureElement<HTMLButtonElement>(
			'.button_alt[name="card"]',
			this.container
		);
		this._paymentCash = ensureElement<HTMLButtonElement>(
			'.button_alt[name="cash"]',
			this.container
		);

		this._paymentCard.addEventListener('click', () => {
			this.setPayment('card');
		});

		this._paymentCash.addEventListener('click', () => {
			this.setPayment('cash');
		});

		this._address.addEventListener('input', () => {
			this.onInputChange('address', this._address.value);
		});
	}

	setPayment(method: PaymentMethod) {
		this._paymentCard.classList.toggle('button_alt-active', method === 'card');
		this._paymentCash.classList.toggle('button_alt-active', method === 'cash');
		this.onInputChange('payment', method);
	}

	set address(value: string) {
		this._address.value = value;
	}

}
