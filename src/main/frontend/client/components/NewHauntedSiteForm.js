import React, { useEffect, useRef, useState } from "react"
import { Redirect } from "react-router"
import { Link, useHistory } from "react-router-dom"
import _ from "lodash"
import "../assets/scss/showPage.scss"
import "../assets/scss/main.scss"

import ErrorList from "./ErrorList"

const INITIAL_STATE = {
  name: "",
  description: "",
  imgUrl: "",
  websiteUrl: "",
  coordinates: ""
}
const NewHauntedSiteForm = props => {
  const [formPayload, setFormPayload] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const history = useHistory()

  const addSite = async () => {
    try {
      const response = await fetch(`/api/v1/haunted-sites`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }
      const body = await response.json()
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const isValidForSubmission = () => {
    if (
      formPayload.name.trim() &&
      formPayload.imgUrl.trim() &&
      formPayload.websiteUrl.trim()
    ) {
      return true
    } else {
      const newErrors = {}
      if (!formPayload.name.trim()) {
        newErrors["Name"] = "cannot be blank"
      }
      if (!formPayload.imgUrl.trim()) {
        newErrors["Image URL"] = "cannot be blank"
      }
      if (!formPayload.websiteUrl.trim()) {
        newErrors["Website URL"] = "cannot be blank"
      }
      setErrors(newErrors)
      return false
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isValidForSubmission()) {
      addSite()
    }
  }

  const handleInputChange = event => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  if (shouldRedirect) {
    return <Redirect push to={`/haunted-sites`} />
  }

  return (
    <div>
      <Link to={"/haunted-sites"}>Back to All Haunted Sites</Link>
      <div className="row">
        <div></div>
        <div id="content">
          <form
            id="new-site-form"
            className="form-content fade-in fade-out"
            onSubmit={handleSubmit}
            role="form"
          >
            <h1 className="haunted-form-header">
              Add a new Chicago Haunted Site
            </h1>
            <ErrorList errors={errors} />
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline mb-4">
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
                      value={formPayload.name}
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
                        placeholder="What had you spooked?"
                        value={formPayload.description}
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
                          placeholder="They might be spooky but no feet pics"
                          value={formPayload.imgUrl}
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
                            value={formPayload.coordinates}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="websiteUrl">
                              Website Link:{" "}
                            </label>
                            <input
                              className="form"
                              name="websiteUrl"
                              id="websiteUrl"
                              type="text"
                              placeholder="Where else can I find this place?"
                              value={formPayload.websiteUrl}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input
              className="btn btn-primary btn-block mb-4 button"
              type="submit"
              value="👻 Add Site 👻"
            />
            <audio
              className="audioPlayer3"
              id="player3"
              autoPlay
              preload="metadata"
            >
              <source src="/audio/ThunderSound.ogg" type="audio/ogg"></source>
            </audio>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewHauntedSiteForm
