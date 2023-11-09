import React from 'react'

const ReactContext = React.createContext({
  darkMode: '',
  toggleDarkMode: () => {},
  savedVideos: [],
  updateSavedVideos: () => {},
})

export default ReactContext
