/******************************************************************************
PRECOND: this.props.buttons should have an array of objects with the following
structure: {callback: this.nextStep, text: 'Continue'}
POSCOND: render returns the specified buttons with the associated callback on
the onClick event
******************************************************************************/

import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

class Buttonpad extends React.Component {
  render() {
  	var key = 1;
    return (
      <Row className='end-md'>
				{this.props.buttons.map(function(button){
          if (button.type === undefined) {
            button.type = 'secondary';
          }
		   		return (
            <Col>
              <button className={'button-'+button.type} key={key++} onClick={button.callback}>
                {button.text}
              </button>
            </Col>
          )
				})}
			</Row>
    )
  }
}

export default Buttonpad;