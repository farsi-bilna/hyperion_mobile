
import React from 'react'
import Slider from 'react-slick'


var CarouselList = React.createClass({
  render: function () {
    if (this.props.data.label){
      var carouselNodes = this.props.data.map(function(image, index){
        return (
            <div key={index}><img src={image.image_resize.detail} /></div>
        );
      });
    }
    var settings = {
      dots: false,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
          {carouselNodes}
      </Slider>
    );
  }
});

var CarouselPD = React.createClass({
  render: function() {
    return (
      <div className="container-carousel">
        <CarouselList data={this.props.data}/>
      </div>
    );
  }
});
export default React.createClass({
  render() {
    return(
      <CarouselPD data={this.props.data}/>
    )
  }
});