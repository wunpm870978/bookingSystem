import { FC, ReactNode, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { clearUser } from "actions/reducers/user";

interface LoginAuthenticationProps {
  children: ReactNode;
}

const LoginAuthentication: FC<LoginAuthenticationProps> = ({
  children
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogoutEvent = useCallback((e: any) => {
    console.log('handleLogoutEvent', e);
    dispatch(clearUser());
  }, [])

  useEffect(() => {
    document.addEventListener('logout', handleLogoutEvent);
    return () => {
      document.removeEventListener('logout', handleLogoutEvent);
    }
  }, [])

  if (isEmpty(user)) {
    return <Navigate to="/login" replace />
  } else if (!user.is_active) {
    return <Navigate to="/verification" replace />
  }
  return children
}

export default LoginAuthentication;