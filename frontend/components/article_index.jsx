import React from 'react'
import ApiUtil from '../util/api_util'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ArticleIndexItem from './article_index_item'
import Sidebar from './sidebar'
import LinearProgress from 'material-ui/lib/linear-progress'
import Infinite from 'react-infinite'

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
    var completionCallback = () => this.setState({fetching: false, isInfiniteLoading: false})
    var currPath = currProps.location.pathname.split("/")[1]; 
    switch (currPath) {
      case "":
        ApiUtil.fetchArticles(pageNum, completionCallback);
        break;
      case "me":
        ApiUtil.fetchBookmarkedArticles(pageNum, completionCallback);
        break;
      case "popular":
        ApiUtil.fetchTopArticles(pageNum, completionCallback);
        break;
      case "tags":
        ApiUtil.fetchArticlesByTag(currProps.params.tag_name, pageNum, completionCallback);
        break;
      }
  },

  moreArticles: function () {
    this.setState({isInfiniteLoading: true});
    var that = this;
    var meta = ArticleStore.meta();
    this.articleFetcher(this.props, meta.page + 1);
  },

  stateFromStore: function () {
    return {
      articles: this.articleGrabber().sort((x,y) => y.pubTime - x.pubTime)
    };
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
    // window.addEventListener('scroll', this.handleScroll);

  },

  componentWillReceiveProps: function(nextProps) {
    this.articleFetcher(nextProps)
  },

  componentWillUnmount: function () {
    // window.addRemoveListener('scroll', this.handleScroll);
    this.articleStoreToken.remove();
  },

  sendToFullEditor: function (text) {
    this.context.router.push('/editor')
  },

  handleScroll: function (e) {
    var remainingLength = ($(document).height() - $(window).height()) - $(window).scrollTop()
    if (remainingLength < 200) {
      this.moreArticles()
    }

  },

  render: function () {
    var articles, progress;
    if (this.state.articles) {
        articles = this.state.articles.map( article => 
          <ArticleIndexItem key={article.id} noUser={!SessionStore.currentUser()} article={article} />
        );
    }
    if (this.state.fetching) {
      progress = <LinearProgress mode="indeterminate" /> 
    }
    return (
      <main>
        {progress}
        <section className="content-main">
          <Infinite useWindowAsScrollContainer
                    elementHeight={800}
                    infiniteLoadBeginEdgeOffset={1600}
                    onInfiniteLoad={this.moreArticles}
                    isInfiniteLoading={this.state.isInfiniteLoading}
                    >
              {articles}
          </Infinite>
        </section>
        <Sidebar />
      </main>
    )
  }

});
module.exports = ArticleIndex


