import { IEvents } from './events';


export abstract class Component<T extends object> {
	protected events?: IEvents;

	constructor(protected readonly container: HTMLElement, events?: IEvents) {
		this.events = events;
	}

	
	protected toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		element.classList.toggle(className, force);
	}

	
	protected setText(element: HTMLElement | null, value: unknown): void {
		if (element) {
			element.textContent = String(value ?? '');
		}
	}

	protected setDisabled(element: HTMLElement | null, state: boolean): void {
		if (element) {
			state ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled');
		}
	}

	protected setHidden(element: HTMLElement | null): void {
		if (element) {
			element.style.display = 'none';
		}
	}

	
	protected setVisible(element: HTMLElement | null): void {
		if (element) {
			element.style.removeProperty('display');
		}
	}

	protected setImage(element: HTMLImageElement | null, src: string, alt?: string): void {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
