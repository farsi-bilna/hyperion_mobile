
import React from 'react'
import Slider from 'react-slick'


var CarouselList = React.createClass({
  render: function () {
    var settings = {
      dots: false,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
      {this.props.data.length > 0 ? 
      <Slider {...settings}>
          {this.props.data.map(function (image, index) {
              return <div key={index}><img src={image.image_resize.detail} /></div>
          })}
      </Slider>
       : <div className="placeholder"> No Image </div> }
       </div>
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