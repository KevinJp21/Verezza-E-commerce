import './CustomerOrders.css'
import { truckIcon, pendingIcon, cancelIcon } from '../../assets/icons/icons'

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
            images: {
                nodes: Array<{
                    url: string;
                }>;
            };
        };
    };
}

interface Order {
    id: string;
    name: string;
    processedAt: string;
    fulfillmentStatus: string;
    canceledAt: string;
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
        <section className="customerOrdersContainer">
            <h1 className='customerOrdersTitle'>Pedidos</h1>
            <ul className="orderList">
                {customer.orders.edges.map(({ node: order }) => (
                    <li className="orderItem" key={order.id}>
                        <div className="orderItemContent">
                            <div className="orderStatus">
                                {order.canceledAt !== null ? cancelIcon() : order.fulfillmentStatus === 'FULFILLED' ? truckIcon() : pendingIcon()}
                                <span>{order.canceledAt !== null ? 'Cancelado' : order.fulfillmentStatus === 'FULFILLED' ? 'En camino' : 'Pendiente'} - {new Date(order.processedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="orderImages">
                                {order.lineItems.edges.map(({ node: item }) => (
                                    item.variant.product.images.nodes.map((image, index) => (
                                        <picture key={`${item.variant.product.title}-${index}`} className='orderItemImage'>
                                            <img
                                                src={image.url}
                                                alt={`${item.variant.product.title} - Imagen ${index + 1}`}
                                                height={100}
                                            />
                                        </picture>
                                    ))
                                ))}
                            </div>
                            <div className="orderDetails">
                                <div className="orderItemCount"><span>{order.lineItems.edges.reduce((total, item) => total + item.node.quantity, 0)} Articulos</span></div>
                                <div className="orderNumber"><span>Pedido: {order.name}</span></div>
                                <div className="orderPrice"><span>{parseFloat(order.totalPrice.amount).toLocaleString('es-ES', { style: 'currency', currency: order.totalPrice.currencyCode, minimumFractionDigits: 0 })}</span></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
