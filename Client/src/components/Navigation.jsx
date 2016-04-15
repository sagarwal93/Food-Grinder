import React from 'react';
import {Link} from 'react-router'; //eslint-disable-line
import AppBar from 'material-ui/lib/app-bar'; //eslint-disable-line
import IconButton from 'material-ui/lib/icon-button'; //eslint-disable-line
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'; //eslint-disable-line
import IconMenu from 'material-ui/lib/menus/icon-menu'; //eslint-disable-line
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'; //eslint-disable-line
import MenuItem from 'material-ui/lib/menus/menu-item'; //eslint-disable-line

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleToggle() {
    this.setState({open: !this.state.open});
  }
  render() {
    return (
      <AppBar
        title="Chewsier"
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        }
      />
      // <nav className="deep-orange" role="navigation">
      //   <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Chewsier</a>
      //     <ul className="right hide-on-med-and-down">
      //       <li><Link to='order'>Current Order</Link></li>
      //       <li><Link to='orders'>Orders</Link></li>
      //       <li><Link to='login'>Login</Link></li>
      //     </ul>
      //     <ul id="nav-mobile" className="side-nav">
      //       <li><a href="#">Navbar Link</a></li>
      //     </ul>
      //     <a href="#" data-activates="nav-mobile" className="button-collapse">
      // <i className="material-icons">menu</i></a>
      //   </div>
      // </nav>
    );
  }
}

export default Navigation;
