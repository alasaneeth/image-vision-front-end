import TitumUtils from "../../utils";
import AppContext from "../../../AppContext";
import React, { Component } from "react";
import { connect } from "react-redux";
import { matchRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";

class TitumAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matched = matchRoutes(state.routes, pathname)[0];

    return {
      accessGranted: matched
        ? TitumUtils.hasPermission(matched.route.auth, userRole)
        : true,
    };
  }

  redirectRoute() {
    const { location, userRole, history } = this.props;
    const { pathname } = location;
    const redirectUrl = "/dashboard";

    /*
        User is guest
        Redirect to Login Page
        */
    if (!userRole || userRole.length === 0) {
      history.push({
        pathname: "/login",
        state: { redirectUrl: pathname },
      });
    } else {
      history.push({
        pathname: redirectUrl,
      });
    }
  }

  render() {
    return this.state.accessGranted ? <>{this.props.children}</> : null;
  }
}

function mapStateToProps({ auth }) {
  return {
    userRole: auth?.userData.role,
  };
}

TitumAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(TitumAuthorization));
