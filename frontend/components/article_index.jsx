import React from 'react'
import ApiUtil from '../util/api_util'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ArticleIndexItem from './article_index_item'
import Sidebar from './sidebar'
import Input from 'react-toolbox/lib/input'
import Navigation from 'react-toolbox/lib/navigation'
import Ripple from 'react-toolbox/lib/ripple'
import ProgressBar from 'react-toolbox/lib/progress_bar'


var ArticleIndex = React.createClass ({

  contextTypes: {router: React.PropTypes.object.isRequired},

  stateFromStore: function () {
    return ({ articles: this.articleGrabber() });
  },

  articleGrabber: function () {
    var currPath = this.props.location.pathname.split("/")[1]; 
    var currArticles = [];
    switch (currPath) {
      case "":
        currArticles = ArticleStore.all()
        break;
      case "me":
        currArticles = ArticleStore.bookmarkedArticles()
        break;
      case "popular":
        currArticles = ArticleStore.topArticles()
        break;
      case "tags":
        currArticles = ArticleStore.taggedArticles(this.props.params.tag_name)
        break;
    }
    return currArticles;
  },
  articleFetcher: function (currProps) {
    var completionCallback = () => this.setState({fetching: false})
    var currPath = currProps.location.pathname.split("/")[1]; 
    switch (currPath) {
      case "":
        ApiUtil.fetchArticles(completionCallback);
        break;
      case "me":
        ApiUtil.fetchBookmarkedArticles(completionCallback);
        break;
      case "popular":
        ApiUtil.fetchTopArticles(completionCallback);
        break;
      case "tags":
        ApiUtil.fetchArticlesByTag(currProps.params.tag_name, completionCallback);
        break;
      }
  },

  __onChange: function () {
    return this.setState(this.stateFromStore());
  },

  getInitialState: function () {
    var init = this.stateFromStore();
    init.fetching = true;
    return init
  },

  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    this.articleFetcher(this.props)
  },

  componentWillReceiveProps: function(nextProps) {
    this.articleFetcher(nextProps)
  },

  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },

  sendToFullEditor: function (text) {
    this.context.router.push('/editor')
  },

  render: function () {
    var articles, progress;
    if (this.state.articles) {
        articles = this.state.articles.map( article => <ArticleIndexItem key={article.id} article={article} />);
    }
    if (this.state.fetching) {
      progress = <ProgressBar mode="indeterminate" /> 
    }
    return (
      <main>
        {progress}
        <section className="content-main">
          <Input onFocus={this.sendToFullEditor} type="text" label="Write here..." />
          <Navigation type="vertical" className="article-index">
            {articles}
          </Navigation>
        </section>
        <Sidebar />
      </main>
    )
  }

});
module.exports = ArticleIndex


