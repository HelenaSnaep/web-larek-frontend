import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { ProductCategory } from '../utils/constants';
import { IProduct } from '../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class CardMain extends Component<IProduct> {
	private _title: HTMLElement;
	private _image: HTMLImageElement;
	private _price: HTMLElement;
	private _category: HTMLElement;

	constructor(container: HTMLElement, actions: ICardActions) {
		super(container);

		this._title = ensureElement('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._price = ensureElement('.card__price', container);
		this._category = ensureElement('.card__category', container);

		this.container.addEventListener('click', actions.onClick);
	}

	render(data: IProduct): HTMLElement {
		this.setText(this._title, data.title);
		this.setText(this._price, `${data.price} синапсов`);
		this._category.className = 'card__category';

		const categoryClass = `card__category_${
			ProductCategory[data.category as keyof typeof ProductCategory]
		}`;
		this._category.classList.add(categoryClass);
		this.setImage(this._image, data.image, data.title);

		this.container.dataset.id = data.id;

		return this.container;
	}
}
