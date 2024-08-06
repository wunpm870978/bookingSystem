import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface LoginAuthenticationProps {
  children: ReactNode;
}

const LoginAuthentication: FC<LoginAuthenticationProps> = ({
  children
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  
  if (isEmpty(user)) {
    return <Navigate to="/login" replace />
  } else if (!user.is_active) {
    return <Navigate to="/verification" replace />
  }
  return children
}

export default LoginAuthentication;