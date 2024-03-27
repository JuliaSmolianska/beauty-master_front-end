import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updatedUser } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserSettingsForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { IoMdClose } from 'react-icons/io';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(32).required("Введіть ваше ім'я"),
  email: Yup.string()
    .email('Некоректний формат email')
    .required('Введіть ваш email'),
  beautyMaster: Yup.string().required('Оберіть категорію в якій ви працюєте'),
  workHourStart: Yup.number()
    .min(0, 'Час початку робочого дня має бути не менше 0')
    .max(23, 'Час початку робочого дня має бути не більше 23')
    .required('Введіть час початку робочого дня, год.'),
  workHourEnd: Yup.number()
    .min(0, 'Час початку робочого дня має бути не менше 0')
    .max(23, 'Час початку робочого дня має бути не більше 23')
    .required('Введіть час закінчення робочого дня, год'),
  weekendSchedule: Yup.array().of(Yup.string()),
});

const UserSettingsForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: user.name || '',
    email: user.email || '',
    beautyMaster: user.beautyMaster || '',
    workHourStart: user.workHourStart || '',
    workHourEnd: user.workHourEnd || '',
    weekendSchedule: user.weekendSchedule || [],
    newPassword: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        name: user.name || '',
        email: user.email || '',
        beautyMaster: user.beautyMaster || '',
        workHourStart: user.workHourStart || '',
        workHourEnd: user.workHourEnd || '',
        weekendSchedule: user.weekendSchedule || [],
        newPassword: '',
        password: '',
      });
    }
  }, [user]);

  const handleSubmit = async (values, { resetForm }) => {
    const { newPassword, password, ...otherValues } = values;

    const updateUser = {
      id: user._id,
      ...otherValues,
      ...(values.newPassword && { newPassword: values.newPassword }),
      ...(values.password && { password: values.password }),
    };

    if ((newPassword && password) || (!newPassword && !password)) {
      console.log(updateUser);
      try {
        await dispatch(updatedUser(updateUser))
          .then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
              toast.success(`Налаштування профілю успішно збережені!`, {
                duration: 2000,
                position: 'top-center',
              });
              resetForm({ values: initialValues });
            } else if (response.meta.requestStatus === 'rejected') {
              toast.error(
                `Сталася помилка, налаштування профілю не оновлено! Оновіть сторінку та спробуйте знову`,
                {
                  duration: 3000,
                  position: 'top-center',
                }
              );
            }
          })
          .catch(error => {});
        resetForm();
        navigate('/home');
      } catch (error) {}
    } else {
      toast.error(
        `Для зміни паролю ведіть новий пароль і підтвердіть ваш поточний пароль`,
        {
          duration: 4000,
          position: 'top-center',
        }
      );
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <Col className="d-flex justify-content-center justify-content-lg-end">
      <Col sm={8} md={6} xl={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={`p-4  ${css.form}`} autoComplete="off">
            <IoMdClose className={css.btn_close} onClick={handleCancel} />
            <h5 className="fw-bolder">Налаштування профілю</h5>
            <label className={css.label} htmlFor="name">
              Змінити Ваше ім'я
              <Field type="text" name="name" id="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </label>
            <label className={css.label} htmlFor="email">
              Змінити електронну адресу
              <Field type="email" name="email" id="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </label>
            <label className={css.label} htmlFor="beautyMaster">
              Змінити категорію
              <Field as="select" name="beautyMaster" id="beautyMaster">
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
            <div>
              <p className="text-center fw-bolder mb-1 mt-3">
                Налаштування робочого графіку
              </p>
              <label className="mb-2" htmlFor="workHourStart">
                Початок робочого дня{' '}
                <Field
                  type="number"
                  name="workHourStart"
                  id="workHourStart"
                  style={{ width: '50px' }}
                />
                <ErrorMessage
                  name="workHourStart"
                  component="div"
                  className="text-danger"
                />
              </label>
              <label htmlFor="workHourEnd" className="mb-2">
                Кінець робочого дня{' '}
                <Field
                  type="number"
                  name="workHourEnd"
                  id="workHourEnd"
                  style={{ width: '50px' }}
                />
                <ErrorMessage
                  name="workHourEnd"
                  component="div"
                  className="text-danger"
                />
              </label>
              <div>
                <label htmlFor="weekendSchedule" className="mt-1">
                  Встановити вихідні дні:
                </label>
                <br />
                <Field
                  type="checkbox"
                  id="monday"
                  name="weekendSchedule"
                  value="1"
                  className="me-1"
                />
                <label htmlFor="monday" className="me-3">
                  Пн
                </label>
                <Field
                  type="checkbox"
                  id="tuesday"
                  name="weekendSchedule"
                  value="2"
                  className="me-1"
                />
                <label htmlFor="tuesday" className="me-3">
                  Вт
                </label>
                <Field
                  type="checkbox"
                  id="wednesday"
                  name="weekendSchedule"
                  value="3"
                  className="me-1"
                />
                <label htmlFor="wednesday" className="me-3">
                  Ср
                </label>
                <Field
                  type="checkbox"
                  id="thursday"
                  name="weekendSchedule"
                  value="4"
                  className="me-1"
                />
                <label htmlFor="thursday" className="me-3">
                  Чт
                </label>
                <Field
                  type="checkbox"
                  id="friday"
                  name="weekendSchedule"
                  value="5"
                  className="me-1"
                />
                <label htmlFor="friday" className="me-1">
                  Пт
                </label>
                <br />
                <Field
                  type="checkbox"
                  id="saturday"
                  name="weekendSchedule"
                  value="6"
                  className="me-1"
                />
                <label htmlFor="saturday" className="me-3  mt-2">
                  Сб
                </label>

                <Field
                  type="checkbox"
                  id="sunday"
                  name="weekendSchedule"
                  value="0"
                  className="me-1"
                />
                <label htmlFor="sunday" className="me-3  mt-2">
                  Нд
                </label>
                <ErrorMessage
                  name="weekendSchedule"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <p className="text-center fw-bolder mb-1 mt-3">Для зміни паролю:</p>
            <label className={css.label_password} htmlFor="password">
              Введіть діючий пароль
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                autoComplete="new-password"
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
            <label className={css.label_password} htmlFor="newPassword">
              Введіть новий пароль
              <Field
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                id="newPassword"
              />
              <span
                onClick={() => handleTogglePassword()}
                type="button"
                className={css.show_password}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-danger"
              />
            </label>
            <div className=" d-flex justify-content-between text-center mt-4">
              <button className={css.btn_save} type="submit">
                Зберегти зміни
              </button>
              <button className={css.btn_cancel} onClick={handleCancel}>
                Скасувати
              </button>
            </div>
          </Form>
        </Formik>
      </Col>
    </Col>
  );
};

export default UserSettingsForm;
