var React = require('react');
var ReactDOM = require('react-dom');
var Router = require ('react-router').Router;
var Route = require ('react-router').Route;
var IndexRoute = require ('react-router').IndexRoute;
var hashHistory = require ('react-router').hashHistory;

var ArticleIndex = require('./components/article_index');


var App = React.createClass({
  render: function () {
    return (
      <div>
        <header><h1>Podium</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={ArticleIndex} />
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
