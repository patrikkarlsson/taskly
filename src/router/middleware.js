const isAuthenticated = ({ next, userProvider, routeNames }) => {
  const { isLoggedIn } = userProvider.state
  if (!isLoggedIn) {
    return next({ name: routeNames.SIGN_IN })
  }
  next()
}

export { 
  isAuthenticated,
}
