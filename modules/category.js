// modules/About.js
import React from 'react'
import ReactPaginate from 'react-paginate';
import Remarkable from 'remarkable'
import NavLink from './NavLink'
import Media from 'react-bootstrap/lib/Media';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from 'react-router'
//import MediaBody from 'react-bootstrap/lib/MediaBody';
//import MediaHeading from 'react-bootstrap/lib/MediaHeading';


var Product = React.createClass({
  getInitialState: function() {
    return {active: false};
  },
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
        <div className="prod-name" onClick={this.handleToggle}>
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
      data     : {limit: this.props.perPage, page: this.state.page, attributes: this.props.att, sort: this.props.qsort, dir: this.state.dir, price:this.props.qprice},
      dataType: 'json',
      type     : 'GET',
      success: function(data) {
        this.setState({data: data.data, filteratt:data.filter.attributes, cat_name: data.title, pageNum: Math.ceil(data.total_count / this.props.perPage)});
        console.log("load data");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [], page : 0, dir : 'Desc'};
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  handlePageClick : function(data) {
    let selected = data.selected;
    let page = Math.ceil(selected + 1);
    console.log("page"+page + "; selected= "+selected);
    this.setState({page: page}, () => {
      this.loadProductsFromServer();
    });
  },
  ascHandle : function() {
    console.log("props : " +this.props.qdir);
    console.log("state :"+ this.state.dir);
    let qdir = "Asc";
    this.setState({dir: qdir}, () => {
      this.loadProductsFromServer();
    });
  },
  descHandle : function() {
    console.log("props : " +this.props.qdir);
    console.log("state :"+ this.state.dir);
    let qdir = "Desc";
    this.setState({dir: qdir}, () => {
      this.loadProductsFromServer();
    });
  },
  render: function() {
    console.log(this.state.filteratt);
    return (
      <div className="ProductList category-page">
        <div className="tag-title">
        <h3 className="title _h3">{this.state.cat_name}</h3>
        </div>
        <div className="sorting container">
          <div className="col-xs-6">
            <NavLink to={{pathname: this.props.catpath, query:{dir:"asc"} }} onClick={(e)=>this.ascHandle(e)} >asc</NavLink>
          </div>
          <div className="col-xs-6">
            <NavLink to={{pathname: this.props.catpath, query:{dir:"Desc"} }} onClick={(e)=>this.descHandle(e)} >Desc</NavLink>
          </div>
        </div>
        <Filtercategory datafilteratt={this.state.filteratt} url={this.props.url} catpath = {this.props.catpath}/>
        <ProductList data={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
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

var filterprice = React.createClass({
  render: function() {
    return(
      <div>
        filter price
        {this.props.price.max}
        {this.props.price.min}
      </div>
    )
  }
  
})
const CheckboxOrRadioGroup = React.createClass({ 
  render: function() { 
    return(
      <div className="filterbox">
        <label className="form-label">{this.props.title}</label>
        <div className="checkbox-group">
          {this.props.options.map(opt => {
            return (
              <div>
              <label key={opt.value} className="form-label capitalize">
                <input
                  className="form-checkbox"
                  name={this.props.setName}
                  onChange={this.props.controlFunc}
                  value={opt.value}
                  checked={ this.props.selectedOptions.indexOf(opt) > -1 }
                  type={this.props.type} /> {opt.value}
              </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

var Filtercategory = React.createClass({
  getInitialState: function() {
    return {selectedCheck: [],selectedCheckName: []};
  },
  CheckboxSelection(e) {
    const newSelection = e.target.value;
    const newSelectionName = e.target.name;
    let newSelectionNameArray;
    let newSelectionArray;
    let i = 0;
    newSelectionNameArray = [...this.state.selectedCheckName, newSelectionName];
    console.log(newSelectionNameArray.length);
    for (i=0; i < this.state.selectedCheckName; i++){  
      if (newSelectionArray.indexOf(newSelectionName) > -1){
        newSelectionArray = this.state.selectedCheck.filter(s => s !== newSelection);
      }else{
        newSelectionNameArray[i] = [...this.state.selectedCheck, newSelection];
      }
    }
    console.log(" attcode : "+ newSelectionNameArray);
  },
  render: function() {
    const catpath = this.props.catpath;
    if (this.props.datafilteratt) {
      let n = 0;
      var filterNodes = this.props.datafilteratt.map(function(filteratt, index) {
        return (
          <div className=" filterbox">
            <CheckboxOrRadioGroup
          title={filteratt.code}
          setName={filteratt.code}
          type={'checkbox'}
          controlFunc={this.CheckboxSelection}
          options={filteratt.data}
          selectedOptions={this.state.selectedCheck} />
          </div>
        );
      }, this);
    }
    return(
      <div className="productfilter">
        {filterNodes}
      </div>
    )
  }
});
export default React.createClass({
  render() {
    
    console.log(this.props.location.query.dir);
    const { idcategory } = this.props.params;
    const { pathname } = this.props.location;
    const { query } = this.props.location;
    const { attributes,sort,dir,price } = query;
    return (
      <ProductBox url={"https://charlie.orami.co.id/api/categories/"+ idcategory + "/products" } perPage={5} qsort={sort} idcat={idcategory} qdir={dir} att={attributes} qprice={price} catpath={pathname} />
      
    )
  }
})