// modules/About.js
import React from 'react'
import Remarkable from 'remarkable'


var Product = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="product">
        <h2 className="productName">
        	<a class="url_prod" href={this.props.url}>
          	{this.props.productname}
          	</a>
        </h2>
        <img class="image" src={this.props.image}/>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var ProductBox = React.createClass({
  loadProductsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.data});
        //console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  render: function() {
    return (
      <div className="ProductBox">
        <h1>Product list</h1>
        <ProductList data={this.state.data} />
      </div>
    );
  }
});

var ProductList = React.createClass({
  render: function() {
    var productNodes = this.props.data.map(function(product) {
      return (
        <Product productname={product.name} key={product.id} url={product.url_key} image={product.image_default.small_image.vertical}>
          {product.short_desc}
        </Product>
      );
    });
    return (
      <div className="productList">
        {productNodes}
      </div>
    );
  }
});

export default React.createClass({
  render() {
    return (
      <ProductBox url="https://charlie.orami.co.id/api/categories/7661/products"  />
    )
  }
})
