import React from 'react';
import WizardFlux from 'components/homeComponents/fluxes/wizardFlux';
import PartnerWizardActions from 'actions/partnerWizardActions';
import OrderWizardActions from 'actions/orderWizardActions';
import PartnerWizardStep from 'components/homeComponents/steps/general/partnerWizardStep';
import connectToStores from 'alt/utils/connectToStores';
import PartnerWizardStore from 'stores/partnerWizardStore';
import OrderWizardStore from 'stores/orderWizardStore';
import Utilities from 'utilities/utilities';
import {Grid, Row, Col} from 'react-flexbox-grid';

@connectToStores
class PartnerWizardFlux extends WizardFlux {
  constructor(props) {
    super(props);
  }

  static getStores(props) {
    return [PartnerWizardStore, OrderWizardStore];
  }

  static getPropsFromStores(props) {
    var state = PartnerWizardStore.getState();
    state.orderWizard = OrderWizardStore.getState();
    return state;
  }

  getWizardActions() {
    return PartnerWizardActions;
  }

  getButtonpadCallbacks() {
    return {
      previousStep: PartnerWizardActions.previousStep,
      nextStep: PartnerWizardActions.nextStep,
      closeWizard: PartnerWizardActions.closeWizard,
      cancelChanges: PartnerWizardActions.cancelChanges.bind(PartnerWizardActions, this.props.orderWizard.step-1),
      submitItemsStatus: this.submitItemsStatus
    }
  }

  submitItemsStatus = evt => {
    //Go directly to Last Step = Q(items) + S&B + Payment + Result Message
    this.submitStatus(this.getPartner().items.length+3);
    PartnerWizardActions.submitItemsStatus(this.getPartner().items);
  }

  getPartner() {
    return this.props.orderWizard.order.partners[this.props.orderWizard.step-1];
  }

	render() {
    return (
      <Grid>
        <Row>
          <Col>
            <h2>Partner: {this.getPartner().name}</h2>
          </Col>
          <Col md-offset={1} md={10}>
            <PartnerWizardStep callbacks={this.getButtonpadCallbacks()} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default PartnerWizardFlux;
