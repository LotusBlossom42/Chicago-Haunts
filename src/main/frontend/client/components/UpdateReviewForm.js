import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import _ from "lodash"

import ErrorList from "./ErrorList"

const UpdateReviewForm = props => {
  const [updatedReview, setUpdatedReview] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [reviewId, setReviewId] = useState(props.match.params.id)
  const [errors, setErrors] = useState({})

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setUpdatedReview(responseBody.review)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const updateReview = async updatedReview => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedReview)
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

  const handleInputChange = event => {
    setUpdatedReview({
      ...updatedReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isValidForSubmission()) {
      updateReview(updatedReview)
    }
  }

  const isValidForSubmission = () => {
    if (
      updatedReview.username.trim() &&
      updatedReview.rating >= 1 &&
      updatedReview.rating <= 5
    ) {
      return true
    } else {
      const newErrors = {}
      if (!updatedReview.username.trim()) {
        newErrors["Username"] = "cannot be blank"
      }
      if (
        updatedReview.rating > 5 ||
        updateReview.rating < 1 ||
        !updatedReview.rating
      ) {
        newErrors["Review"] = "must be between 1 - 5"
      }
      setErrors(newErrors)
      return false
    }
  }

  useEffect(() => {
    fetchReview()
  }, [])

  if (shouldRedirect) {
    return (
      <Redirect push to={`/haunted-sites/${updatedReview.hauntedSite.id}`} />
    )
  }

  return (
    <div>
      <div className="row">
        <div></div>
        <div id="content2">
          <form
            className="form-content"
            id="new-site-form2"
            onSubmit={handleSubmit}
          >
            <h2 className="haunted-form-header">Edit Review</h2>
            <ErrorList errors={errors} />
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline mb-4">
                  <form role="form">
                    <div className="form-group">
                      <label className="form-label" htmlFor="username">
                        Username: <span className="required"></span>
                      </label>
                      <input
                        className="form"
                        name="username"
                        id="username"
                        type="text"
                        placeholder="Funkier the better 🥸"
                        value={updatedReview.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <div className="form-group">
                        <label htmlFor="rating">
                          Rating: <span className="required"></span>
                        </label>
                        <input
                          className="form"
                          name="rating"
                          id="rating"
                          type="number"
                          min="1"
                          max="5"
                          step="1"
                          placeholder="1-5"
                          value={updatedReview.rating}
                          onChange={handleInputChange}
                        />
                        <div className="form-outline mb-4">
                          <div className="form-group">
                            <label htmlFor="comment">
                              Comment {"(Optional)"}:
                            </label>
                            <input
                              className="form"
                              name="comment"
                              id="comment"
                              type="text"
                              placeholder="Again....Grammerly"
                              value={updatedReview.comment}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  <input
                    className="btn btn-primary btn-block mb-4 button"
                    type="submit"
                    value="Submit Edited Review"
                  />
                </div>
              </div>
            </div>
          </form>
          {!_.isEmpty(updatedReview) && (
            <Link to={`/haunted-sites/${updatedReview.hauntedSite.id}`}>
              Go Back
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateReviewForm
