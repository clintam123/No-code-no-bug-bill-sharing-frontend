import { Modal } from 'antd';
import clsx from 'clsx';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// import { alertError } from '../../../shared/toastify';
import { IUser } from '../../../setup/redux/State';
import { login } from '../../../shared/services/api/authApi';
import { actionLoginSuccess } from '../redux/AuthActions';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  username: 'customer',
  password: 'customer',
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  let navigate = useNavigate();
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const userData: IUser = (await login(values.username, values.password))
          .data;
        localStorage.setItem('accessToken', userData.accessToken);
        dispatch(actionLoginSuccess(userData));
        navigate('/', { replace: true });
        setLoading(false);
        setSubmitting(false);
      } catch (error: any) {
        setLoading(false);
        setSubmitting(false);
        setStatus(error.message);
      }
      setVisible(false);
    },
  });
  return (
    <div>
      <button
        className="rounded-[5px] bg-gray-700 px-10 text-white font-black text-[20px]"
        onClick={showModal}
      >
        Login
      </button>
      <Modal title="Create Category" visible={visible} onCancel={handleCancel}>
        <form
          className="form w-100"
          onSubmit={formik.handleSubmit}
          noValidate
          id="kt_login_signin_form"
        >
          {formik.status && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}

          <div className="fv-row mb-10">
            <label className="form-label font-bolder text-dark">Username</label>
            <input
              placeholder="Email"
              {...formik.getFieldProps('username')}
              className={clsx(
                'form-control form-control-lg form-control-solid border-solid border-[1px]',
                {
                  'is-invalid':
                    formik.touched.username && formik.errors.username,
                },
                {
                  'is-valid':
                    formik.touched.username && !formik.errors.username,
                }
              )}
              type="text"
              name="username"
              autoComplete="off"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.username}</span>
              </div>
            )}
          </div>

          <div className="fv-row mb-10">
            <div className="d-flex justify-content-between mt-n5">
              <div className="d-flex flex-stack mb-2">
                <label className="form-label font-bolder text-dark mb-0">
                  Password
                </label>
              </div>
            </div>
            <input
              type="password"
              autoComplete="off"
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control ',
                {
                  'is-invalid':
                    formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid':
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              id="kt_sign_in_submit"
              className="bg-blue-800 px-5 py-2 text-white"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && (
                <span className="indicator-label text-[20px]">Continue</span>
              )}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: 'block' }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </Modal>
      <a href="/signup/user">
        <button className="btn btn-primary">Signup</button>
      </a>
      <button
        className="btn btn-primary"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Login;
