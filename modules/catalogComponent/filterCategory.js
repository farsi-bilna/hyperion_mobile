import React from 'react'
import ReactPaginate from 'react-paginate'
import Remarkable from 'remarkable'
import NavLink from '../NavLink'
import { Link } from 'react-router'



var Attributechild = React.createClass({
  render: function() {
    if (this.props.attchild) {
      var filterNodes = this.props.attchild.map(function(attchild, index) {
      //const catId={this.props.catId};
        return (
        <div key={index}>
          <Link to={{ pathname: "productList", query: { brand: attchild.value } }} activeClassName="active">
            <label><input type="checkbox" value={attchild.value} /> {attchild.label}</label>
          </Link>
        </div>
        );
      });
    }
    return(
       <div className="productfilterchild">
        {filterNodes}
      </div>
    )
  }
});
var Filtercategory = React.createClass({
  render: function() {
    //console.log(this.props.CatID);
    if (this.props.datafilteratt) {
      var filterNodes = this.props.datafilteratt.map(function(filteratt, index) {
      //console.log(filteratt);
        return (
          <div>
          {filteratt.code}
          <Attributechild attchild={filteratt.data} attname={filteratt.code} key={index}/>
          </div>
        );
      });
    }
    return(
       <div className="productfilter">
       this filter {this.props.IdCat}<br/>
        {filterNodes}
      </div>
    )
  }
});
export default React.createClass({
  render() {
    return (
       <Filtercategory IdCat={this.props.IdCat}/>
    )
  }
})