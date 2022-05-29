import React from "react"
import { Link, useHistory } from "react-router-dom"
import "../assets/scss/siteTile.scss"
import "../../../../main/resources/static/images/Qtr-Ghost.png"

const HauntedSiteTile = props => {
  const history = useHistory()
  const { id, name, imgUrl, description, reviews } = props.site

  const averageRating = () => {
    let sum = 0
    reviews.forEach(review => {
      sum += review.rating
    })
    return sum / reviews.length
  }
  const getFractionGhosts = () => {
    let fraction = averageRating() % 1

    if (fraction !== 0) {
      if (fraction <= 0.25) {
        return <img className="ghost-pic" src="images/Qtr-Ghost.png" />
      } else if (fraction <= 0.5) {
        return <img className="ghost-pic" src="images/Half-Ghost.png" />
      } else if (fraction <= 0.75) {
        return <img className="ghost-pic" src="images/3Qtr-Ghost.png" />
      }
    }
  }
  const getWholeGhosts = () => {
    let ghosts = ""
    for (let i = Math.floor(averageRating()); i > 0; i--) {
      ghosts += "👻"
    }
    return ghosts
  }

  return (
    <>
      <div className="day-card tileShadow">
        <input
          type="checkbox"
          id={`card${id}`}
          className="more"
          aria-hidden="true"
        />
        <div className="content">
          <div
            className="front"
            style={{
              backgroundImage: `url(${imgUrl})`
            }}
          >
            <div className="inner">
              <span className="tileName">{name}</span>
              <label
                htmlFor={`card${id}`}
                className="button"
                aria-hidden="true"
              >
                Details
              </label>
            </div>
          </div>
          <div className="back">
            <div className="inner">
              <div className="description">
                <button
                  id="showLink-button"
                  onClick={() => history.push(`/haunted-sites/${id}`)}
                >
                  See reviews for {name}{" "}
                </button>
                <p>{description}</p>
              </div>
              <div className="average font-face-cr">Spook-O-Meter</div>
              <div className="rating">
                {getWholeGhosts()}
                {getFractionGhosts()} out of 5!
              </div>
              <label
                htmlFor={`card${id}`}
                className="button return"
                aria-hidden="true"
              >
                &#62;&#62;&#62;
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HauntedSiteTile
