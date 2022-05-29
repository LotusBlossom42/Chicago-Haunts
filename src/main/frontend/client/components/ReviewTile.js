import React from "react"
import { useHistory, useParams } from "react-router-dom"
import ReviewForm from "./ReviewForm"
import "../assets/scss/showPage.scss"

const ReviewTile = props => {
  const history = useHistory()
  const { id } = useParams()

  return (
    <li className="list-group-item block">
      <div className="row tweet">
        <div className="col-xs-5 col-md-3">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            className="img-responsive img-user"
            alt=""
          />
        </div>

        <div className="">
          <div>
            <div className="mic-info">
              By: <a href="#">{props.review.username}</a> on{" "}
              {new Date().toLocaleString() + ""}
            </div>
          </div>
          <div className="comment-text">{props.review.comment}</div>
          <div>Rating: {props.review.rating} /5 👻</div>
          <div className="action">
            <button
              onClick={() => history.push(`/reviews/${props.review.id}/edit`)}
              type="button"
              className="btn btn-primary btn-xs"
              title="Edit"
            >
              <span className="glyphicon glyphicon-pencil"></span>
            </button>

            <button type="button" className="btn btn-x" title="Approved">
              <span className="glyphicon glyphicon-ok"></span>
            </button>

            <button
              onClick={props.handleDelete}
              type="button"
              className="btn btn-danger btn-xs"
              title="Delete"
            >
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ReviewTile
