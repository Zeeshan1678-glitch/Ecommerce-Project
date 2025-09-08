import { useState ,useEffect, Fragment} from "react";
import dayjs from "dayjs";
import axios  from "axios";
import "./header.css"
import "./OrdersPage.css"

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data);
            });
    }, []);

    return (
        <>
          <title>Orders</title>
            <div className="header">
            <div className="left-section">
                <a href="/" className="header-link">
                <img className="logo"
                    src="images/logo-white.png" />
                <img className="mobile-logo"
                    src="images/mobile-logo-white.png" />
                </a>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />

                <button className="search-button">
                <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <a className="orders-link header-link" href="/orders">

                <span className="orders-text">Orders</span>
                </a>

                <a className="cart-link header-link" href="/checkout">
                <img className="cart-icon" src="images/icons/cart-icon.png" />
                <div className="cart-quantity">{cart.length}</div>
                <div className="cart-text">Cart</div>
                </a>
            </div>
            </div>

            <div className="orders-page">
            <div className="page-title">Your Orders</div>

            <div className="orders-grid">
                {orders.map((order)=>{
                    return(
                         <div key={order.id} className="order-container">

                <div className="order-header">
                    <div className="order-header-left-section">
                    <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.estimatedDeliveryTimeMS).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>${(order.priceCents / 100).toFixed(2)}</div>
                    </div>
                    </div>

                    <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                    </div>
                </div>

                <div className="order-details-grid">
                    {order.products.map((orderProduct) => {
                        return(
                            <Fragment key={orderProduct.product.id}>
                              <div className="product-image-container">
                    <img src={orderProduct.product.image} />
                    </div>

                    <div className="product-details">
                    <div className="product-name">
                        {orderProduct.product.name}
                    </div>
                    <div className="product-delivery-date">
                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMS).format('MMMM D')}
                    </div>
                    <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                    </div>
                    <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                        <span className="buy-again-message">Add to Cart</span>
                    </button>
                    </div>

                    <div className="product-actions">
                    <a href="/tracking">
                        <button className="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
                    </Fragment>
                        )
                    })}
                   
                </div>
                </div>

                    )

                })}



            </div>
            </div>
        </>
    );
}