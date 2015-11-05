import React from 'react';
import OrderWizardStepbar from 'components/homeComponents/orderWizardComponents/parts/orderWizardStepbar';
import OrderWizardStep from 'components/homeComponents/orderWizardComponents/parts/orderWizardStep';
import OrderWizardFluxButtonpad from 'components/homeComponents/orderWizardComponents/parts/orderWizardFluxButtonpad';
import {SUCCESS} from 'constants/orderWizardSteps';

require('../../../styles/simpleForm.styl');

class OrderWizardFlux extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      step : 1
    };
  }

  nextStep = evt => {
    this.setState({
      step : this.state.step + 1
    })
  }

  previousStep = evt => {
    this.setState({
      step : this.state.step - 1
    })
  }

  submitChanges = evt => {
    this.props.submitChanges();
    this.setState({
      step : SUCCESS
    })
  }

  goToStep = evt => {
    this.setState({
      step : Number(evt.target.name)
    })
  }

  getButtonpadCallbacks() {
    return {
      previousStep: this.previousStep,
      nextStep: this.nextStep,
      submitChanges: this.submitChanges,
      closeWizard: this.props.closeWizard,
      cancelChanges: this.props.cancelChanges
    };
  }

  render() {
    return (
      <main>
        <OrderWizardStepbar step={this.state.step}
                            goToStep={this.goToStep} />
        <OrderWizardStep step={this.state.step}
                         order={this.props.order} />
        <OrderWizardFluxButtonpad step={this.state.step}
                                  callbacks={this.getButtonpadCallbacks()} />
      </main>
    )
  }

}

export default OrderWizardFlux;