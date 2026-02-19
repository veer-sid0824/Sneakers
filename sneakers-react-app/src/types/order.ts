export interface OrderItem {
    id: string | number;
    name: string;
    price: number;
    image: string;
    size: string | number;
    quantity: number;
}

export interface Order {
    orderId: string;
    total: number;
    items: OrderItem[];
    date: string;
    status: 'ordered' | 'packed' | 'shipped' | 'out-for-delivery' | 'delivered';
    estimatedDelivery: string;
    customerInfo: {
        name: string;
        email: string;
        country: string;
    };
}

export const ORDER_STATUS_STEPS = [
    { id: 'ordered', label: 'Ordered', icon: '🛍️' },
    { id: 'packed', label: 'Packed', icon: '📦' },
    { id: 'shipped', label: 'Shipped', icon: '🚚' },
    { id: 'out-for-delivery', label: 'Out for Delivery', icon: '🏠' },
    { id: 'delivered', label: 'Delivered', icon: '✨' }
];
