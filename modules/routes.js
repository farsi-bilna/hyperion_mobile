// modules/routes.js
import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Category from './Category'
import Product from './ProductDetail'
import Search from './Search'
import SearchResult from './SearchResult'
import CatList from './CatList'
import Repo from './Repo'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={CatList}>
      <Route path="/repos/:userName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
    <Route name="productList" path="/category/:idcategory" component={Category}/>
    <Route path="/product/:idproduct" component={Product}/>
    <Route path="/search" component={Search}/>
    <Route path="/search/searchresult/:qstring" component={SearchResult}/>
  </Route>
)