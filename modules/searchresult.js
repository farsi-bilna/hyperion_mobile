// modules/About.js
import React from 'react'
import Remarkable from 'remarkable'
import Media from 'react-bootstrap/lib/Media'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import NavLink from './NavLink'


var Product = React.createClass({

  render: function() {

    const isNew = this.props.new;
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
  loadProductsFromServer: function() {
    $.ajax({
      url: this.props.url,
      data     : {qstring: this.state.qstring},
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.data});
        console.log(this.props.url);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: "not found"});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [], q:''};
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  render: function() {

    if (this.state.data.total_count != 0) {
        var prodlist= <ProductList data={this.state.data} />
    } else {
        var prodlist= <span>No Result for {this.props.keyword}</span>
    }
    return (
    <div className="ProductList category-page">
        <div className="tag-title">
        <h3 className="title _h3">Search Result</h3>
        </div>
        { prodlist }
      </div>
    );
  }
});

var ProductList = React.createClass({
  render: function() {
    var productNodes = this.props.data.map(function(product, index) {
      return (
        <Product productname={product.name} rating={product.rating.summary} key={index} url={product.url_key} price={product.price.final} productId={product.id} image={product.image_default.small_image.vertical} new={product.is_new} brand={product.brand.name}>
          {product.short_desc}
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
  convertUrlapi: function(value) {
    var qstring = value;
    var url1 = "https://charlie.orami.co.id/api/products/search?q=" + qstring ;
    console.log(url1);
    return url1;
  },
  render() {
    const { qstring } = this.props.params;
    return (
      <ProductBox url={"https://charlie.orami.co.id/api/products/search?q=" + qstring} keyword={qstring}  />
    )
  }
})