import React from 'react';
import PartnerWizardActions from 'actions/partnerWizardActions';
import connectToStores from 'alt/utils/connectToStores';
import OrderWizardStore from 'stores/orderWizardStore';
import PartnerWizardStore from 'stores/partnerWizardStore';
import Buttonpad from 'components/homeComponents/resources/buttonpad';
import {BACK, SUBMIT_ITEM_STATUS} from 'constants/stepButtonLabels';
import {PAYMENT} from 'constants/stepTitles';
import {Row, Col} from 'react-flexbox-grid';

@connectToStores
class Payment extends React.Component {
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

  getPartner() {
    return this.props.orderWizard.order.partners[this.props.orderWizard.step-1];
  }

  render() {
    var payment = this.props.orderWizard.order.paymentData;
    return (
      <section className="wizard-subbox">
        <header className="wizard-subheader">
          <h3>{PAYMENT}</h3>
        </header>
        <Row className='wizard-content'>
          <Col sm={8} md={8} className='col-sm-offset-1 col-md-offset-1'>
            <Row className='wizard-table-row'>
              <Col sm={2} md={2} className='col-sm-offset-1 col-md-offset-1'>
                <strong className='wizard-label-title'>Type</strong>
              </Col>
              <Col sm={8} md={8}>
                {payment.type}
              </Col>
            </Row>
            <Row className='wizard-table-row'>
              <Col sm={2} md={2} className='col-sm-offset-1 col-md-offset-1'>
                <strong className='wizard-label-title'>Number</strong>
              </Col>
              <Col sm={8} md={8}>
                {payment.number}
              </Col>
            </Row>
            <Row className='wizard-table-row'>
              <Col sm={2} md={2} className='col-sm-offset-1 col-md-offset-1'>
                <strong className='wizard-label-title'>Expiration Month</strong>
              </Col>
              <Col sm={8} md={8}>
                {payment.expirationMonth}
              </Col>
            </Row>
            <Row className='wizard-table-row'>
              <Col sm={2} md={2} className='col-sm-offset-1 col-md-offset-1'>
                <strong className='wizard-label-title'>Expiration Year</strong>
              </Col>
              <Col sm={8} md={8}>
                {payment.expirationYear}
              </Col>
            </Row>
            <Row className='wizard-table-row'>
              <Col sm={2} md={2} className='col-sm-offset-1 col-md-offset-1'>
                <strong className='wizard-label-title'>Name</strong>
              </Col>
              <Col sm={8} md={8}>
                {payment.name}
              </Col>
            </Row>
            <Row className='wizard-table-row'>
              <Col sm={2} md={2} className='col-sm-offset-1 col-md-offset-1'>
                <strong className='wizard-label-title'>CVV</strong>
              </Col>
              <Col sm={8} md={8}>
                {payment.cvv}
              </Col>
            </Row>
          </Col>
        </Row>
        <Buttonpad buttons={[
                    {callback: PartnerWizardActions.previousStep, text: BACK},
                    {callback: PartnerWizardActions.submitStatus.bind(PartnerWizardActions, this.getPartner().items), text: SUBMIT_ITEM_STATUS}
                  ]} />
      </section>
    )
  }
}

export default Payment;