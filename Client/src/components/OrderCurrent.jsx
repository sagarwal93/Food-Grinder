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
import IconButton from 'material-ui/lib/icon-button'; //eslint-disable-line

export default React.createClass({
  mixins: [PureRenderMixin],
  favoriteOrder() {
    this.props.favoriteOrderForCustomer(this.props.currentOrder);
    this.props.nextOrder();
  },
  showNextOrder() {
    this.props.nextOrder();
  },
  render () {
    const order = this.props.currentOrder.toJS();
    const styles = {
      favoriteButton: {
        color: '#999',
        fontSize: '26pt'
      },
      deleteButton: {
        color: '#999',
        fontSize: '26pt'
      },
      orderNowButton: {
        width: '60%',
        backgroundColor: '#33CC33'
      },
      img: {
        // height: '300px'
      }
    };
    return <div>
      <Card style={{maxWidth: '600px'}} >
      <CardMedia style={styles.test}>
        <img src={order.image} style={styles.img}/>
      </CardMedia>
      <CardActions style={{textAlign: 'center'}}>
        <IconButton tooltip='Not Interested' iconStyle={styles.deleteButton} style={{width: '60px', height: '60px'}}
          onClick={this.showNextOrder}>
          <FontIcon className='material-icons'>clear</FontIcon>
        </IconButton>
        <RaisedButton label='Order Now!' style={styles.orderNowButton} backgroundColor='#FF5722'labelColor='#FFFFFF'/>
        <IconButton tooltip='Favorite' iconStyle={styles.favoriteButton} style={{width: '60px', height: '60px'}}
          onClick={this.favoriteOrder}>
          <FontIcon className='material-icons'>favorite_border</FontIcon>
        </IconButton>
      </CardActions>
      <CardTitle title={order.name} subtitle={order.company} />
      <CardText expandable={false}>
        {order.description}
      </CardText>
    </Card></div>;
  }
});
