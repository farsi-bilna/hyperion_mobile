import React from 'react'
import ProductBox from './FeaturedProd';
import CarouselHome from './Carousel';


export default React.createClass({
  render() {
    return (
      <div>
        <CarouselHome/>
        <div className="container-fluid">

          <ProductBox/>
        </div>
      </div>
    )
  }
})