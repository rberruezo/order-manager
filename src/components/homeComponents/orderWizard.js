import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import OrdersStore from 'stores/ordersStore';
import OrdersActions from 'actions/ordersActions';
import Utilities from 'utilities/utilities';
import OrderWizardFlux from 'components/homeComponents/orderWizardComponents/orderWizardFlux';

var originalOrder = {};

@connectToStores
class OrderWizard extends React.Component {

	constructor(props) {
    super(props);
    Utilities.copyObjectAttributes(originalOrder, props.dequeuedOrder);
    this.state = {
      dequeuedOrder: props.dequeuedOrder
    };
  }

  static getStores(props) {
    return [OrdersStore];
  }

  static getPropsFromStores(props) {
    return OrdersStore.getState();
  }

  render() {
  	var order = this.state.dequeuedOrder;
    return (
      <OrderWizardFlux order={order}
      								 cancelChanges={this.cancelChanges}
                       closeWizard={this.closeWizard}
      								 submitChanges={this.submitChanges} />
    );
  }

  cancelChanges = evt => {
  	Utilities.copyObjectAttributes(this.props.dequeuedOrder, originalOrder);
    OrdersActions.deselectOrder();
  }

  closeWizard = evt => {
    OrdersActions.deselectOrder();
  }

  submitChanges = evt => {
    OrdersActions.submitOrder(this.props.dequeuedOrder);
  }

  handleChange = evt => {
  	this.props.dequeuedOrder[evt.target.name] = evt.target.value;
    this.setState(this.props.dequeuedOrder);
  }

}

export default OrderWizard;