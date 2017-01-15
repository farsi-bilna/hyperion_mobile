import React from 'react'
import NavLink from './NavLink'
//import list-product-horizontal from './NavLink'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { Link } from 'react-router'
import Fetch from 'react-fetch'

var Product = React.createClass({

  render: function() {
    let newlabel = null;
    if (this.props.new) {
      newlabel = <span className="prod-att new-product">New</span>
    }
    return (
      <li className="prod-widget-horizontal">
      <div className="prod-image">
      <img className="image" src={this.props.image}/>
      </div>
      <div className="wrap-right-area">
        {newlabel}
        <div className="prod-name">
        	<NavLink to={'/product/'+this.props.productId}>
          	{this.props.productname}
          </NavLink>
        </div>
          <span className="widget-price"><p className="price">Rp. {this.props.price}</p></span>
          <div className="star-product">
            <div className="wrap-star">
            <Glyphicon glyph="star" />
            </div>
            <div className="total-review">{this.props.rating}</div>
          </div>
      </div>
      </li>
    );
  }
});

var ProductBox = React.createClass({
  /*loadProductsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type     : 'GET',
      success: function(data) {
        this.setState({dataHargaterbaik: data.featured['Harga Terbaik'],dataProdukpopuler : data.featured['Produk Populer']});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },*/
  getInitialState: function() {
    return {dataHargaterbaik: [],dataProdukpopuler:[]};
  },
  componentDidMount: function() {
    /*this.loadProductsFromServer();*/
     fetch(this.props.url)
            .then( (response) => {
                return response.json() })   
                    .then( (data) => {
                        this.setState({dataHargaterbaik: data.featured['Harga Terbaik'],dataProdukpopuler : data.featured['Produk Populer']});
                        //console.log(data);
                    });
  },
  render: function() {
    return (
      <div className="ProductList category-page">
        <div className="tag-title">
        <h3 className="title _h3">Harga Terbaik</h3>
        </div>
        <ProductList data={this.state.dataHargaterbaik} />
        <div className="tag-title">
        <h3 className="title _h3">Produk Populer</h3>
        </div>
        <ProductList data={this.state.dataProdukpopuler} />
      </div>
    );
  }
});

var ProductList = React.createClass({
  render: function() {
    var productNodes = this.props.data.map(function(product, index) {
      return (
        <Product productname={product.name} rating={product.rating.summary} key={index} url={product.url_key} price={product.price.final} productId={product.id} image={product.image_default.small_image.vertical} new={product.is_new} brand={product.brand.name} >
        </Product>
      );
    });
    return (
      <ul className="productList">
        {productNodes}
      </ul>
    );
  }
});

export default React.createClass({
  render() {
    return (
      <ProductBox url="https://charlie.orami.co.id/api/home/content"/>
      
    )
  }
})