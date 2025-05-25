import { IProduct } from "../types";
import {Component} from "./base/Component";


interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    protected _image?: HTMLImageElement;
    protected _title: HTMLHeadingElement;
    protected _price: HTMLSpanElement;
    protected _description: HTMLParagraphElement;
    protected _category?: HTMLSpanElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions: ICardActions) {
        super(container);

        this._image = container.querySelector('.card__image');
        this._title = container.querySelector('.card__title') as HTMLHeadingElement;
        this._price = container.querySelector('.card__price') as HTMLSpanElement;
        this._description = container.querySelector('.card__description') as HTMLParagraphElement;
        this._category = container.querySelector('.card__category') as HTMLSpanElement;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;

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
        this._title.textContent = value;
    }
}