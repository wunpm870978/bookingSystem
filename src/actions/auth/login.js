import { Navigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { Routes } from "react-router-dom";

const mapStateToProps = (state) => ({
    user: state.user,
});

const LoginAuthentication = ({ user, children }) => {
    if (isEmpty(user)) {
        return <Navigate to="/login" replace={true} />
    }
    return <Routes>{children}</Routes>
}

export default connect(mapStateToProps)(LoginAuthentication);