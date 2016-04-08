import React from 'react'
import Sidebar from './sidebar'
import ArticleIndexItem from './article_index_item'
import ApiUtil from '../util/api_util'
import SessionStore from '../stores/session'
import ArticleStore from '../stores/articles'

import Navigation from 'react-toolbox/lib/navigation'

var UserBookmarks = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

  stateFromStore: function () {
    return ({ articles: ArticleStore.bookmarkedArticles() });
  },

  __onChange: function () {
    return this.setState(this.stateFromStore());
  },

  getInitialState: function () { 
    return this.stateFromStore();
  },

  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    ApiUtil.fetchBookmarkedArticles();
  },

  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },

  sendToFullEditor: function (text) {
    this.context.router.push('/editor')
  },

  render: function () {
    var articles;
    if (this.state.articles) {
        articles = this.state.articles.map( article => <ArticleIndexItem key={article.id} article={article} />);
    }
    return (
      <main>
        <section className="content-main">
          <Navigation type="vertical" className="article-index">
            {articles}
          </Navigation>
        </section>
        <Sidebar />
      </main>
    )
  }

});

module.exports = UserBookmarks;

