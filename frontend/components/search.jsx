var React = require('react');
var SearchStore = require('../stores/search')
var ApiUtil = require('../util/api_util');

var Search = React.createClass({
  
  getInitialState: function () {
    return { query: "" };
  },
  
  componentDidMount: function () {
    this.storeListener = SearchStore.addListener(
      this._onChange
    );
  },
  
  componentWillUnmount: function () {
    this.storeListener.remove();
  },
  
  _onChange: function () {
    this.setState({results: SearchStore.all()});
  },
  
  handleInputChange: function (e) {
    var query = e.currentTarget.value;
    this.setState({ query: query }, function () {      
      if (query.length > 2) {
        this.search();
      }
    }.bind(this));
  },
  
  search: function (e) {
    ApiUtil.search(this.state.query, 1);
  },
  
  nextPage: function () {
    var meta = SearchStore.meta();
    ApiUtil.search(meta.query, meta.page + 1);
  },
  
  resultLis: function () {

    return SearchStore.all().map(function (result) {
      if (result._type === "User") {
        return (
          <li key={ result.id }>
            User #{ result.id }: { result.name || result.email }
          </li>
        );          
      } else if (result._type == "Article"){
        return (
          <li key={ result.id }>
            Article #{ result.id }: { result.title }
          </li>
        );  

      }
    });
  },
  
  render: function () { 
    var meta = SearchStore.meta();
    return (
      <article>
        <input type="text" onChange={ this.handleInputChange } />
        <button onClick={ this.search }>GO</button>
        
        <nav>
          Displaying page { meta.page } of { meta.total_pages }
          <button onClick={ this.nextPage }>NEXT PAGE</button>
        </nav>
      
        <ul>
          { this.resultLis() }
        </ul>
      </article>
    );
  }
  
});

module.exports = Search;