import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'

import ReactContext from '../../context'

import Header from '../Header'
import Sidebar from '../Sidebar'
import GameCard from '../GameCard'

import {
  TrendingMainContainer,
  TrendingHeaderSidebarContainer,
  TrendingTitleContainer,
  TrendingVideoCardContainer,
  TrendingLogoContainer,
  LoaderContainer,
  VideoCardListContainer,
  TrendingHeading,
  ApiFailureContainer,
  FailureImg,
  FailureHeading,
  FailurePara,
  RetryButton,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  sucess: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    totalItems: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const gameUrl = 'https://apis.ccbp.in/videos/gaming'
    const gamesResponse = await fetch(gameUrl, options)

    if (gamesResponse.ok) {
      const gamesList = await gamesResponse.json()
      const updatedList = gamesList.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        totalItems: updatedList,
        apiStatus: apiStatusConstants.sucess,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getData()
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  renderSuccessView = () => {
    const {totalItems} = this.state

    return (
      <ReactContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <VideoCardListContainer isDark={darkMode}>
              {totalItems.map(each => (
                <GameCard key={each.id} item={each} />
              ))}
            </VideoCardListContainer>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  renderFailureView = () => (
    <ReactContext.Consumer>
      {value => {
        const {darkMode} = value
        const failureImg = darkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <ApiFailureContainer isDark={darkMode}>
            <FailureImg src={failureImg} alt="failure view" />
            <FailureHeading> Oops! Something Went Wrong </FailureHeading>
            <FailurePara>
              {' '}
              We are having some trouble to complete your request. Please try
              again{' '}
            </FailurePara>
            <RetryButton onClick={this.onClickRetry} type="button">
              {' '}
              Retry{' '}
            </RetryButton>
          </ApiFailureContainer>
        )
      }}
    </ReactContext.Consumer>
  )

  renderApistatusViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.sucess:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ReactContext.Consumer>
        {value => {
          const {darkMode} = value

          return (
            <TrendingMainContainer data-testid="gaming" isDark={darkMode}>
              <Header selectedOption="Gaming" />
              <TrendingHeaderSidebarContainer>
                <Sidebar selectedOption="Gaming" />

                <TrendingVideoCardContainer>
                  <TrendingTitleContainer
                    data-testid="banner"
                    isDark={darkMode}
                  >
                    <TrendingLogoContainer>
                      <HiFire />
                    </TrendingLogoContainer>
                    <TrendingHeading data-testid="banner" isDark={darkMode}>
                      Gaming
                    </TrendingHeading>
                  </TrendingTitleContainer>

                  {this.renderApistatusViews()}
                </TrendingVideoCardContainer>
              </TrendingHeaderSidebarContainer>
            </TrendingMainContainer>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Gaming
