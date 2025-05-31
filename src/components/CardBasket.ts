import { IProduct } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

interface ICardBasketActions {
	onDelete: (event: MouseEvent) => void;
}

export class CardBasket extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions: ICardBasketActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._button.addEventListener('click', actions.onDelete);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: string) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
		if (this._button) {
			this._button.disabled = !value;
		}
	}

	set index(value: number) {
		this.setText(this._index, String(value));
	}
}
