import React, { useEffect, useState } from "react"
import { useLocation, Redirect, useHistory } from "react-router-dom"
import "../assets/scss/showPage.scss"
import "../assets/scss/main.scss"

import ReviewForm from "./ReviewForm"

import ReviewTile from "./ReviewTile"

const HauntedSiteShow = props => {
  const history = useHistory()
  let location = useLocation()
  const [site, setSite] = useState({ reviews: [] })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const fetchSite = async () => {
    try {
      const siteId = props.match.params.id
      const response = await fetch(`/api/v1/haunted-sites/${siteId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setSite(responseBody.site)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const addReview = async formPayload => {
    const siteId = props.match.params.id
    formPayload.siteId = siteId
    try {
      const response = await fetch(`/api/v1/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        if (response.status === 404) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }
      const body = await response.json()
      fetchSite()
      setShowReviewForm(false)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteReview = async id => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(id)
      })

      if (!response.ok) {
        if (response.status === 404) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }
      fetchSite()
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteSite = async id => {
    try {
      const response = await fetch(`/api/v1/haunted-sites/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ id: id })
      })

      if (!response.ok) {
        if (response.status === 404) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleSiteDelete = () => {
    deleteSite(site.id)
  }

  const toggleReviewForm = event => {
    event.preventDefault()
    setShowReviewForm(!showReviewForm)
  }

  useEffect(() => {
    fetchSite()
  }, [location.pathname])

  const reviewTiles = site.reviews.map(review => {
    const handleDelete = () => {
      deleteReview(review.id)
    }
    return (
      <ReviewTile
        key={review.id}
        review={review}
        handleDelete={handleDelete}
        reviews={site.reviews}
      />
    )
  })

  if (shouldRedirect) {
    return <Redirect push to={`/haunted-sites`} />
  }

  return (
    <div className="container container-fluid showWrapper" id="reviewWrapper">
      <div className="row">
        <div className="col-7 left">
          <div className="card showPageDiv">
            <img
              className="siteImg card-img-top"
              src={site.imgUrl}
              alt={`Image of ${site.name}`}
            />
            <div className="card-body">
              <h1 className="site-name card-title">{site.name}</h1>
              <p className="site-description card-text">{site.description}</p>
              <a className="site-url" href={site.websiteUrl} target="_blank">
                {site.name}'s website
              </a>
              <br></br>
              <button
                className="font-face-ns btn btn-primary"
                id="btn1"
                onClick={() => history.push(`/haunted-sites/${site.id}/edit`)}
              >
                Update Haunted Site
              </button>
              <button
                className="btn btn-danger"
                id="btn2"
                onClick={handleSiteDelete}
              >
                Delete Haunted Site
              </button>
            </div>
          </div>
          <div></div>
        </div>
        <div className="col-5 right">
          <div>
            {showReviewForm && (
              <ReviewForm
                addReview={addReview}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {reviewTiles.length > 0 ? (
              <div>
                <div>
                  <button
                    type="button"
                    className="back-button"
                    id="backButton"
                    onClick={() => history.push("/haunted-sites")}
                  >
                    &#60; &#60; &#60;Go Back
                  </button>
                  <br></br>
                  <button
                    type="button"
                    id="writeButton"
                    className="write-button"
                    onClick={toggleReviewForm}
                  >
                    Write a review!&#62; &#62; &#62;
                  </button>
                  <br></br>
                  <div className="row">
                    <div className="panel panel-default widget">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          &nbsp; &nbsp; Reviews for {site.name}
                        </h3>
                        <div className="panel-body">
                          <ul className="list-group">
                            <span className="label label-info">
                              {reviewTiles.length} reviews
                            </span>
                            {reviewTiles}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="back-button"
                  id="backButton"
                  onClick={() => history.push("/haunted-sites")}
                >
                  &#60; &#60; &#60;Back
                </button>
                <br></br>
                <button
                  type="button"
                  className="write-button"
                  id="writeButton"
                  onClick={toggleReviewForm}
                >
                  Write a review!
                </button>
                <br></br>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HauntedSiteShow
