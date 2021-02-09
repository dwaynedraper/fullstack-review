import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    let q = {username: term};
    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(q)
    }).done(
      //TODO
      $.ajax({
        url: '/repos',
        method: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(q)
      })
      .done((data) => {
        this.setState({repos: data})
      })
      .fail((err) => {
        if (err) {
          console.log('GET failed', err)
        }
      }
      )
    ).fail((err) => {
      if (err) {
        console.log('POST failed', err)
      }
    }
    )
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));