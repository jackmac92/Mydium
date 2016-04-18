import React from 'react'
import TagStore from '../stores/tag'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import Tag from './tag'
import ApiUtil from '../util/api_util'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


var Sidebar = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

	stateFromStore: function () {
		return {
			featured: TagStore.featured(),
			user_tags: TagStore.user(),
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
		var featured_tags, user_tags_section, top_stories;
		if (this.state.featured.length > 0) {
			featured_tags = this.state.featured.map (t => <Tag key={t.id} tag={t}/> )
			if (SessionStore.isLoggedIn() && this.state.user_tags.length > 0) {
				var user_tags = this.state.user_tags.map( ut => <Tag className="sidebar-tag" key={ut.id} tag={ut}/> )
				user_tags_section = (
					<li>
						<h3>Your Tags</h3> <a href="/#/tagselect">(Edit)</a>
						<hr />
						{user_tags}
					</li>
					)
			}
		}
		top_stories = this.state.top.map( a => 
			<ListItem onClick={() => this.context.router.push("/article/"+a.id)} key={a.id} primaryText={a.title} secondaryText={"By "+a.author.name+" in "+a.tags[0].name} /> 
		)
		return (
			<div id="sidebar-wrap">
				<section id="content-sidebar">
					<ul>
						<li>
							<h3>Featured Tags</h3>
							<hr />
								{featured_tags}
						</li>
						<div>
							{user_tags_section}
							<li>Top Stories</li>
							<hr />
							<List>
								{top_stories}
							</List>
						</div>
					</ul>

				</section>
			</div>
		)
	}
});

module.exports = Sidebar;

