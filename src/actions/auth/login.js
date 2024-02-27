import { Navigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";


const LoginAuthentication = ({ children }) => {
  const user = useSelector((state) => state.user.user)
  if (isEmpty(user)) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}

export default LoginAuthentication;