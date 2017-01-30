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
        <div className="container main_header">
          <div className="left-header">

          <Glyphicon glyph="menu-hamburger" onClick={this.handleOpen}  />
          <NavLink to="/" onlyActiveOnIndex>
            <Logo /></NavLink>
            <div className="direktori"><NavLink to="/categorylist">{this.props.title}</NavLink></div>
            <p>{this.props.subTitle}</p>
          </div>
          <div className="right-header">
            {/*<Search/>*/}
            <NavLink to="/search">Search</NavLink>
          </div>
        </div>
        <Drawer open={this.state.active} width={250} onChange={open => this.setState({ active: open})}>
          <div className="drawer_wrap">
            <div className="container">
              <div className="header-drawer push _pushtop">
                <p><strong className="welcome">Selamat Datang!</strong><br/>
                <span className="pull _top _bottom block ">Belanja Lebih Cepat, lacak pesanan, dan dapatkan promo ekslusif</span>
                
                <NavLink className="text_center block login_link pull _top _bottom"> Daftar / Masuk ke akun Orami</NavLink> </p>
                
              </div>
            </div>
            <hr/>
            <div className="container">
              <ul>
                <li className="push _pushtop _pushbottom">Beranda</li>
                <li className="push _pushtop _pushbottom">Pesanan Saya</li>
                <li className="push _pushtop _pushbottom">Daftar Belanja</li>
              </ul>
            </div>
            <hr/>
            <div className="container">
              <ul>
                <li className="push _pushtop _pushbottom">Kategori Belanja</li>
                <li className="push _pushtop _pushbottom">Zona Diskon</li>
                <li className="push _pushtop _pushbottom">Pilihan Editor</li>
              </ul>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
});

export default PageHeader;