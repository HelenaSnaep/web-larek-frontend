import { IProduct } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { ProductCategory } from '../utils/constants';

interface ICardPreviewActions {
	onClick: (event: MouseEvent) => void;
}

export class CardPreview extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement;
	protected _description: HTMLElement;
	protected _image: HTMLImageElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardPreviewActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._description = ensureElement<HTMLElement>('.card__text', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);

		this._button.addEventListener('click', actions.onClick);
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

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			this.setDisabled(this._button, true);
		} else {
			this.setText(this._price, `${value} синапсов`);
			this.setDisabled(this._button, false);
		}
	}

	set category(value: keyof typeof ProductCategory) {
		this.setText(this._category, value);
		this.toggleClass(
			this._category,
			`card__category_${ProductCategory[value]}`,
			true
		);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}
