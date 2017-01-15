import React,{ PropTypes }  from 'react'
import NavLink from './NavLink'
import Search from './Search'
import Drawer from 'react-motion-drawer'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import Logo from './Logo.js';
var PageHeader = React.createClass({
  getInitialState: function() {
    return {active: false};
  },
  handleOpen : function() {
    this.setState({active: !this.state.active});
    console.log(this.state.active)
  },
  render() {
    return (
      <div className="header" id="content">
        <div className="container">
          <div className="left-header">

          <Glyphicon glyph="menu-hamburger" onClick={this.handleOpen}  />
          <NavLink to="/" onlyActiveOnIndex>
            <Logo /></NavLink>
            <div className="direktori"><NavLink to="/repos">{this.props.title}</NavLink></div>
            <p>{this.props.subTitle}</p>
          </div>
          <div className="right-header">
            {/*<Search/>*/}
            <NavLink to="/search">Search</NavLink>
          </div>
        </div>
        <Drawer open={this.state.active}  onChange={open => this.setState({ active: open})}>
          <div className="drawer_wrap">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Settings</li>
          </ul>
          </div>
        </Drawer>
      </div>
    );
  }
});

export default PageHeader;