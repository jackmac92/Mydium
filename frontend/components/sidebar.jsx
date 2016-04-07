import React from 'react'
import TagStore from '../stores/tag'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import Tag from './tag'
import ApiUtil from '../util/api_util'
import Navigation from 'react-toolbox/lib/navigation'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


var Sidebar = React.createClass({

	stateFromStore: function () {
		return {
			featured: TagStore.featured(),
			user: TagStore.user(),
			top: ArticleStore.topArticles()
			}
		},
	__onChange: function () {
			this.setState(this.stateFromStore())
		},

		getInitialState: function () {
			return this.stateFromStore()
		},
		componentWillUnmount: function () {
			this.tagStoreToken.remove()
			this.articleStoreToken.remove()
		},
		
		componentDidMount: function () {
			this.tagStoreToken = TagStore.addListener(this.__onChange)
			this.articleStoreToken = ArticleStore.addListener(this.__onChange)
			ApiUtil.fetchTagsIndex()
			ApiUtil.fetchTopArticles()
		},

	render: function () {
		var featured_tags, user_tags, top_stories;
		if (this.state.featured.length > 0) {
			featured_tags = this.state.featured.map (t => <Tag key={t.id} tag={t}/> )
			if (SessionStore.isLoggedIn()) {
				user_tags = this.state.user.map (t => <Tag className="sidebar-tag" key={t.id} tag={t}/> )
			}
		}
		top_stories = this.state.top.map( a => 
			<ListItem primaryText={a.title+" ("+a.num_views+")"} secondaryText={"By "+a.author.name+" in "+a.tags[0].name} /> 
		)
		return (
			<section className="content-sidebar">
				<ul>
					<li>
						<h3>Featured Tags</h3>
						<hr />
						<Navigation>
							{featured_tags}
						</Navigation>
					</li>
					<div id="sidebar-sticky">
						<li>
							<h3>Your Tags</h3>
							<hr />
							{user_tags}
						</li>
						<li>Top Stories</li>
						<hr />
						<List>
							{top_stories}
						</List>
					</div>
				</ul>

			</section>
		)
	}
});

module.exports = Sidebar;

