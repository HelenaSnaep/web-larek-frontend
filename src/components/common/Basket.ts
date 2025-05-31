import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { IBasket } from '../../types';
import { createElement } from '../../utils/utils';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price') as HTMLElement;
		this._button = this.container.querySelector(
			'.basket__button'
		) as HTMLElement;

		this._button.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this._button.removeAttribute('disabled');
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this._button.setAttribute('disabled', 'true');
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}
}
