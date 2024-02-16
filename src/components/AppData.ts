import { Model } from './base/Model';
import { IProduct, IDeliveryForm, IContactForm, IOrder, FormErrors } from '../types';

export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	preview: string | null;
	delivery: IDeliveryForm | null;
	contact: IContactForm | null;
	order: IOrder | null;
}

export type CatalogChangeEvent = {
	catalog: IProduct[];
};

export class AppState extends Model<IAppState> {
	catalog: IProduct[];
	basket: IProduct[] = [];
	order: IOrder = {
		payment: 'online',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

	clearBasket() {
		this.basket = [];
		this.updateBasket();
	}

	clearOrder() {
		this.order = {
			payment: 'online',
			address: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
	}

	setCard(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addProduct(item: IProduct) {
		if (this.basket.indexOf(item) < 0) {
			this.basket.push(item);
			this.updateBasket();
		}
	}

	removeProduct(item: IProduct) {
		this.basket = this.basket.filter((it) => it != item);
		this.updateBasket();
	}

	updateBasket() {
		this.emitChanges('counter:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	setDeliveryField(field: keyof IDeliveryForm, value: string) {
		this.order[field] = value;
        
		if (this.validateDelivery()) {
			this.events.emit('delivery:ready', this.order);
		}
	}

	setContactField(field: keyof IContactForm, value: string) {
		this.order[field] = value;

		if (this.validateContact()) {
			this.events.emit('contact:ready', this.order);
		}
	}

	validateDelivery() {
		const errors: typeof this.formErrors = {};
		const deliveryRegex = /^[а-яА-ЯёЁ0-9\s\/.,-]{10,}$/;

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		} else if (!deliveryRegex.test(this.order.address)) {
			errors.address =
				'Адрес должен состоять как минимум из 10 символов и может содержать только кириллицу, цифры, пробелы и символы ".,/"';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	validateContact() {
		const errors: typeof this.formErrors = {};
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const phoneRegex = /^\+7[0-9]{10}$/;

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		} else if (!emailRegex.test(this.order.email)) {
			errors.email = 'Неправильно указан адрес электронной почты';
		}

		if (this.order.phone.startsWith('89')) {
			this.order.phone = '+79' + this.order.phone.slice(2);
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else if (!phoneRegex.test(this.order.phone)) {
			errors.phone =
				'Неправильно указан номера телефона (+79XXXXXXXXX или 89XXXXXXXXX)';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}
}
