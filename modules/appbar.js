/*import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Logo from './Logo.js';
import Drawer from 'react-toolbox/lib/drawer';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Button, IconButton } from 'react-toolbox/lib/button'; // Bundled component import

var DrawerTest = React.createClass ({
  constructor(props) {
    state = {
      active: false
    }
  },

  handleToggle : function() {
    this.setState({active: !this.state.active});
  },

  render: function() {
    return (
      <div>
        <IconButton icon='more_vert' raised accent onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
        </Drawer>
      </div>
    );
  }
});
export default React.createClass({
  render() {

    return (
      <AppBar  theme={theme} >
          <DrawerTest/>
        <Logo /> App Example
        {children}
          
      </AppBar>
    )
  }
})
*/
