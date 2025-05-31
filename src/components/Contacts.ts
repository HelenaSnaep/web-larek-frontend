import { Form } from './common/Form';
import { IEvents } from './base/events';
import { IOrderForm } from '../types';
import { ensureElement } from '../utils/utils';

export class Contacts extends Form<IOrderForm> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._email = ensureElement<HTMLInputElement>(
            '.form__input[name="email"]',
            container
        );
        this._phone = ensureElement<HTMLInputElement>(
            '.form__input[name="phone"]',
            container
        );
    }

    set email(value: string) {
        this._email.value = value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }
}