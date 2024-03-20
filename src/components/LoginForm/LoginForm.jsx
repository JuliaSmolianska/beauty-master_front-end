import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from '../RegisterForm/RegisterForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Некоректний формат email')
    .required('Введіть ваш email'),
  password: Yup.string()
    .min(8)
    .max(32)
    .required('Введіть коректний пароль, не меньше 8 символів'),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(prevState => !showPassword);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await dispatch(logIn(values));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`Ви успішно ввійшли в свій профіль!`, {
          duration: 3000,
          position: 'top-center',
        });
        resetForm();
      }
      if (response.meta.requestStatus === 'rejected') {
        if (response.payload === 'Email is wrong') {
          toast.error(`Користувача з таким email не знайдено!`, {
            duration: 3000,
            position: 'top-center',
          });
        }
        if (response.payload === 'Password is wrong') {
          toast.error(`Пароль введено не вірно!`, {
            duration: 3000,
            position: 'top-center',
          });
        }
        if (response.payload === 'Server Error') {
          toast.error(`Сталась помилка сервера, обновіть сторінку! `, {
            duration: 3000,
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      toast.error(`Виникла помилка, спробуйте ще раз!`, {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Col className="ps-1 pe-1">
        <Form className={`py-4 px-4 px-sm-5 ${css.form}`} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </label>
          <label className={css.label_password}>
            Пароль
            <Field type={showPassword ? 'text' : 'password'} name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
            <span
              onClick={() => handleTogglePassword()}
              type="button"
              className={css.show_password}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </span>
          </label>
          <>
            <div className={css.btnBox}>
              <button className={css.btn} type="submit">
                Вхід <IoLogInOutline />
              </button>
            </div>
            <div className="text-center mt-4 mb-3">
              <NavLink to="/forgot-password">Забули пароль?</NavLink>
            </div>
          </>
        </Form>
      </Col>
    </Formik>
  );
};
