import React from 'react';

const RepoListItem = (props) => {
  console.log('repoListItem', props)
  return (
  <div>
    <a href={props.repo.url}>{props.repo.repoName}</a>
  </div>
  )
}


export default RepoListItem;