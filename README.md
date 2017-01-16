# Mobile App Orami

## Running the server
after you clone this repo

run the server with 
- `npm run start:dev` : for development mode
- `npm run start:prod` : for production mode

and then visit
[http://localhost:8080](http://localhost:8080)

--- 

## Routing

```js
// ...
import { Router, Route, hashHistory } from 'react-router'

module.exports = (
   <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
    <Route path="/category/:idcategory" component={Category}/>
    <Route path="/product/:idproduct" component={Product}/>
    <Route path="/search" component={Search}/>
    <Route path="/search/searchresult/:qstring" component={Searchresult}/>
  </Route>
  )
```





