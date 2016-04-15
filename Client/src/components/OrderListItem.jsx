import React from 'react';
import Card from 'material-ui/lib/card/card'; //eslint-disable-line
import CardActions from 'material-ui/lib/card/card-actions'; //eslint-disable-line
import CardHeader from 'material-ui/lib/card/card-header'; //eslint-disable-line
import CardMedia from 'material-ui/lib/card/card-media'; //eslint-disable-line
import CardTitle from 'material-ui/lib/card/card-title'; //eslint-disable-line
import FlatButton from 'material-ui/lib/flat-button'; //eslint-disable-line
import CardText from 'material-ui/lib/card/card-text'; //eslint-disable-line
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    const {order} = this.props;
    return <Card>
    <CardMedia
      overlay={<CardTitle title={order.get('name')} subtitle="Overlay subtitle" />}
    >
      <img src="http://lorempixel.com/600/337/nature/" />
    </CardMedia>
  </Card>;
  }
});
