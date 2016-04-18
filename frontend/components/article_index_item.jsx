import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/lib/card'
import Link from 'react-toolbox/lib/link'
import Tag from './tag'
import ApiUtil from '../util/api_util'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import ActionBookmark from 'material-ui/lib/svg-icons/action/bookmark';
import ActionBookmarkBorder from 'material-ui/lib/svg-icons/action/bookmark-border';

const ArticleCard = React.createClass({
 	contextTypes: {router: React.PropTypes.object.isRequired},

 	viewArticle: function () {
 		this.context.router.push('article/' + this.props.article.id);
 	},

 	toggleFavorite: function (article_id, e) {
 		e.preventDefault()
 		ApiUtil.toggleFavorite(article_id)
 	},
 	toggleBookmark: function (article_id, e) {
 		e.preventDefault()
 		ApiUtil.toggleBookmark(article_id)
 	},

 	render: function() {
 		var tags, bookmark_style, fav_style;
 		if (this.props.article.user) {
 			bookmark_style = (this.props.article.user.bookmarked_article) ? <ActionBookmark />: <ActionBookmarkBorder />;;
 			fav_style = (this.props.article.user.faved_article) ? <ActionFavorite />: <ActionFavoriteBorder />;
 		}
 		if (this.props.article.tags) {
 			tags = this.props.article.tags.map( t => <Tag key={t.id} tag={t} />);
 		} else {
 			tags = <div />
 		}
 		return (
			  <Card className="article-card" >
			  	<CardTitle
			  		subtitle={this.props.article.tags.map(t => t.name).join(" - ")}
			  	/>
					<CardHeader
						className="article-card-header"
						onClick={() => this.context.router.push("/users/"+this.props.article.author.id)}
						avatar={this.props.article.author.avatar}
						title={this.props.article.author.name}
						subtitle={"Published " + this.props.article.published_at + " ago • " + this.props.article.read_time + " minute read"}
					/>
					<CardMedia onClick={this.viewArticle}>
					  <img className="article-card-image" src={this.props.article.picture} />
					</CardMedia>/>
					<CardTitle
						className="article-card-title"
						onClick={this.viewArticle}
						title={this.props.article.title}
					/>
			    <CardText>
			    	{this.props.article.body}
			    </CardText>
			    <Link className="card-read-more" label="Read More" href={"#/article/"+this.props.article.id} />
			    <CardActions>
			      <IconButton disabled={this.props.noUser} tooltipPosition="top-right" tooltip="favorite" onClick={this.toggleFavorite.bind(this, this.props.article.id)} className="article-index-favorite">
			      	{fav_style}
			      </IconButton>
			      <IconButton disabled={this.props.noUser} tooltipPosition="top-left" tooltip="bookmark" onClick={this.toggleBookmark.bind(this, this.props.article.id)} className="article-index-bookmark">
			      	{bookmark_style}
			      </IconButton>
			    </CardActions>
			  </Card>

 		);
 	}
});
module.exports = ArticleCard