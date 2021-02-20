import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, index) => {
      return <RepoListItem repo={repo} key={'repo' + index}/>
    })}

  </div>
)

export default RepoList;