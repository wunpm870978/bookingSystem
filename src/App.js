import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { isEmpty } from "lodash";
import LoginAuthentication from 'actions/auth/login';
import { getLoadableComponent } from 'utilities/utilities';

const LoginPage = getLoadableComponent(() => import('routes/Login/Layout'));
const MainLayout = getLoadableComponent(() => import('routes/MainLayout'));
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

  );
}

export default connect(mapStateToProps)(App);
