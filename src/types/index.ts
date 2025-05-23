
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string;
  category: string;
}


export interface IBasket {
  item: string[];
  total: number;
}


export type PaymentMethod = 'cash' | 'card';



export interface IOrderForm {
	email: string;
	phone: string;
	address: string;
	payment: 'онлайн' | 'при получении';
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;


export interface IOrderResult {
	id: string;
    total: number;
}