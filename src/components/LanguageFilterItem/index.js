// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateLanguageId} = props
  const {id, language} = languageDetails

  const getBtnId = () => {
    updateLanguageId(id)
  }

  return (
    <li className="filter-list-container1" key={id}>
      <button onClick={getBtnId} className="filter-btn1" type="button">
        <p className="filter-p1">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
