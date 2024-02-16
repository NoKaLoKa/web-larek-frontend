export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IDeliveryForm {
	payment: string;
	address: string;
}

export interface IContactForm {
	email: string;
	phone: string;
}

export interface IOrder extends IDeliveryForm, IContactForm {
	total: number;
	items: string[];
}

export interface IOrderResult {
	total: number;
	id: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface ICard extends IProduct {
	index?: string;
	buttonTitle?: string;
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
}
