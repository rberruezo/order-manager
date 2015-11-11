import flux from 'control';
import {createStore, bind} from 'alt/utils/decorators';
import OrdersActions from 'actions/ordersActions';
import Mocks from 'mocks/mocks';

@createStore(flux)
class OrdersStore {

  constructor() {
    this.orders = Mocks.getAllowedOrders().orders;
  }

  @bind(OrdersActions.getAllowedOrders)
  getAllowedOrders(orders) {
    this.orders = orders;
  }

  @bind(OrdersActions.dequeueOrder)
  dequeueOrder(order) {
    this.dequeuedOrder = order;
  }

  @bind(OrdersActions.deselectOrder)
  deselectOrder() {
    delete this.dequeuedOrder;
  }

  @bind(OrdersActions.submitOrderStatus)
  submitOrderStatus(response) {
    this.orders[response.id].status = response.status;
  }

}

export default OrdersStore;
