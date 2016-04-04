import React from 'react'
import {Card,CardMedia,CardTitle,CardText,CardActions} from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import Link from 'react-toolbox/lib/link'
import Tag from './tag'


const ArticleCard = React.createClass({
 	contextTypes: {router: React.PropTypes.object.isRequired},

 	viewArticle: function () {
 		this.context.router.push('article/' + this.props.article.id);
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
 		// debugger
 		return (
	    <li onClick={this.viewArticle} className="article-index-item">
			  <Card style={{width: '720px'}}>
					<CardTitle 
						avatar={this.props.article.author.avatar}
						title={this.props.article.author.email}
						subtitle={this.props.article.created_at + " ago"}
					/>
					<CardTitle 
						title={this.props.article.title}
						subtitle={this.props.article.read_time + " minute read"}
					/>
			    <CardText>{this.props.article.body}</CardText>
			    <Link label="Read More" href={"#/articles/"+this.props.article.id} />
			    <CardActions>
			      <Button icon={"favorite"+bookmark_style} />
			      <Link label={this.props.article.num_responses + " responses"} />
			      <Button icon={"bookmark"+fav_style}  />
			    </CardActions>
			    <CardActions>
		    		{tags}
			    </CardActions>
			  </Card>
	    </li>

 		);
 	}
});
module.exports = ArticleCard