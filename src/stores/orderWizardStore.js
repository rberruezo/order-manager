import flux from 'control';
import {createStore, bind} from 'alt/utils/decorators';
import OrderWizardActions from 'actions/orderWizardActions';
import {NONE, SUCCESS, FAIL} from 'constants/apiCallStatus';

@createStore(flux)
class OrderWizardStore {

  constructor() {
    this.step = 1;
    this.result = NONE;
  }

  @bind(OrderWizardActions.submitOrderStatus)
  submitOrderStatus(response) {
    this.result = ("errorMessage" in response) ? FAIL : SUCCESS;
  }

  @bind(OrderWizardActions.updateStep)
  updateStep(step) {
    this.step = step;
  }

}

export default OrderWizardStore;
