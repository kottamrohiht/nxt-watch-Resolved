import {withRouter} from 'react-router-dom'
import {Component} from 'react'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'
import {FiLogOut, FiSun, FiMenu} from 'react-icons/fi'
import {MdClose} from 'react-icons/md'

import ReactContext from '../../context'
import HomeSidebar from '../HomeSidebar'

import {
  HeaderContainer,
  HeaderInnerContainer,
  HeaderImg,
  HeaderButton,
  IconContainer,
  IconButton,
  TriggerButton,
  UnOrderList,
  LargerDeviceIconContainer,
  Profile,
  LogoutButton,
  LogoutButtonSmall,
  PopupContentContainer,
  LogoutPara,
  PopupInnerContainer,
  CancelButton,
  ConfirmButton,
} from './styledComponents'

const homeButtons = [
  {
    id: 1,
    iconImg: 'AiFillHome',
    displayText: 'Home',
    path: '/',
  },
  {
    id: 2,
    iconImg: 'HiFire',
    displayText: 'Trending',
    path: '/trending',
  },
  {
    id: 3,
    iconImg: 'SiYoutubegaming',
    displayText: 'Gaming',
    path: '/gaming',
  },
  {
    id: 4,
    iconImg: 'MdPlaylistAdd',
    displayText: 'Saved Videos',
    path: '/saved-videos',
  },
]

class Header extends Component {
  state = {
    navBarOpen: false,
  }

  onClicknavBarOpen = () => {
    console.log('ddddd')
    this.setState(prevState => ({
      navBarOpen: !prevState.navBarOpen,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderHeader = () => {
    const {selectedOption} = this.props

    return (
      <ReactContext.Consumer>
        {value => {
          const {navBarOpen} = this.state
          const {darkMode, toggleDarkMode} = value
          const imgUrl = darkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const changeMode = () => {
            toggleDarkMode()
          }

          return (
            <HeaderInnerContainer isDark={darkMode}>
              <HeaderButton>
                <HeaderImg src={imgUrl} alt="website logo" />
              </HeaderButton>

              <IconContainer>
                <IconButton
                  data-testid="theme"
                  onClick={changeMode}
                  type="button"
                  isDark={darkMode}
                >
                  {darkMode ? <FiSun /> : <FaMoon />}
                </IconButton>

                <Popup
                  position="bottom right"
                  trigger={
                    <TriggerButton
                      onClick={this.onClicknavBarOpen}
                      type="button"
                      isDark={darkMode}
                    >
                      {navBarOpen ? <MdClose /> : <FiMenu />}
                    </TriggerButton>
                  }
                  className="popup-content"
                >
                  <UnOrderList isDark={darkMode}>
                    {homeButtons.map(each => (
                      <HomeSidebar
                        key={each.id}
                        item={each}
                        selectedItem={selectedOption === each.displayText}
                      />
                    ))}
                  </UnOrderList>
                </Popup>

                <Popup
                  modal
                  trigger={
                    <LogoutButtonSmall type="button" isDark={darkMode}>
                      <FiLogOut />
                    </LogoutButtonSmall>
                  }
                  className="popup-content"
                >
                  {close => (
                    <PopupContentContainer isDark={darkMode}>
                      <LogoutPara> Are you sure want to logout? </LogoutPara>

                      <PopupInnerContainer>
                        <CancelButton
                          onClick={() => close()}
                          type="button"
                          isDark={darkMode}
                        >
                          Cancel
                        </CancelButton>

                        <ConfirmButton
                          onClick={this.onClickLogout}
                          type="button"
                          isDark={darkMode}
                        >
                          Confirm
                        </ConfirmButton>
                      </PopupInnerContainer>
                    </PopupContentContainer>
                  )}
                </Popup>
              </IconContainer>

              <LargerDeviceIconContainer>
                <IconButton
                  onClick={changeMode}
                  type="button"
                  isDark={darkMode}
                >
                  {darkMode ? <FiSun /> : <FaMoon />}
                </IconButton>

                <IconButton type="button" isDark={darkMode}>
                  <Profile
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="nxt watch logo"
                  />
                </IconButton>

                <Popup
                  trigger={
                    <LogoutButton type="button" isDark={darkMode}>
                      Logout
                    </LogoutButton>
                  }
                  className="popup-content"
                >
                  {close => (
                    <PopupContentContainer isDark={darkMode}>
                      <LogoutPara> Are you sure want to logout? </LogoutPara>

                      <PopupInnerContainer>
                        <CancelButton
                          onClick={() => close()}
                          type="button"
                          isDark={darkMode}
                        >
                          Cancel
                        </CancelButton>

                        <ConfirmButton
                          onClick={this.onClickLogout}
                          type="button"
                          isDark={darkMode}
                        >
                          Confirm
                        </ConfirmButton>
                      </PopupInnerContainer>
                    </PopupContentContainer>
                  )}
                </Popup>
              </LargerDeviceIconContainer>
            </HeaderInnerContainer>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  render() {
    return <HeaderContainer>{this.renderHeader()}</HeaderContainer>
  }
}

export default withRouter(Header)
