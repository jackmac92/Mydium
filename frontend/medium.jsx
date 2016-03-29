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
          <h1>Podium</h1>
        </header>
        {this.props.children}
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
