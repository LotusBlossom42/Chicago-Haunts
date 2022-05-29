import React, { useEffect } from "react"
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"

import HauntedSitesIndex from "./HauntedSitesIndex"
import HauntedSiteShow from "./HauntedSiteShow"
import NewHauntedSiteForm from "./NewHauntedSiteForm"
import LandingPage from "./LandingPage"
import UpdateReviewForm from "./UpdateReviewForm"
import UpdateHauntedSiteForm from "./UpdateHauntedSiteForm"

const App = props => {
  const { pathname } = useLocation()

  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/haunted-sites" component={HauntedSitesIndex} />
      <Route exact path="/haunted-sites/new" component={NewHauntedSiteForm} />
      <Route exact path="/haunted-sites/:id" component={HauntedSiteShow} />
      <Route exact path="/haunted-sites/:id/edit" component={UpdateHauntedSiteForm} />
      <Route exact path="/reviews/:id/edit" component={UpdateReviewForm} />
    </Switch>
  )
}

export default hot(App)