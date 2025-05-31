
export interface IProduct {
	id: string;
	title: string;
	price: number | null;
	description?: string;
	image?: string;
	category?: string;
	index?: number;
}



export interface IBasket {
  items: string[];
  total: number;
}


export type PaymentMethod = 'cash' | 'card';



export interface IOrderForm {
	email: string;
	phone: string;
	address: string;
	payment: PaymentMethod;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;


export interface IOrderResult {
	id: string;
    total: number;
}