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

var ArticlesWithTag = React.createClass ({

  contextTypes: {router: React.PropTypes.object.isRequired},

  stateFromStore: function () {
    return ({ articles: ArticleStore.all() });
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
    ApiUtil.fetchArticlesByTag(this.props.params.tag_name, () => this.setState({fetching: false}));
  },

  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },
  componentWillReceiveProps: function(nextProps) {
    ApiUtil.fetchArticlesByTag(nextProps.params.tag_name, () => this.setState({fetching: false}));    
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
      progress = <ProgressBar type="circular" mode="indeterminate" /> 
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
module.exports = ArticlesWithTag


