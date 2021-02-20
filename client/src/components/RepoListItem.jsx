import React from 'react';

const RepoListItem = (props) => (
  <div>
    <a href={props.repo.url}>{props.repo.repoName}</a>
  </div>
)



export default RepoListItem;