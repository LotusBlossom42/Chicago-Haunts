import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"

import ErrorList from "./ErrorList"

const UpdateHauntedSiteForm = props => {
  const [hauntedSite, setHauntedSite] = useState({})
  const [hauntedSiteId, setHauntedSiteId] = useState(props.match.params.id)
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const fetchSite = async () => {
    try {
      const response = await fetch(`/api/v1/haunted-sites/${hauntedSiteId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setHauntedSite(responseBody.site)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const updateSite = async updatedSite => {
    try {
      const response = await fetch(`/api/v1/haunted-sites/${hauntedSiteId}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedSite)
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

  const isValidForSubmission = () => {
    if (
      hauntedSite.name.trim() &&
      hauntedSite.imgUrl.trim() &&
      hauntedSite.websiteUrl.trim()
    ) {
      return true
    } else {
      const newErrors = {}
      if (!hauntedSite.name.trim()) {
        newErrors["Name"] = "cannot be blank"
      }
      if (!hauntedSite.imgUrl.trim()) {
        newErrors["Image URL"] = "cannot be blank"
      }
      if (!hauntedSite.websiteUrl.trim()) {
        newErrors["Website URL"] = "cannot be blank"
      }
      setErrors(newErrors)
      return false
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isValidForSubmission()) {
      updateSite(hauntedSite)
    }
  }

  const handleInputChange = event => {
    setHauntedSite({
      ...hauntedSite,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  useEffect(() => {
    fetchSite()
  }, [])

  if (shouldRedirect) {
    return <Redirect push to={`/haunted-sites/${hauntedSiteId}`} />
  }

  return (
    <div>
      <div className="row">
        <div></div>
        <div id="content">
          <form id="new-site-form" onSubmit={handleSubmit}>
            <h1 className="haunted-form-header">Edit Haunted Location</h1>
            <ErrorList errors={errors} />
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline mb-4">
                  <form role="form">
                    <div className="form-group">
                      <label className="iconic user form-label" htmlFor="name">
                        Name: <span className="required"></span>
                      </label>
                      <input
                        className="form"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Place of sighting?"
                        value={hauntedSite.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <div className="form-group">
                        <label className="" htmlFor="description">
                          Description: <span className="required"></span>
                        </label>
                        <textarea
                          className="form"
                          name="description"
                          id="description"
                          placeholder="What had you spooked this time?"
                          value={hauntedSite.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="imgUrl">
                            Link to Site Image:{" "}
                          </label>
                          <input
                            className="form"
                            name="imgUrl"
                            id="imgUrl"
                            type="text"
                            placeholder="What we looking at?"
                            value={hauntedSite.imgUrl}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="coordinates">
                              Location Coordinates:{" "}
                            </label>
                            <input
                              className="form"
                              name="coordinates"
                              id="coordinates"
                              type="text"
                              placeholder="For the Amish"
                              value={hauntedSite.coordinates}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <div className="form-group">
                              <label
                                className="form-label"
                                htmlFor="websiteUrl"
                              >
                                Website Link:{" "}
                              </label>
                              <input
                                className="form"
                                name="websiteUrl"
                                id="websiteUrl"
                                type="text"
                                placeholder="Where else can I find this place?"
                                value={hauntedSite.websiteUrl}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <input
              className="btn btn-primary btn-block mb-4 button"
              type="submit"
              value="👻 Submit Edited Site 👻"
            />
          </form>
          <Link to={`/haunted-sites/${hauntedSiteId}`}>Go Back</Link>
        </div>
      </div>
    </div>
  )
}

export default UpdateHauntedSiteForm
