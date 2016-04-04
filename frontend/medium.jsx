import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import ApiUtil from './util/api_util'
import SessionStore from './stores/session'

import App from './components/app'
import LoginForm from './components/login_form'
import SignUpForm from './components/signup_form'
import UserShow from './components/user_show'
import ArticleIndex from './components/article_index'
import ArticleDetail from './components/article_detail'
import ArticleForm from './components/article_form'


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
          <Route path="editor" onEnter={_requireLoggedIn} component={ArticleForm} />
          <Route path="me" component={UserShow} />
          <Route path="/login" component={LoginForm}/>
          <Route path="/signup" component={SignUpForm}/>
        </Route>
      </Router>,
    $('#root')[0]
  );
});
