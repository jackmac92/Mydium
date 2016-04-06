import React from 'react'
import TagStore from '../stores/tag'
import Sticky from 'react-stickydiv'
import Tag from './tag'
import ApiUtil from '../util/api_util'
import Navigation from 'react-toolbox/lib/navigation'

var Sidebar = React.createClass({

	stateFromStore: function () {
		return {
			featured: TagStore.featured(),
			user: TagStore.user()			
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
		},
		
		componentDidMount: function () {
			this.tagStoreToken = TagStore.addListener(this.__onChange)
			ApiUtil.fetchTagsIndex()
		},

	render: function () {
		var featured_tags, user_tags;
		if (this.state.featured.length > 0) {
			featured_tags = this.state.featured.map (t => <Tag key={t.id} tag={t}/> )
			user_tags = this.state.user.map (t => <Tag className="sidebar-tag" key={t.id} tag={t}/> )
		}
			
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
					</div>
				</ul>

			</section>
		)
	}
});

module.exports = Sidebar;

