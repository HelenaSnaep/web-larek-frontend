import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { ProductCategory } from '../utils/constants';
import { IProduct } from '../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class CardMain extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;

	constructor(container: HTMLElement, protected actions: ICardActions) {
		super(container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
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
		this.setText(
			this._price,
			value !== null ? value + ' синапсов' : 'Бесценно'
		);
	}

	set category(value: keyof typeof ProductCategory) {
		this.setText(this._category, value);
		this.toggleClass(
			this._category,
			`card__category_${ProductCategory[value]}`,
			true
		);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}
}
