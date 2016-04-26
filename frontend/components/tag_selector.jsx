var React = require('react');
import {List, ListItem} from 'material-ui/List'
import AutoComplete from 'material-ui/AutoComplete';
import TagStore from '../stores/tag'
import SessionStore from '../stores/session'
import ApiUtil from '../util/api_util'
import { MenuItem } from 'material-ui/Menu';

var TagSelector = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},
	stateFromStore: function () {
		return {
			tags: TagStore.all(),
			userTags: SessionStore.userTags()
		}
	},
	__onChange: function () {
		this.setState(this.stateFromStore())
	},

	getInitialState: function () {
		var init = this.stateFromStore()
		init.query = ""
		return init
	},

	componentWillUnmount: function () {
		this.tagStoreToken.remove()
		this.sessionStoreToken.remove()
	},
	
	componentDidMount: function () {
		this.tagStoreToken = TagStore.addListener(this.__onChange)
		this.sessionStoreToken = SessionStore.addListener(this.__onChange)
		ApiUtil.fetchTagsIndex()
		ApiUtil.fetchUserTags()
	},
	handleRequest: function (input, dataStoreId) {
		if (dataStoreId) {
			this.setState({query:""})
			ApiUtil.tagFollowCreate(input.value.props.tag.id)
		};
	},
	render: function() {
		var dataStore = [];
		if (this.state.tags) {
			dataStore = this.state.tags.map( function(tag) {
				return {
					text: tag.name,
					value:( <MenuItem key={tag.id} tag={tag} primaryText={tag.name} /> )
				}
			})
		}
		var userTagList = this.state.userTags.map( t => 
			<ListItem key={t.id} primaryText={t.name} onClick={() => ApiUtil.tagFollowDestroy(t.id)} />
		)
		return (
			<div>
				<AutoComplete
						searchText={this.state.query}
		     		floatingLabelText="Pick Your Tags"
			    	filter={AutoComplete.fuzzyFilter}
			      onNewRequest={this.handleRequest}
			      dataSource={dataStore} />
		    <h3>Here are the tags you currently follow</h3>
		    <h6>Click a tag below to remove it from your list</h6>
				<List>
					{userTagList}
				</List>
			</div>
		);
	}

});

module.exports = TagSelector;