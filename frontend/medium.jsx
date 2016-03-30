var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require ('react-router').Router,
    Route = require ('react-router').Route,
    IndexRoute = require ('react-router').IndexRoute,
    hashHistory = require ('react-router').hashHistory,

    UserShow = require('./components/user_show'),
    ArticleIndex = require('./components/article_index');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>  
          <header-nav>
            <h1 className="header-logo">
              Podium
            </h1>
          </header-nav>
        </header>
        
        <content>
          {this.props.children}
        </content>
      </div>
    );
  }
});


var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={ArticleIndex} />
      <Route path="user/:id" component={UserShow} />
    </Route>
  );

$(document).ready(function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      {routes}
    </Router>,
    $('#root')[0]
  );
});
