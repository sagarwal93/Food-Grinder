import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  rejectOrder() {
    this.props.showNextOrder();
  },
  render () {
    return <div className="current-order">
      <div>
        {this.props.currentOrder.get('name')}
      </div>
      <div>
        {this.props.currentOrder.get('description')}
      </div>
      <div>
        {this.props.currentOrder.get('price')}
      </div>
      <button onClick={this.rejectOrder}>No</button>
      <button>Yes</button>
      <button>Order Now</button>
    </div>;
  }
});
