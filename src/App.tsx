import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginAuthentication from './actions/auth/login';
import MainLayout from './routes/MainLayout';
import API from './services/API';
import { useDispatch } from "react-redux";
import { login } from 'actions/reducers/user';
const LoginPage = lazy(() => import('./routes/login/Login'));
const EmailVerification = lazy(() => import('./routes/verification/EmailVerification'));

const Test = lazy(() => import('./routes/Test'));
// const Test2 = lazy(() => import('./routes/Test2'));
// const ScheduleLayout = lazy(() => import('./routes/schedule/ScheduleLayout'));
// const CourseEnrollment = lazy(() => import('./routes/course/customer/CourseEnrollment'));
// const CourseTable = lazy(() => import('./routes/course/shop/CourseTable'));
// const ShopTable = lazy(() => import('./routes/shop/ShopTable'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserFromSession = () => {
      const user = sessionStorage.getItem('user');
      const access_token = sessionStorage.getItem('access_token');
      const refresh_token = sessionStorage.getItem('refresh_token');
      if (user && access_token && refresh_token) {
        dispatch(login({
          user: JSON.parse(user),
          access_token,
          refresh_token
        }));
      }
    }
    getUserFromSession();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="verification" element={<EmailVerification />} />
        <Route
          path='/'
          element={
            <LoginAuthentication>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </LoginAuthentication>
          }
        >
          <Route path='test' >
            {/* <Route path='test2' element={<Test2 />} /> */}
            <Route index path='*' element={<Test />} />
          </Route>
          {/* <Route path='shop' element={<ShopTable />} /> */}
          {/* <Route path='course' element={<CourseTable />} /> */}
          {/* <Route path='course2' element={<CourseEnrollment />} /> */}
          {/* <Route path='schedule' element={<ScheduleLayout />} /> */}
        </Route>
        {/* <Route path='/' element={<Test2 />} /> */}
        {/* <Route index path='*' element={<Test2 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
