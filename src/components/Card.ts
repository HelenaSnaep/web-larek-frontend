import { IProduct } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { ProductCategory } from '../utils/constants';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
	protected _image?: HTMLImageElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _category?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardActions) {
		super(container);

		this._image = container.querySelector('.card__image');
		this._title = ensureElement<HTMLElement>('.card__title', container);

		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._description = container.querySelector('.card__text') as HTMLElement;
		this._category = container.querySelector('.card__category') as HTMLElement;
		this._button = container.querySelector(
			'.card__button'
		) as HTMLButtonElement;

		if (actions.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				this.container.addEventListener('click', actions.onClick);
			}
		}
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

	get title(): string {
		return this._title.textContent || '';
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: keyof typeof ProductCategory) {
		if (this._category) {
			this.setText(this._category, value);
			const categoryStyle = `card__category_${ProductCategory[value]}`;
			this.toggleClass(this._category, categoryStyle, true);
		}
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			this.setDisabled(this._button, true);
		} else {
			this.setText(this._price, value.toString() + ' синапсов');
			this.setDisabled(this._button, false);
		}
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

}
