import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {List} from 'immutable';
import {Link} from 'react-router'; //eslint-disable-line
import AppBar from 'material-ui/lib/app-bar'; //eslint-disable-line
import Badge from 'material-ui/lib/badge'; //eslint-disable-line
import IconButton from 'material-ui/lib/icon-button'; //eslint-disable-line
import FontIcon from 'material-ui/lib/font-icon'; //eslint-disable-line

export const Navigation = React.createClass({
  render () {
    const favorites = this.props.favorites.toJS().length || 0;
    return <div style={{width: '100%', height: '100%'}}>
      <AppBar
        title='Chewsier'
        showMenuIconButton={false}
        iconElementRight={
          <Badge badgeContent={favorites} primary={true} style={{padding: '8px 8px 0 0'}}>
            <Link to='orders'>
              <IconButton touch={true}>
                <FontIcon className="material-icons">favorites</FontIcon>
              </IconButton>
            </Link>
          </Badge>}
        />
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    favorites: state.getIn(['customer', 'favoriteOrders'], new List())
  };
}

export const NavigationContainer =
  connect(mapStateToProps, actionCreators)(Navigation);
