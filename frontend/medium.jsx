import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import ApiUtil from './util/api_util'
import SessionStore from './stores/session'

import App from './components/app'
import LoginForm from './components/login_form'
import UserShow from './components/user_show'
import ArticleIndex from './components/marticle_index'
import ArticleDetail from './components/article_detail'


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
