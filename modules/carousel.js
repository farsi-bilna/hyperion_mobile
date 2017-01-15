import React from 'react'
import Slider from 'react-slick'
import Fetch from 'react-fetch'

var CarouselList = React.createClass({
  render: function () {
    var carouselNodes = this.props.data.map(function(image, index){
    console.log(image.image);
      return (
          <div key={index}><img src={image.image} /></div>
      );
    });
    var settings = {
      dots: false,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false
    };
    console.log(this.props.data);
    return (
      <Slider {...settings}>
          {carouselNodes}
      </Slider>
    );
  }
});

var CarouselHome = React.createClass({
  loadProductsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({
          data: data.slider
        });
      console.log(data);
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
    {/*fetch(this.props.url)
            .then( (response) => {
                return response.json() })   
                    .then( (data) => {
                        this.setState({data: data.slider});
                        //console.log(data);
                    });*/}
  },
  render: function() {
    if (this.state.data) {
      return (
        <div className="container-carousel">
          <CarouselList data={this.state.data}/>
        </div>
      );
    }
  }
});
export default React.createClass({
  render() {
    return (
      <CarouselHome url="https://charlie.orami.co.id/api/home/content"/>
    )
  }
})