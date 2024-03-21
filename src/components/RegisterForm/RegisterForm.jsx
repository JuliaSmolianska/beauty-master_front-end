import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../redux/auth/selectors';
import Loader from '../Loader';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(32).required("Введіть ваше ім'я"),
  email: Yup.string()
    .email('Некоректний формат email')
    .required('Введіть ваш email'),
  password: Yup.string()
    .min(8)
    .max(32)
    .required('Введіть коректний пароль, не меньше 8 символів'),
  beautyMaster: Yup.string().required('Оберіть категорію в якій ви працюєте'),
});

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  const handleSubmit = async (values, { resetForm }) => {
    const newUser = values;
    try {
      const response = await dispatch(register(newUser));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`Вітаю! Ви успішно зареєструвались в системі`, {
          duration: 3000,
          position: 'top-center',
        });
        resetForm();
      }
      if (response.meta.requestStatus === 'rejected') {
        if (response.payload === 'Email already in use') {
          toast.error(
            `Користувач з таким email вже зареєстрований в системі!`,
            {
              duration: 3000,
              position: 'top-center',
            }
          );
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
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        beautyMaster: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Col className="ps-1 pe-1">
        <Form className={`py-4 px-4 px-sm-5 ${css.form}`} autoComplete="off">
          <label className={css.label} htmlFor="name">
            Введіть Ваше ім'я
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </label>
          <label className={css.label} htmlFor="email">
            Введіть електронну адресу
            <Field type="email" name="email" id="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </label>
          <label className={css.label_password} htmlFor="password">
            Введіть пароль
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
            />
            <span
              onClick={() => handleTogglePassword()}
              type="button"
              className={css.show_password}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </span>
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </label>
          <label className={css.label} htmlFor="beautyMaster">
            Оберіть категорію
            <Field as="select" name="beautyMaster" id="beautyMaster">
              <option className="text-danger" value="">
                Обрати категорію
              </option>
              <option value="Hair master">Майстер перукар</option>
              <option value="Nails master">Майстер манікюру</option>
              <option value="Waxing specialist">Майстер з епіляції</option>
            </Field>
            <ErrorMessage
              name="beautyMaster"
              component="div"
              className="text-danger"
            />
          </label>

          {loading ? (
            <>
              <Loader />
              <Col className="text-center mt-2 mb-3">
                Зачекайте, реєструємо...
              </Col>
            </>
          ) : (
            <div className={css.btnBox}>
              <button className={css.btn} type="submit">
                Зареєструватись
              </button>
            </div>
          )}
        </Form>
      </Col>
    </Formik>
  );
};
