import React from 'react'
import ArticleUtil from '../util/article'
import UserUtil from '../util/user'
import AuthUtil from '../util/auth'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ArticleIndexItem from './article_index_item'
import Sidebar from './sidebar'
import LinearProgress from 'material-ui/LinearProgress'
import CircularProgress from 'material-ui/CircularProgress'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

var ArticleIndex = React.createClass ({

  contextTypes: {router: React.PropTypes.object.isRequired},


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
  articleFetcher: function (currProps, pageNum) {
    pageNum = pageNum || 1
    this.setState({isInfiniteLoading: false})
    var that = this;
    var completionCallback = () => that.setState({isInfiniteLoading: false})
    var currPath = currProps.location.pathname.split("/")[1]; 
    switch (currPath) {
      case "":
        ArticleUtil.fetchArticles(pageNum, completionCallback);
        break;
      case "me":
        UserUtil.fetchBookmarkedArticles(pageNum, completionCallback);
        break;
      case "popular":
        ArticleUtil.fetchTopArticles(pageNum, completionCallback);
        break;
      case "tags":
        ArticleUtil.fetchArticlesByTag(currProps.params.tag_name, pageNum, completionCallback);
        break;
      }
  },

  moreArticles: function () {
    var that = this;
    var meta = ArticleStore.meta();
    if (!(meta.page == meta.total_pages)) {
      this.setState({isInfiniteLoading: true});
      this.articleFetcher(this.props, meta.page + 1);
    }
  },

  stateFromStore: function () {
    return {
      articles: this.articleGrabber()
    };
  },

  __onChange: function () {
    return this.setState(this.stateFromStore());
  },

  sessionChange: function () {
    this.setState({currentUser:SessionStore.currentUser()})
  },

  getInitialState: function () {
    var init = this.stateFromStore();
    init.isInfiniteLoading = true;
    return init
  },

  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    this.SessionStoreToken = SessionStore.addListener(this.sessionChange)
    this.articleFetcher(this.props)
    AuthUtil.fetchCurrentUser()
    window.addEventListener('scroll', this.handleScroll);

  },

  componentWillReceiveProps: function(nextProps) {
    this.articleFetcher(nextProps)
  },

  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleScroll);
    this.articleStoreToken.remove();
    this.SessionStoreToken.remove()
  },

  handleScroll: function (e) {
    var remainingLength = ($(document).height() - $(window).height()) - $(window).scrollTop()
    if (remainingLength < 1200 && !this.state.isInfiniteLoading) {
      this.moreArticles()
    }

  },

  render: function () {
    var articles, progress;
    if (this.state.articles) {
        articles = this.state.articles.map( article => 
          <ArticleIndexItem key={article.id} noUser={!this.state.currentUser} article={article} />
        );
    }
    if (this.state.isInfiniteLoading) {
      progress = <LinearProgress className="fetch-progress" mode="indeterminate" /> 
    }
    var fetchingIndicator = (this.state.isInfiniteLoading) ? <CircularProgress /> : null
    return (
      <main>
        {progress}
        <section className="content-main">
          {articles}
          <div style={{height:"400px"}}>
            {fetchingIndicator}
          </div>
        </section>
        <Sidebar />
      </main>
    )
  }

});
module.exports = ArticleIndex

