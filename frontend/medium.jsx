var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require ('react-router').Router,
    Route = require ('react-router').Route,
    IndexRoute = require ('react-router').IndexRoute,
    hashHistory = require ('react-router').hashHistory,
    
    // browserHistory = require('history/lib/createBrowserHistory'),
    // browserHistory = require('react-router').browserHistory,

    ApiUtil = require('./util/api_util'),
    SessionStore = require('./stores/session'),
    UserShow = require('./components/user_show'),
    LoginForm = require('./components/login_form'),
    Header = require('./components/header'),
    ArticleDetail = require('./components/article_detail.cjsx'),
    ArticleIndex = require('./components/article_index');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      currentUser: null
    };
  },
  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    ApiUtil.fetchCurrentUser();
  },
  componentWillUnmount: function() {
    this.sessionStoreToken.remove();
  },
  handleChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.setState({currentUser: SessionStore.currentUser()});
    } else {
      this.context.router.push("/login");
    }
  },

  render: function () {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn
  }
  function _redirectIfNotLoggedIn () {
    if (!SessionStore.isLoggedIn()) {
      replace("/login")
    }

    asyncCompletionCallback();
  }
}

$(document).ready(function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ArticleIndex} />
        <Route path="user/:id" component={UserShow} />
        <Route path="article/:id" component={ArticleDetail} />
        <Route path="me" component={UserShow} />
      </Route>
      <Route path="/login" component={LoginForm}/>
    </Router>,
    $('#root')[0]
  );
});
