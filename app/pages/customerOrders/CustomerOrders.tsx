import './CustomerOrders.css'

interface OrderItem {
  title: string;
  quantity: number;
  variant: {
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
    };
  };
}

interface Order {
  id: string;
  name: string;
  processedAt: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: OrderItem;
    }>;
  };
}

interface CustomerData {
  customer: {
    firstName: string;
    lastName: string;
    orders: {
      edges: Array<{
        node: Order;
      }>;
    };
  };
}

export default function CustomerOrders({ data }: { data: CustomerData }) {
  const { customer } = data;

  if (!customer) {
    return <div>No se encontraron datos del cliente</div>;
  }

  return (
    <div>
      <h1>Pedidos de {customer.firstName} {customer.lastName}</h1>
      {customer.orders.edges.map(({ node: order }) => (
        <div key={order.id} className="order">
          <h2>Pedido: {order.name}</h2>
          <p>Fecha: {new Date(order.processedAt).toLocaleDateString()}</p>
          <p>Total: {order.totalPrice.amount} {order.totalPrice.currencyCode}</p>
          <h3>Productos:</h3>
          <ul>
            {order.lineItems.edges.map(({ node: item }) => (
              <li key={item.variant.product.title}>
                {item.title} - Cantidad: {item.quantity} - Precio: {item.variant.price.amount} {item.variant.price.currencyCode}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
