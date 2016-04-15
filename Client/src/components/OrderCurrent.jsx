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
  showNextOrder() {
    this.props.nextOrder();
  },
  render () {
    const order = this.props.currentOrder.toJS();
    const styles = {
      favoriteButton: {
        margin: '0px 0 0 0',
        minWidth: '40px',
        color: '#999'
      },
      deleteButton: {
        margin: '0px 0 0 0',
        minWidth: '60px',
        width: '60px',
        color: '#999'
      },
      orderNowButton: {
        margin: '0px 0 0 0',
        width: '60%',
        backgroundColor: '#33CC33'
      },
      img: {
        // height: '300px'
      }
    };
    return <Card>
      <CardMedia style={styles.test}>
        <img src={order.image} style={styles.img}/>
      </CardMedia>
      <CardActions style={{
        textAlign: 'center'
      }}>
        <FlatButton style={styles.deleteButton} onClick={this.showNextOrder}
          icon={<FontIcon className="material-icons">thumb_down</FontIcon>}/>
        <RaisedButton label="Order Now" style={styles.orderNowButton} backgroundColor='#FF5722'labelColor='#FFFFFF'/>
        <FlatButton style={styles.favoriteButton} onClick={this.favoriteOrder}
          icon={<FontIcon className="material-icons">thumb_up</FontIcon>} />
      </CardActions>
      <CardTitle title={order.name} subtitle={order.company} />

      <CardText expandable={false}>
        {order.description}
      </CardText>
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
