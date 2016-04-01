import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    const {order} = this.props;
    return <div className='col s12 m4 l6'>
      <div onClick={this.props.setCurrentOrder.bind(this, order)}
        className='card'>
        {order.get('name')}
      </div>
    </div>;
  }
});
