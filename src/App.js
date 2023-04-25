import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { isEmpty } from "lodash";
import LoginAuthentication from 'actions/auth/login';

const LoginPage = lazy(() => import('routes/Login/Layout'));
const MainLayout = lazy(() => import('routes/MainLayout'));
const Test = lazy(() => import('routes/Test'));
const Test2 = lazy(() => import('routes/Test2'));
const ScheduleLayout = lazy(() => import('routes/Schedule/ScheduleLayout'));
const CourseEnrollment = lazy(() => import('routes/Course/user/CourseEnrollment'));
const CourseTable = lazy(() => import('routes/Course/shop/CourseTable'));
const ShopTable = lazy(() => import('routes/Shop/ShopTable'));


const mapStateToProps = (state) => ({
  user: state.user,
  role: state.user.email,
});

function App({ user, role }) {
  return (
    <Suspense
      fallback={<div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Spin
          tip="Loading"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      </div>}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            index
            path='/*'
            element={
              <LoginAuthentication>
                <Route path='test' >
                  <Route path='test2' element={<Test2 />} />
                  <Route index path='*' element={<Test />} />
                </Route>
                <Route path='shop' element={<MainLayout><ShopTable /></MainLayout>} />

                {/* <Route path='course' element={
                  <MainLayout>
                    {role === 'shop'
                      ? <CourseTable />
                      : <CourseEnrollment />
                    }
                  </MainLayout>
                } /> */}
                <Route path='course' element={<MainLayout><CourseTable /></MainLayout>} />
                <Route path='course2' element={<MainLayout><CourseEnrollment /></MainLayout>} />
                <Route path='schedule' element={<MainLayout><ScheduleLayout /></MainLayout>} />
                <Route index path='*' element={<MainLayout><Test2 /></MainLayout>} />
              </LoginAuthentication>
            }
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default connect(mapStateToProps)(App);
