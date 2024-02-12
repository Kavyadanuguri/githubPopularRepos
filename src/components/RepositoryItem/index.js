// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {id, name, starsCount, forksCount, issuesCount, avatarUrl} = itemDetails
  return (
    <li className="item-list-container" key={id}>
      <img className="item-img1" alt={name} src={avatarUrl} />
      <h1 className="item-h1">{name}</h1>
      <div className="item-container1">
        <img
          className="item-star-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
        />
        <p className="item-p1">{starsCount} stars</p>
      </div>
      <div className="item-container1">
        <img
          className="item-star-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="item-p1">{forksCount} forks</p>
      </div>
      <div className="item-container1">
        <img
          className="item-star-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="item-p1">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
