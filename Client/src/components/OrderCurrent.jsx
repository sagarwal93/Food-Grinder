import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  favoriteOrder() {
    // const customerId = this.props.customer.get('id');
    const customerId = 1;
    const orderId = this.props.currentOrder.get('id');

    this.props.favoriteOrderForCustomer(orderId, customerId);
    this.props.showNextOrder();
  },
  rejectOrder() {
    this.props.showNextOrder();
  },
  render () {
    return <div className="row">
        <div className="col s12 m10 offset-m1">
          <div className="card">
            <div className="card-image">
              <img src="images/burger.png" />
              <span className="card-title">{this.props.currentOrder.get('name')}</span>
            </div>
            <div className="card-content">
              <p>{this.props.currentOrder.get('description')}</p>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-teal" onClick={this.rejectOrder}>
                <i className="small material-icons">delete</i>
              </a>
              <a className="waves-effect waves-teal" onClick={this.favoriteOrder}>
                <i className="small material-icons">grade</i>
              </a>
              <a className="waves-effect waves-teal teal-text right" onClick={this.favoriteOrder}>
                Order Now!
              </a>
            </div>
          </div>
        </div>
      </div>;
  }
});
