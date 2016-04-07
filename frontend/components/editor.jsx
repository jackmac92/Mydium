import React from 'react'
import Editor from 'react-medium-editor'

var MediumEditor = React.createClass({
  getInitialState: function() {
    return {text: 'Fusce dapibus, tellus ac cursus commodo'}
  },

  render: function () {
    return (
      <div>
        <h3>Editor</h3>
        <Editor
          text={this.state.text}
          onChange={this.handleChange}
        />
        <textarea cols="30" rows="10">
        	{this.state.text}
        </textarea>
      </div>
    );
  },

  handleChange: function (text, medium) {
    this.setState({text: text});
  }
});
module.exports = MediumEditor