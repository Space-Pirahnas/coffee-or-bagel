import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';

class NavProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.userInfo) {
      return <div>Loading</div>
    }
    return (
      <a href="/#/profile/:userid" className="UserProfile">
        <div className="User">
          <div className="name">{ this.props.userInfo.Name }</div>
          <div className="image">
            {
              this.props.userInfo.Image ? <img src={ this.props.userInfo.Image } /> :  <img src={"styles/user.jpeg"} />
            }
          </div>
        </div>
      </a>
      );
  }
};

function mapStateToProps(state) {
  console.log('state in profile: ', state);
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(NavProfile);