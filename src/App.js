import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import LoginAuthentication from 'actions/auth/login';
import { getLoadableComponent } from 'utilities/utilities';
import MainLayout from 'routes/MainLayout';

const LoginPage = getLoadableComponent(() => import('routes/Login/Layout'));
const Test = getLoadableComponent(() => import('routes/Test'));
const Test2 = getLoadableComponent(() => import('routes/Test2'));
const ScheduleLayout = getLoadableComponent(() => import('routes/Schedule/ScheduleLayout'));
const CourseEnrollment = getLoadableComponent(() => import('routes/Course/Customer/CourseEnrollment'));
const CourseTable = getLoadableComponent(() => import('routes/Course/Shop/CourseTable'));
const ShopTable = getLoadableComponent(() => import('routes/Shop/ShopTable'));


const mapStateToProps = (state) => ({
  user: state.user,
  role: state.user.email,
});

function App({ user, role }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
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
            <Route path='test2' element={<Test2 />} />
            <Route index path='*' element={<Test />} />
          </Route>
          <Route path='shop' element={<ShopTable />} />
          <Route path='course' element={<CourseTable />} />
          <Route path='course2' element={<CourseEnrollment />} />
          <Route path='schedule' element={<ScheduleLayout />} />
          <Route index path='*' element={<Test2 />} />
        </Route>
        <Route index path='*' element={<Test2 />} />
      </Routes>
    </BrowserRouter>

  );
}

export default connect(mapStateToProps)(App);
