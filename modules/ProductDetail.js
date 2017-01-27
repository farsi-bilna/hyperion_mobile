import React from 'react'
import Remarkable from 'remarkable'
import NavLink from './NavLink'
import CarouselPD from './ProdDetailsComponent/Carouselimage'
import Media from 'react-bootstrap/lib/Media';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
var css = require("./theme/proddetail.scss")

{/*var TabsProduct = React.createClass({
  render: function() {
    var tabsNodes = this.props.tabsdata.map(function(tabdata, index) {
      return (
        <li key={index}>
            {tabdata}
        </li>
      );
    });
    return(
      <ul>
      {tabsNodes}
      </ul>
    );
  }
});*/}

var ProductBox = React.createClass({
  loadProductsFromServer: function() {
    fetch(this.props.url)
            .then( (response) => {
                return response.json() })   
                    .then( (data) => {
                        this.setState({
                          data: data,  
                          detailInfo : data.detail_info,
                          brand:data.brand,
                          image:data.image_list,
                          ratting:data.rating,
                          price:data.price,
                          warehouse:data.warehouse,
                          vendor:data.vendor
                        });
                        //console.log(data);
                    });
  },
  getInitialState: function() {
    return {data: [], image : [], detailInfo:[],brand:[],price:[],ratting:[],warehouse:[], vendor:[]};
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
    
  },
  render: function() {
    if (this.state.data) {
      let newlabel = null;
      let stok = null;
      var key = null
      if (this.state.data.is_new) {
        newlabel = <span className="prod-att new-product">New</span>
      }
      console.log(this.state.detailInfo);
      if (this.state.data.is_in_stock){
        stok = <span><strong>In stok</strong></span>
      }
      var tabsContent =  Object.values(this.state.detailInfo) && Object.values(this.state.detailInfo).map(function(tabdata, index) {
        console.log();
        return (
        <div className="wraping_card bg_white pull _all push _pushtop"
              dangerouslySetInnerHTML={{__html: tabdata }}>
        </div>
        );
      });
      var tabsHeader = this.state.detailInfo && Object.keys(this.state.detailInfo).map(function(tabheader, index) {
        return (
        <div>
        </div>
        );
      });
      return (
        <div className="product-page container">
          <div className="wraping_card bg_white push _pushtop">
            <CarouselPD data={this.state.image}/>
            <hr/>
            <div className="pull _all">
              <span className="label brand">{this.state.brand.name}</span>
              <span className="label new">{newlabel}</span>
              <h1 className="productname pull _top _bottom"> {this.state.data.name} </h1>
              <div className="total-review">
              <Glyphicon glyph="star" /> {this.state.ratting.summary}</div>
              <span className="price">IDR. {this.state.price.final}</span><br/>
              {stok}<br/>
              <span>{this.state.warehouse.name}||{this.state.vendor.name}</span><br/>
              {/*<TabsProduct tabsdata={this.state.detailInfo}/>*/}
            </div>
          </div>
          <div className="wraping_card bg_white pull _all push _pushtop"
             dangerouslySetInnerHTML={{__html: this.state.data.short_desc }}>
          </div>
            {tabsHeader}
            {tabsContent}
        </div>
      );
    }
  }
});

export default React.createClass({
  render() {
    const { idproduct } = this.props.params;
    return (
      <ProductBox url={"https://charlie.orami.co.id/api/products/"+ idproduct } />
      
    )
  }
});
