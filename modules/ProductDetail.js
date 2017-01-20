import React from 'react'
import Remarkable from 'remarkable'
import NavLink from './NavLink'
import CarouselPD from './ProdDetailsComponent/carouselimage'
import Media from 'react-bootstrap/lib/Media';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

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
      if (this.state.data.is_in_stock){
        stok = <span><strong>In stok</strong></span>
      }
      var tabsContent = this.state.detailInfo && Object.values(this.state.detailInfo).map(function(tabdata, index) {
        console.log(tabdata);
        return (
            <TabPanel>
              {tabdata}
            </TabPanel>
        );
      });
      var tabsHeader = this.state.detailInfo && Object.keys(this.state.detailInfo).map(function(tabheader, index) {
        return (
            <Tab>
              {tabheader}
            </Tab>
        );
      });
      return (
        <div className="product-page">
          <CarouselPD data={this.state.image}/>
          <div className="">
            <span>{this.state.brand.name}</span>
            <span>{newlabel}</span>
            <h1> {this.state.data.name} </h1>
            <div className="total-review">
            <Glyphicon glyph="star" /> {this.state.ratting.summary}</div>
            <span className="price">{this.state.price.final}</span><br/>
            {stok}<br/>
            <span>{this.state.warehouse.name}||{this.state.vendor.name}</span><br/>
            {this.state.data.short_desc}
            {/*<TabsProduct tabsdata={this.state.detailInfo}/>*/}
          </div>
          <Tabs selectedIndex={0} >
            <TabList>
             {tabsHeader}
            </TabList>
            {tabsContent}
          </Tabs>
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
