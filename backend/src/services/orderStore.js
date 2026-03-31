const ORDER_STATUS_STEPS = ['ordered', 'packed', 'shipped', 'out-for-delivery', 'delivered'];
const STATUS_ADVANCE_MS = 8000;

const orders = new Map();

const createOrderId = () => Math.random().toString(36).slice(2, 11).toUpperCase();

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const deriveStatus = (createdAt) => {
  const elapsed = Date.now() - createdAt.getTime();
  const index = Math.min(Math.floor(elapsed / STATUS_ADVANCE_MS), ORDER_STATUS_STEPS.length - 1);
  return ORDER_STATUS_STEPS[index];
};

const getEstimatedDeliveryDate = () => {
  const estimated = new Date();
  estimated.setDate(estimated.getDate() + 5);
  return formatDate(estimated);
};

const normalizeOrderForResponse = (order) => ({
  ...order,
  status: deriveStatus(order.createdAt),
});

const createOrder = ({ total, items, customerInfo }) => {
  const createdAt = new Date();

  const order = {
    orderId: createOrderId(),
    total,
    items,
    date: formatDate(createdAt),
    status: 'ordered',
    estimatedDelivery: getEstimatedDeliveryDate(),
    customerInfo,
    createdAt,
  };

  orders.set(order.orderId, order);

  return normalizeOrderForResponse(order);
};

const findOrderById = (orderId) => {
  const order = orders.get(orderId);
  if (!order) {
    return null;
  }

  return normalizeOrderForResponse(order);
};

module.exports = {
  ORDER_STATUS_STEPS,
  createOrder,
  findOrderById,
};
