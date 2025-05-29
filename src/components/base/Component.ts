import { IEvents } from './events';

/**
 * Абстрактный базовый класс компонента
 */
export abstract class Component<T> {
	protected events?: IEvents;

	constructor(protected readonly container: HTMLElement, events?: IEvents) {
		this.events = events;
	}

	/** Переключить класс у элемента */
	 toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		element.classList.toggle(className, force);
	}

	/** Установить текстовое содержимое */
	protected setText(element: HTMLElement | null, value: unknown): void {
		if (element) {
			element.textContent = String(value ?? '');
		}
	}

	/** Установить/снять атрибут disabled */
	protected setDisabled(element: HTMLElement | null, state: boolean): void {
		if (element) {
			state ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled');
		}
	}

	/** Скрыть элемент (display: none) */
	protected setHidden(element: HTMLElement | null): void {
		if (element) {
			element.style.display = 'none';
		}
	}

	/** Показать элемент (удалить display: none) */
	protected setVisible(element: HTMLElement | null): void {
		if (element) {
			element.style.removeProperty('display');
		}
	}

	/** Установить изображение и alt */
	protected setImage(element: HTMLImageElement | null, src: string, alt?: string): void {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	/** Отрисовать компонент (с обновлением полей по данным) */
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
