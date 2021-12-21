import React from 'react'

const UserContext = React.createContext({
  token: '',
  isAuthenticated: false,
  tokenTimer: null,
  userRole: '',
  userEmail: '',
  logIn: () => {},
  logOut: () => {}
})

export default UserContext