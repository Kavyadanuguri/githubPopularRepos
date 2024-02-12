import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const stagesList = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    fetchedData: [],
    parameter: languageFiltersData[0].id,
    stage: stagesList.initial,
    isValue: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {parameter} = this.state
    this.setState({isValue: true})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${parameter}`
    const response = await fetch(apiUrl)

    /* const url = `https://apis.ccbp.in/popular-repos?language=${parameter}`
    const response = await fetch(url) */

    const data = await response.json()
    if (response.ok === true) {
      const element = data.popular_repos
      const updatedData = element.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        fetchedData: updatedData,
        stage: stagesList.success,
        isValue: false,
      })
    } else {
      this.setState({stage: stagesList.failure})
    }
  }

  updateLanguageId = id => {
    this.setState({parameter: id}, this.getData)
  }

  renderDisplayStage = () => {
    const {fetchedData, parameter, isValue} = this.state
    console.log(parameter)
    return (
      <div>
        {!isValue ? (
          <ul className="main-ul-con2">
            {fetchedData.map(each => (
              <RepositoryItem key={each.id} itemDetails={each} />
            ))}
          </ul>
        ) : (
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        )}
      </div>
    )
  }

  renderLoadingStage = props => {
    console.log(props)
    return (
      <div data-testid="loader" className="loading-container">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderFailureStage = props => {
    console.log(props)
    return (
      <div>
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
          alt="failure view"
        />
      </div>
    )
  }

  renderStage = props => {
    const {stage} = this.state
    console.log(props)
    switch (stage) {
      case stagesList.success:
        return this.renderDisplayStage()
      case stagesList.initial:
        return this.renderLoadingStage()
      case stagesList.failure:
        return this.renderFailureStage()
      default:
        return null
    }
  }

  render() {
    const {fetchedData, parameter, stage} = this.state
    console.log(parameter, stage)
    console.log(fetchedData)
    return (
      <div className="bg-container">
        <h1 className="main-h1">Popular</h1>
        <ul className="main-ul-con">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageDetails={each}
              updateLanguageId={this.updateLanguageId}
            />
          ))}
        </ul>
        {this.renderStage()}
      </div>
    )
  }
}
export default GithubPopularRepos
