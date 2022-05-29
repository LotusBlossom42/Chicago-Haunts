import React, { useState } from "react"
import ErrorList from "./ErrorList"

const INITIAL_STATE = {
  username: "",
  rating: "",
  comment: ""
}

const ReviewForm = props => {
  const [newReview, setNewReview] = useState(INITIAL_STATE)

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearInput = event => {
    event.preventDefault()
    setNewReview(INITIAL_STATE)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isValidForSubmission()) {
      props.addReview(newReview)
      clearInput(event)
    }
  }

  const isValidForSubmission = () => {
    if (
      newReview.username.trim() &&
      newReview.rating >= 1 &&
      newReview.rating <= 5
    ) {
      return true
    } else {
      const newErrors = {}
      if (!newReview.username.trim()) {
        newErrors["Username"] = "cannot be blank"
      }
      if (newReview.rating > 5 || newReview.rating < 1 || !newReview.rating) {
        newErrors["Review"] = "must be between 1 - 5"
      }
      props.setErrors(newErrors)
      return false
    }
  }

  return (
    <div>
      <div className="row">
        <div></div>
        <div id="content3">
          <form
            className="form-content"
            id="new-site-form3"
            onSubmit={handleSubmit}
          >
            <h2 className="haunted-form-header">Add a Review</h2>
            {props.errors && <ErrorList errors={props.errors} />}
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline mb-4">
                  <form role="form">
                    <div className="form-group">
                      <label className="form-label" htmlFor="username">
                        Username: <span className="required"></span>
                      </label>
                      <input
                        className="form-review"
                        name="username"
                        id="username"
                        type="text"
                        placeholder="Funkier the better 🥸"
                        value={newReview.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <div className="form-group">
                        <label htmlFor="rating">
                          Rating: <span className="required"></span>
                        </label>
                        <input
                          className="form-review"
                          name="rating"
                          id="rating"
                          type="number"
                          min="1"
                          max="5"
                          step="1"
                          placeholder="1-5"
                          value={newReview.rating}
                          onChange={handleInputChange}
                        />
                        <div className="form-outline mb-4">
                          <div className="form-group">
                            <label htmlFor="comment">
                              Enter Your Comment Here: {"(Optional)"}:
                            </label>
                            <input
                              className="form-review"
                              name="comment"
                              id="comment"
                              type="text"
                              placeholder="Comment Here..."
                              value={newReview.comment}
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
                    value="Submit Review"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewForm
