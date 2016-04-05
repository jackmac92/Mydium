import React from 'react'
import {Card,CardMedia,CardTitle,CardText,CardActions} from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import Link from 'react-toolbox/lib/link'
import Tag from './tag'
import ApiUtil from '../util/api_util'


const ArticleCard = React.createClass({
 	contextTypes: {router: React.PropTypes.object.isRequired},

 	viewArticle: function () {
 		this.context.router.push('article/' + this.props.article.id);
 	},
 	toggleFavorite: function (article_id) {
 		ApiUtil.toggleFavorite(article_id)
 	},
 	toggleBookmark: function (article_id) {
 		ApiUtil.toggleBookmark(article_id)
 	},

 	render: function() {
 		var tags, bookmark_style, fav_style;
 		if (this.props.article.user) {
 			bookmark_style = (this.props.article.user.bookmarked_article) ? "":"_border";
 			fav_style = (this.props.article.user.faved_article) ? "":"_border";
 		}
 		if (this.props.article.tags) {
 			tags = this.props.article.tags.map( t => <Tag key={t.id} tag={t} />);
 		} else {
 			tags = <div />
 		}

 		return (
			  <Card className="article-card group" onClick={this.viewArticle} >
					<CardTitle 
						avatar={this.props.article.author.avatar}
						title={this.props.article.author.email}
						subtitle={"Published " + this.props.article.created_at + " ago • " + this.props.article.read_time + " minute read"}
					/>
					<CardTitle 
						title={this.props.article.title}
					/>
			    <CardText>{this.props.article.body}</CardText>
			    <Link label="Read More" href={"#/articles/"+this.props.article.id} />
			    <CardActions>
			      <Button className="article-index-favorite" icon={"favorite"+bookmark_style} />
			      <Button className="article-index-bookmark" icon={"bookmark"+fav_style}  />
			    </CardActions>
			    <CardActions>
			    	<h5>Tags</h5>
		    		{tags}
			    </CardActions>
			  </Card>

 		);
 	}
});
module.exports = ArticleCard