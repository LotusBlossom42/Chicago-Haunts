import React, { useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"

const LandingPage = props => {
  const history = useHistory()
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current.volume = 0.04
  })

  return (
    <div className="jumbotron jumbotron-fluid showcase">
      <div className="container">
        <div className="display-4 font-face-br smoke">
          <span>W</span>
          <span>e</span>
          <span>l</span>
          <span>c</span>
          <span>o</span>
          <span>m</span>
          <span>E</span>
          <span>
            <br />
          </span>
          <span>
            <button
              className="font-face-ns"
              id="enter-button"
              onClick={() => history.push("/haunted-sites")}
            >
              EnteR
            </button>
          </span>
          <span>
            <br />
          </span>
          <span>I</span>
          <span>f</span>
          <span>&nbsp;</span>
          <span>Y</span>
          <span>o</span>
          <span>u</span>
          <span>&nbsp;</span>
          <span>D</span>
          <span>a</span>
          <span>r</span>
          <span>E</span>
          <span>&nbsp;</span>
        </div>
        <audio
          className="audioPlayer"
          id="player"
          autoPlay
          controls
          preload="metadata"
          loop
          ref={audioRef}
        >
          <source src="audio/dangerousound.ogg" type="audio/ogg"></source>
        </audio>
      </div>
    </div>
  )
}

export default LandingPage