React = require('react')
TagStore = require '../stores/tag'
Sticky = require 'react-stickydiv'
Tag = require './tag'
ApiUtil = require '../util/api_util'


Sidebar = React.createClass
	stateFromStore: ->
		featured: TagStore.featured()
		user: TagStore.user()
	__onChange: ->
		@setState @stateFromStore()
	getInitialState: ->
		@stateFromStore()
	componentWillUnmount: ->
		@tagStoreToken.remove()
	componentDidMount: ->
		@tagStoreToken = TagStore.addListener(@__onChange)
		ApiUtil.fetchTagsIndex()

	render: ->
		if @state.featured.length > 0
			featured_tags = @state.featured.map (t) -> <Tag key={t.id} tag={t}/> 
			user_tags = @state.user.map (t) -> <Tag key={t.id} tag={t}/> 
		<section className="content-sidebar">
			<ul>
				<li>
					<h3>Featured Tags</h3>
					<hr />
					<ul>
						{featured_tags}
					</ul>
				</li>
				<Sticky>
					<li>
						<h3>Your Tags</h3>
						<hr />
						<ul>
							{user_tags}
						</ul>
					</li>
					<li>Top Stories</li>
					<hr />
				</Sticky>
			</ul>

		</section>

module.exports = Sidebar

