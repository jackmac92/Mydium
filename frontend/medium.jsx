var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require ('react-router').Router,
    Route = require ('react-router').Route,
    IndexRoute = require ('react-router').IndexRoute,
    hashHistory = require ('react-router').hashHistory,
    
    SessionStore = require('./stores/session'),
    UserShow = require('./components/user_show'),
    LoginForm = require('./components/login_form'),
    Header = require('./components/header'),
    ArticleIndex = require('./components/article_index');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <content>
          {this.props.children}
        </content>
      </div>
    );
  }
});

// header
// logo home top bookmarks            search write badge prof
// logo              search badge prof


$(document).ready(function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ArticleIndex} />
        <Route path="user/:id" component={UserShow} />
      </Route>
      <Route path="/login" component={LoginForm}/>
    </Router>,
    $('#root')[0]
  );
});
