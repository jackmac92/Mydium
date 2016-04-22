import React from 'react'
import TagStore from '../stores/tag'
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import Tag from './tag'
import ApiUtil from '../util/api_util'

import FlatButton from 'material-ui/lib/flat-button'
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
			var sidebarSticky = document.querySelector('#sidebar-fixed');
			var sidebarStickyPos = document.querySelector('#featured-tags').getBoundingClientRect().bottom;
			window.addEventListener('scroll', () => {
				if (window.pageYOffset >= sidebarStickyPos + 77) {
					sidebarSticky.style.position = 'fixed';
					sidebarSticky.style.marginRight = "70px"
					sidebarSticky.style.top = '67px'

				} else {
					sidebarSticky.style.position = 'static';
					sidebarSticky.style.marginRight = ""
					sidebarSticky.style.top = '';					
				}
			})

		},

	render: function () {
		var featured_tags, user_tags_section, top_stories;
		if (this.state.featured.length > 0) {
			featured_tags = this.state.featured.map (t => <Tag key={t.id} tag={t}/> )
			if (SessionStore.isLoggedIn() && this.state.user_tags.length > 0) {
				var user_tags = this.state.user_tags.map( ut => <Tag className="sidebar-tag" key={ut.id} tag={ut}/> )
				user_tags_section = (
					<li>
						<div className="user-tags">
							<h3 style={{display:"inline"}}>Your Tags</h3> 
							<FlatButton onClick={() => this.context.router.push("/tagselect")} label="edit" />
						</div>
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
						<li id="featured-tags">
							<h3>Featured Tags</h3>
							<hr />
								{featured_tags}
						</li>
						<div id="sidebar-fixed" >
							{user_tags_section}
							<li>Top Stories</li>
							<hr />
							<List style={{background:"transparent"}}>
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

