var React = require('react');
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ApiUtil from '../util/api_util'
import Tag from './tag'
import Comments from './comment_section'
import Navigation from 'react-toolbox/lib/navigation'
import { List,ListItem,ListSubHeader,ListDivider,ListCheckbox } from 'react-toolbox/lib/list'
import RaisedButton from 'material-ui/lib/raised-button'

var ArticleDetail = React.createClass({
  stateFromStore: function () {
    return {article: ArticleStore.getDetail()};
  },
  __onChange: function () {
    this.setState(this.stateFromStore());
  },
  getInitialState: function () {
    return this.stateFromStore();
  },
  componentWillReceiveProps: function (nextProps) {
    ApiUtil.fetchArticle(parseInt(nextProps.params.id));
  },
  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    ApiUtil.fetchArticle(parseInt(this.props.params.id));
    if (SessionStore.isLoggedIn()) {
      this.setState({followsAuthor: this.state.article.user.follows_author})
    }
  },
  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },

  handleFollowAuthor: function () {
    ApiUtil.toggleFollow(this.state.article.author.id)
  },

  handleUnpublish: function () {
    ApiUtil.ArticleUnpublish(this.state.article.id,alert("Unpublished fasho"))
  },

  rawBody: function () {
    debugger
    return { __html: this.state.article.body}
  },

  render: function() {
    var tags = [], recent_posts_view, delete_button, follow_button;
    if (!this.state.article) {
      return (<h2>Loading...</h2>);
    }
    if (this.state.article.tags) {
      tags = this.state.article.tags.map( t => <Tag key={t.id} tag={t} /> )
    }
    if (SessionStore.isLoggedIn()) {
      if (this.state.article.author.id == SessionStore.currentUser().id) {
        delete_button = <RaisedButton label="Unpublish" onClick={this.handleUnpublish}/>
      } else {
        follow_button = <ListCheckbox onClick={this.handleFollowAuthor} value={this.state.followsAuthor} caption={"Follow " + this.state.article.author.name} />
      }
    }
    if (this.state.article.authors_recent_articles) {
      var article_items = this.state.article.authors_recent_articles.map( recent_article => (<ListItem key={recent_article.id} caption={recent_article.title} />) );
      recent_posts_view = (
        <List selectable ripple>
          <ListSubHeader caption="Author's Recent Articles" />
          {article_items}
        </List>
      )
    }
    return (
      <main>
        <article className="article-detail">
          <img className="author-thumb" src={this.state.article.author.avatar} />
          <p className="author-email">{this.state.article.author.name}</p>
          {delete_button}
          <Navigation>
            {tags}
          </Navigation>
          <h1>{this.state.article.title}</h1>
          <img className="article-detail-image" src={this.state.article.picture} />
          <div
            dangerouslySetInnerHTML={this.rawBody()}
          />
        </article>
        <hr />
        {recent_posts_view}
        <hr />
        <Comments article_id={this.state.article.id} comments={this.state.article.comments} />
      </main>
    );
  }

});

module.exports = ArticleDetail;