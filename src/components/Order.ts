import { Form } from './common/Form';
import { IOrderForm, PaymentMethod } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;
	protected _address: HTMLInputElement;
	protected _currentPayment: PaymentMethod = 'card';

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

		this._paymentCard.addEventListener('click', () => {
			this.payment = 'card';
			this.onInputChange('payment', 'card');
		});

		this._paymentCash.addEventListener('click', () => {
			this.payment = 'cash';
			this.onInputChange('payment', 'cash');
		});
	}

	set address(value: string) {
		this._address.value = value;
	}

	set payment(method: PaymentMethod) {
		this._currentPayment = method;

		this._paymentCard.classList.toggle('button_alt_active', method === 'card');
		this._paymentCash.classList.toggle('button_alt_active', method === 'cash');
	}

	get payment(): PaymentMethod {
		return this._currentPayment;
	}
}
