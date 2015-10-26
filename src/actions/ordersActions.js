import flux from 'control';
import {createActions} from 'alt/utils/decorators';
import OrdersService from 'services/ordersService';

@createActions(flux)
class OrdersActions {
  constructor() {
    this.generateActions();
  }

  getAllowedOrders(user_token) {
  	var request = {
  		user_token: user_token
  	};
	  OrdersService.getAllowedOrders(request)
	    .then((status) => {
  			this.dispatch(status.data);
	    })
	    .catch((errorMessage) => {
	      alert(errorMessage);
	    });
  }

  removeOrder(order_id) {
  	var request = {
  		order_id: order_id
  	};
	  OrdersService.removeOrder(request)
	    .then((status) => {
  			this.dispatch(order_id);
	    })
	    .catch((errorMessage) => {
	      alert(errorMessage);
	    });
  }

}

export default OrdersActions;
