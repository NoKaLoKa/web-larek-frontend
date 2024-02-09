export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: string;
}

export interface IDeliveryForm  {
    payment: string;
    adress: string;
}

export interface IOrderForm {
    email: string;
    phone: string;
}