import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"

import HauntedSiteTile from "./HauntedSiteTile"

const HauntedSitesIndex = props => {
  const history = useHistory()
  const [sites, setSites] = useState([])
  const audioRef = useRef(null)

  const fetchSites = async () => {
    try {
      const response = await fetch("/api/v1/haunted-sites")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setSites(responseBody.sites)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  useEffect(() => {
    fetchSites()
    audioRef.current.volume = 0.005
  }, [])

  const siteTiles = sites.map(site => {
    return <HauntedSiteTile key={site.id} site={site} />
  })

  return (
    <div className="darken">
      <div className="flag"></div>
      <div className="header-wrapper">
        <h1 className="font-face-br title glitch" data-text="HaunteD Chicago">
          HaunteD Chicago
        </h1>
        <audio
          className="audioPlayer2"
          autoPlay
          controls
          preload="metadata"
          loop
          ref={audioRef}
        >
          <source src="audio/Bach_remix.ogg" type="audio/ogg"></source>
        </audio>
        <button
          className="font-face-ns align"
          id="home-button"
          onClick={() => history.push("/")}
        >
          Home
        </button>
        <button
          className="font-face-ns align"
          id="addSite-button"
          onClick={() => history.push("/haunted-sites/new")}
        >
          Add a Haunted Site
        </button>
      </div>
      <div className="siteTilesParentDiv">{siteTiles}</div>
    </div>
  )
}

export default HauntedSitesIndex
