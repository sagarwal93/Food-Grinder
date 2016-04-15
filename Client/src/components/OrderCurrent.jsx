import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Card from 'material-ui/lib/card/card'; //eslint-disable-line
import CardActions from 'material-ui/lib/card/card-actions'; //eslint-disable-line
import CardHeader from 'material-ui/lib/card/card-header'; //eslint-disable-line
import CardMedia from 'material-ui/lib/card/card-media'; //eslint-disable-line
import CardTitle from 'material-ui/lib/card/card-title'; //eslint-disable-line
import FlatButton from 'material-ui/lib/flat-button'; //eslint-disable-line
import CardText from 'material-ui/lib/card/card-text'; //eslint-disable-line
import RaisedButton from 'material-ui/lib/raised-button'; //eslint-disable-line
import FontIcon from 'material-ui/lib/font-icon'; //eslint-disable-line

export default React.createClass({
  mixins: [PureRenderMixin],
  favoriteOrder() {
    this.props.favoriteOrderForCustomer(this.props.currentOrder);
    this.props.showNextOrder();
  },
  rejectOrder() {
    this.props.showNextOrder();
  },
  render () {
    const order = this.props.currentOrder.toJS();
    const styles = {
      fullwidth: {
        margin: '20px 0 0 0',
        width: '100%'
      },
      halfwidth: {
        width: '46%'
      }
    };
    return <Card>
      <CardMedia
        overlay={<CardTitle title={order.name} subtitle={order.company} />}
      >
        <img src={order.image} />
      </CardMedia>
      <CardText expandable={false}>
        {order.description}
      </CardText>
      <CardActions>
        <FlatButton onClick={this.rejectOrder}
          secondary={true} style={styles.halfwidth}
          icon={<FontIcon className="material-icons">delete_forever</FontIcon>}/>
        <FlatButton onClick={this.favoriteOrder}
          style={styles.halfwidth}
          icon={<FontIcon className="material-icons">favorite</FontIcon>} />
        <br/>
        <RaisedButton label="Order Now" primary={true} style={styles.fullwidth} />
      </CardActions>
    </Card>;
    // return <div className="row">
    //     <div className="col s12 m10 offset-m1">
    //       <div className="card">
    //         <div className="card-image">
    //           <img src="images/burger.png" />
    //         </div>
    //         <div className="card-content">
    //           <span className="card-title">
    //             {this.props.currentOrder.get('name')}
    //             <i className="material-icons right">more_vert</i>
    //           </span>
    //           <span className="card-title grey-text right">
    //             ${this.props.currentOrder.get('price')}
    //           </span>
    //           <p>{this.props.currentOrder.get('description')}</p>
    //         </div>
    //         <div className="card-action">
    //           <a className="waves-effect waves-teal" onClick={this.rejectOrder}>
    //             <i className="small material-icons">delete</i>
    //           </a>
    //           <a className="waves-effect waves-teal" onClick={this.favoriteOrder}>
    //             <i className="small material-icons">grade</i>
    //           </a>
    //           <a className="waves-effect waves-teal teal-text right" onClick={this.favoriteOrder}>
    //             Order Now!
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>;
  }
});
