import React from 'react'


export default React.createClass({
	contextTypes: {
    router: React.PropTypes.object
  },
  handleSubmit(event) {
    event.preventDefault()
    const qstring = event.target.elements[0].value
    const convert_qstring = "?q=" + qstring
    const api_url = `https://charlie.orami.co.id/api/products/search${convert_qstring}`
    const path = `/search/searchresult/${qstring}`
    console.log(api_url);
    this.context.router.push(path)
  },
  render() {
    return (
    <div>
    	<form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="search here"/>
        <button type="submit">Go</button>
      </form>
      {this.props.children}
    </div>
    )
  }
})