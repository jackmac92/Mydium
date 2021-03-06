import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Tag from './tag'
import UserUtil from '../util/user'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'

import Waypoint from 'react-waypoint'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionBookmark from 'material-ui/svg-icons/action/bookmark';
import ActionBookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';

const ArticleCard = React.createClass({
 	contextTypes: {router: React.PropTypes.object.isRequired},

 	viewArticle: function () {
 		this.context.router.push('article/' + this.props.article.id);
 	},

 	toggleFavorite: function (article_id, e) {
 		e.preventDefault()
 		if (this.props.article.user.faved_article) {
 			UserUtil.unMarkFavorite("Article",this.props.article.id)
 		} else {
 			UserUtil.markFavorite("Article",this.props.article.id)
 		}
 	},

 	toggleBookmark: function (article_id, e) {
 		e.preventDefault()
 		if (this.props.article.user.bookmarked_article) {
 			UserUtil.removeBookmark(this.props.article.id)
 		} else {
 			UserUtil.createBookmark(this.props.article.id)
 		}
 	},

 	fetchImage: function() {
	  var placeholder = document.querySelector('#placeholder-'+this.props.article.id);
	  var small = placeholder.querySelector('.img-small')
	  var img = new Image();
	  img.src = small.src;
	  img.onload = () => small.classList.add('loaded')

	  var imgLarge = new Image()
	  imgLarge.src = placeholder.dataset.large
	  imgLarge.onload = () => imgLarge.classList.add('loaded')
	  placeholder.appendChild(imgLarge)
 	},
 	componentDidMount: function() {
 		this.fetchImage()
 	},

 	reveal: function () {
		document.querySelector("#article-card-"+this.props.article.id).classList.add("visible") 		
 	},

 	render: function() {
 		var tags;
 		var bookmark_style = <ActionBookmarkBorder />;
 		var fav_style = <ActionFavoriteBorder />;
 		if (this.props.article.user) {
 			if (this.props.article.user.bookmarked_article) {
	 			bookmark_style = <ActionBookmark />;
 			}
 			if (this.props.article.user.faved_article) {
	 			fav_style = <ActionFavorite />;
 			}
 		}
 		if (this.props.article.tags) {
 			tags = this.props.article.tags.map( t => <Tag key={t.id} tag={t} />);
 		} else {
 			tags = <div />
 		}
 		return (
			  <Card id={"article-card-"+this.props.article.id} className="article-card" >
		 			<Waypoint onEnter={this.reveal} />
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
						<div className="article-card-image placeholder" id={"placeholder-"+this.props.article.id} data-large={this.props.article.picture}>
					  	<img className="img-small" src={this.props.article.loading_pic} />
					  	<div style={{paddingBottom: "50%"}}></div>
						</div>
					</CardMedia>/>
					<CardTitle
						className="article-card-title"
						onClick={this.viewArticle}
						title={this.props.article.title}
					/>
			    <CardText>
			    	{this.props.article.body}
			    </CardText>
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