import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import css from '../RegisterForm/RegisterForm.module.css';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Некоректний формат email')
    .required('Введіть ваш email'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ email }) => {
    try {
      await axios.post('http://localhost:8000/users/forgot-password', {
        email,
      });
      toast.success(
        `Новий пароль відправлено на вашу електронну адресу, перевірьте!`,
        {
          duration: 4000,
          position: 'top-center',
        }
      );

      navigate('/login');
    } catch (error) {
      toast.error('помилка при відправленні email');
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Col className="ps-1 pe-1">
          <Form className={`ps-5 pe-5 pt-3 pb-3 ${css.form}`}>
            <h3 className="text-center">Відновлення пароля</h3>
            <label className={css.label}>
              Введіть ваш email
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </label>
            <div className={css.btnBox}>
              <button className={css.btn} type="submit">
                Надіслати
              </button>
            </div>
            <div className="text-center mt-3">
              <NavLink to="/login">Ввійти в мій обліковий запис</NavLink>
            </div>
          </Form>
          <Toaster />
        </Col>
      </Formik>
    </>
  );
};
export default ForgotPassword;
