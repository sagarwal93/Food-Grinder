import React from 'react';
import {Link} from 'react-router'; //eslint-disable-line
import AppBar from 'material-ui/lib/app-bar'; //eslint-disable-line
import LeftNav from 'material-ui/lib/left-nav'; //eslint-disable-line
import IconButton from 'material-ui/lib/icon-button'; //eslint-disable-line
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'; //eslint-disable-line
import IconMenu from 'material-ui/lib/menus/icon-menu'; //eslint-disable-line
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'; //eslint-disable-line
import MenuItem from 'material-ui/lib/menus/menu-item'; //eslint-disable-line

class Navigation extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      open: false
    };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return <div style={{width: '100%', height: '100%'}}
      onClick={() => this.handleClose}>
      <AppBar title="Chewsier" />
    </div>;
  }
}

export default Navigation;
