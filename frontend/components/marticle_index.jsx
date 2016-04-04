import React from 'react'
import ApiUtil from '../util/api_util'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ArticleIndexItem from './marticle_index_item'
import Sidebar from './sidebar'
import Input from 'react-toolbox/lib/input'

var ArticleIndex = React.createClass ({

  contextTypes: {router: React.PropTypes.object.isRequired},

  stateFromStore: function () {
    return ({ articles: ArticleStore.all() });
  },

  __onChange: function () {
    return this.setState(this.stateFromStore());
  },

  getInitialState: function () { 
    return this.stateFromStore();
  },

  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    ApiUtil.fetchArticles();
  },

  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },

  sendToFullEditor: function (text) {
    this.context.router.push('editor')
  },

  render: function () {
    var articles;
    if (this.state.articles) {
        articles = this.state.articles.map(function(article) {
          return <ArticleIndexItem key={article.id} article={article} />;
        });
    }
    return (
      <main>
        <section className="content-main">
          <Input onFocus={this.sendToFullEditor} type="text" label="Write here..." />
          <ul className="article-index">
            {articles}
          </ul>
        </section>
        <Sidebar />
      </main>
    )
  }

});
module.exports = ArticleIndex


