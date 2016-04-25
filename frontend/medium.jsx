import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'

import ApiUtil from './util/api_util'
import SessionStore from './stores/session'

import MaterialApp from './components/material_app'
import LoginForm from './components/login_form'
import SignUpForm from './components/signup_form'
import SelfShow from './components/self_show'
import OtherShow from './components/other_show'
import ArticleIndex from './components/article_index'
import ArticleDetail from './components/article_detail'
import ArticleForm from './components/article_form'
import Search from './components/search'
import TagSelector from './components/tag_selector.jsx'

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn()
  }
  function _redirectIfNotLoggedIn () {
    if (!SessionStore.isLoggedIn()) {
      replace("/login")
    }
    asyncCompletionCallback();
  }
}

$(document).ready(function () {
  const appHistory = useRouterHistory(createHashHistory)({queryKey:false})
  ReactDOM.render(
      <Router history={appHistory}>
        <Route path="/" component={MaterialApp}>
          <IndexRoute component={ArticleIndex} />
          <Route path="popular" component={ArticleIndex} />
          <Route path="me/bookmarks" component={ArticleIndex}/>
          <Route path="tags/:tag_name" component={ArticleIndex} />
          <Route path="article/:id" component={ArticleDetail} />       
          <Route path="users/:id" component={OtherShow} />
          <Route path="tagselect" component={TagSelector} />
          <Route path="me" onEnter={_requireLoggedIn} component={SelfShow} />
          <Route path="editor" component={ArticleForm} />
          <Route path="editor/:id" component={ArticleForm} />
          <Route path="search" component={Search}/>
          <Route path="login" component={LoginForm}/>
        </Route>
      </Router>,
    $('#root')[0]
  );
});
