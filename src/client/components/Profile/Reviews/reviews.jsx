import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../actions/reviews.jsx';
import { Rating } from 'material-ui-rating';

class Review extends Component {
  constructor(props) {
    super(props);
    this.deleteReview = this.deleteReview.bind(this);

  }

  deleteReview() {
    this.props.deleteReview(this.props.user.Email, this.props.target.Email, this.props.review.Reviewer_Rating, this.props.review.Reviewer_Text);
  }

  render() {
    return (
      <div className={`bubble-container ${ this.props.index % 2 === 0 ? 'bubble-direction-reverse' : ''}`}>
        <img className="img-circle" src={this.props.review.Reviewer_Image} />
        <div className={`bubble ${ this.props.index % 2 === 0 ? 'reviewRight' : 'reviewLeft'}`}>
          <div className="ReviewRating">
            <Rating value={this.props.review.Reviewer_Rating} max={5} readOnly={true} />
          </div>
          <div className="ReviewText">{this.props.review.Reviewer_Text}</div>
          <div className="ReviewName">{this.props.review.Reviewer_Name} from {this.props.review.Reviewer_City}</div>
            {this.props.user.Email === this.props.review.Reviewer_Email ? <button className="Button" onClick={this.deleteReview}>Delete</button>: null}
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    target: state.target.user
  }
}

export default connect(mapStateToProps, actions)(Review);