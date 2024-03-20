import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Col from 'react-bootstrap/Col';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import {
  addClient,
  allClients,
  editClient,
} from '../../redux/clients/operations';
import css from './ClientForm.module.css';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Поле "Ім\'я" обов\'язкове для заповнення'),
  phone: Yup.string(),
  serviceType: Yup.array()
    .of(Yup.string())
    .min(1, 'Оберіть хоча б один вид послуги')
    .required('Оберіть вид послуги'),
  notes: Yup.string(),
});

const ClientForm = ({
  date,
  handleAddRecordForm,
  dateClients,
  clientToEdit,
}) => {
  const dispatch = useDispatch();
  const [showNotes, setShowNotes] = useState(false);
  const [visitTimes, setVisitTimes] = useState([]);
  const [visitDate, setVisitDate] = useState({ date: '', month: '', year: '' });
  const [chooseVisitTimes, setChooseVisitTimes] = useState(false);
  const nextInputRef = useRef(null);
  const user = useSelector(selectUser);

  /*
  useEffect(() => {
    dispatch(allClients());
  }, [dispatch]);
*/
  useEffect(() => {
    if (clientToEdit) {
      setVisitTimes([
        ...clientToEdit.visitTimes.map(time => ({ ...time, isSelected: true })),
      ]);
      setVisitDate({
        date: clientToEdit.date,
        month: clientToEdit.month,
        year: clientToEdit.year,
      });
    }
  }, [clientToEdit]);
  // console.log(visitDate);

  const handleDateVisitChange = e => {
    const { name, value } = e.target;
    setVisitDate(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isTimeSlotAvailable = (hour, minute) => {
    const selectedTime = hour * 60 + minute;

    for (const client of dateClients) {
      if (client._id === clientToEdit?._id) continue;

      const visitTime = client.visitTimes[0].visitTime;
      const visitEndTime =
        client.visitTimes[client.visitTimes.length - 1].visitEndTime;
      const clientStartTime =
        parseInt(visitTime.split(':')[0]) * 60 +
        parseInt(visitTime.split(':')[1]);
      const clientEndTime =
        parseInt(visitEndTime.split(':')[0]) * 60 +
        parseInt(visitEndTime.split(':')[1]);

      if (selectedTime >= clientStartTime && selectedTime <= clientEndTime) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (values, { resetForm }) => {
    if (visitTimes.length === 0) {
      setChooseVisitTimes(true);
    }

    if (clientToEdit) {
      // console.log(clientToEdit);
      const { _id, owner, name, ...rest } = values;
      const updatedClient = {
        id: clientToEdit._id,
        values: {
          ...rest,
          name: name.toLowerCase(),
          visitTimes: visitTimes,
          date: Number(visitDate.date),
          month: Number(visitDate.month),
          year: Number(visitDate.year),
        },
      };

      dispatch(editClient(updatedClient))
        .then(response => {
          if (response.meta.requestStatus === 'fulfilled') {
            toast.success(`Запис успішно оновлено!`, {
              duration: 2000,
              position: 'top-center',
            });
            dispatch(allClients());
            resetForm({ values: initialValues });
          } else if (response.meta.requestStatus === 'rejected') {
            toast.error(
              `Сталася помилка, запис не оновлено! Оновіть сторінку та спробуйте знову`,
              {
                duration: 3000,
                position: 'top-center',
              }
            );
          }
        })
        .catch(error => {});

      handleAddRecordForm();
      clientToEdit(null);
      resetForm({ values: initialValues });
    } else {
      const newClient = {
        ...values,
        name: values.name.toLowerCase(),
        visitTimes: visitTimes,
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
      //console.log(newClient);
      dispatch(addClient(newClient))
        .then(response => {
          if (response.meta.requestStatus === 'fulfilled') {
            toast.success(`Запис успішно збережено!`, {
              duration: 2000,
              position: 'top-center',
            });
            dispatch(allClients());
            resetForm({ values: initialValues });
          } else if (response.meta.requestStatus === 'rejected') {
            toast.error(
              `Сталася помилка, запис не відбувся! Оновіть сторінку та спробуйте знову`,
              {
                duration: 3000,
                position: 'top-center',
              }
            );
          }
        })
        .catch(error => {});
      handleAddRecordForm();
      resetForm({ values: initialValues });
      if (nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const renderTimeButtons = () => {
    const buttons = [];
    const hourStart = user.workHourStart;
    const hourEnd = user.workHourEnd - 1;
    for (let hour = hourStart; hour <= hourEnd; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        const isAvailable = isTimeSlotAvailable(hour, minute);
        const isSelected = visitTimes.some(
          time =>
            time.visitTime === `${hour}:${minute.toString().padStart(2, '0')}`
        );

        const isEditingTime =
          clientToEdit &&
          visitTimes.some(time => {
            const visitStartTime = new Date(`2000-01-01T${time.visitTime}`);
            const visitEndTime = new Date(`2000-01-01T${time.visitEndTime}`);
            const editingTime = new Date(
              `2000-01-01T${hour}:${minute.toString().padStart(2, '0')}`
            );

            return editingTime >= visitStartTime && editingTime <= visitEndTime;
          });

        buttons.push(
          <button
            type="button"
            key={timeString}
            onClick={() =>
              handleTimeSelection({
                visitTime: `${hour}:${minute.toString().padStart(2, '0')}`,
                visitEndTime: `${hour}:${(minute + 29)
                  .toString()
                  .padStart(2, '0')}`,
              })
            }
            className={`${
              isSelected || isEditingTime ? css.btn_choose : css.btn_free
            } ${!isAvailable && css.btn_disabled}`}
            disabled={!isAvailable}
          >
            {timeString}
          </button>
        );
      }
    }
    return buttons;
  };

  const handleTimeSelection = selectedTime => {
    setVisitTimes(prevVisitTimes => {
      const isSelected = prevVisitTimes.some(
        time => time.visitTime === selectedTime.visitTime
      );

      if (isSelected) {
        // Якщо вибраний час вже присутній в списку, видаляємо його
        const newVisitTimes = prevVisitTimes.filter(
          time => time.visitTime !== selectedTime.visitTime
        );
        return newVisitTimes;
      } else {
        // Якщо вибраний час відсутній в списку, додаємо його
        const newVisitTimes = [
          ...prevVisitTimes,
          { ...selectedTime, isSelected: true },
        ];
        newVisitTimes.sort((a, b) => {
          const timeA = new Date(`2000-01-01T${a.visitTime}`);
          const timeB = new Date(`2000-01-01T${b.visitTime}`);
          return timeA - timeB;
        });

        const allSelected = newVisitTimes.map(time => ({
          ...time,
          isSelected: true,
        }));
        return allSelected;
      }
    });
  };

  const initialValues = {
    name: '',
    phone: '',
    serviceType: [],
    notes: '',
  };

  return (
    <Col className="ps-4 pe-4 pb-2 border-top">
      <Formik
        initialValues={clientToEdit ? clientToEdit : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <IoMdClose className={css.btn_close} onClick={handleAddRecordForm} />
          <h5 className={css.title}>Запис клієнта</h5>
          <div>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Введіть ім'я клінта"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="pt-2">
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder="Введіть номер телефону"
              innerRef={nextInputRef}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger"
            />
          </div>
          <div>
            {user.beautyMaster === 'Hair master' && (
              <>
                <label htmlFor="serviceType" className="fw-bold mt-1">
                  Вид послуги:
                </label>
                <br />
                <Field
                  type="checkbox"
                  id="womanHaircut"
                  name="serviceType"
                  value="Жіноча стрижка"
                  className="me-2"
                />
                <label htmlFor="womanHaircut">Жіноча стрижка</label>
                <br />
                <Field
                  type="checkbox"
                  id="manHaircut"
                  name="serviceType"
                  value="Чоловіча стрижка"
                  className="me-2"
                />
                <label htmlFor="manHaircut">Чоловіча стрижка</label>
                <br />
                <Field
                  type="checkbox"
                  id="childHaircut"
                  name="serviceType"
                  value="Дитяча стрижка"
                  className="me-2"
                />
                <label htmlFor="manHaircut">Дитяча стрижка</label>
                <br />
                <Field
                  type="checkbox"
                  id="hairColoring"
                  name="serviceType"
                  value="Фарбування волосся"
                  className="me-2"
                />
                <label htmlFor="hairColoring">Фарбування волосся</label>
                <br />
                <Field
                  type="checkbox"
                  id="hairCare"
                  name="serviceType"
                  value="Догляд за волоссям"
                  className="me-2"
                />
                <label htmlFor="otherService">Догляд за волоссям</label>
              </>
            )}
            {user.beautyMaster === 'Nails master' && (
              <>
                <label htmlFor="serviceType" className="fw-bold mt-1">
                  Вид послуги:
                </label>
                <br />
                <Field
                  type="checkbox"
                  id="manicur"
                  name="serviceType"
                  value="Манікюр (покриття гель-лаком)"
                  className="me-2"
                />
                <label htmlFor="manicur">Манікюр (покриття гель-лаком)</label>
                <br />
                <Field
                  type="checkbox"
                  id="gelNails"
                  name="serviceType"
                  value="Нарощування гелем"
                  className="me-2"
                />
                <label htmlFor="gelNails">Нарощування гелем</label>
                <br />
                <Field
                  type="checkbox"
                  id="pedicur"
                  name="serviceType"
                  value="Педикюр"
                  className="me-2"
                />
                <label htmlFor="pedicur">Педикюр</label>
              </>
            )}
            {user.beautyMaster === 'Waxing specialist' && (
              <>
                <label htmlFor="serviceType" className="fw-bold mt-1">
                  Оберіть зону для епіляції:
                </label>
                <br />
                <Field
                  type="checkbox"
                  id="face"
                  name="serviceType"
                  value="Лице"
                  className="me-2"
                />
                <label htmlFor="face">Лице</label>
                <br />
                <Field
                  type="checkbox"
                  id="arm"
                  name="serviceType"
                  value="Руки"
                  className="me-2"
                />
                <label htmlFor="arm">Руки</label>
                <br />
                <Field
                  type="checkbox"
                  id="legs"
                  name="serviceType"
                  value="Ноги"
                  className="me-2"
                />
                <label htmlFor="legs">Ноги</label>
                <br />
                <Field
                  type="checkbox"
                  id="armpits"
                  name="serviceType"
                  value="Підмишки"
                  className="me-2"
                />
                <label htmlFor="armpits">Підмишки</label>
                <br />
                <Field
                  type="checkbox"
                  id="bikini"
                  name="serviceType"
                  value="Бікіні"
                  className="me-2"
                />
                <label htmlFor="bikini">Бікіні</label>
              </>
            )}
            <br />
            <Field
              type="checkbox"
              id="otherService"
              name="serviceType"
              value="Інше"
              className="me-2"
            />
            <label htmlFor="otherService">Інше</label>
            <ErrorMessage
              name="serviceType"
              component="div"
              className="text-danger"
            />
          </div>
          <div>
            <label htmlFor="visitTime" className="fw-bold mt-2">
              Час візиту:
            </label>
            <div className={`p-0 ${css.selectTime}`}>{renderTimeButtons()}</div>
            {chooseVisitTimes && (
              <div className="text-danger">Оберіть час візиту</div>
            )}
          </div>

          <div onClick={() => setShowNotes(!showNotes)}>
            <label htmlFor="notes" className="fw-bold mt-1 ms-1">
              Додаткова інформація <FaAngleDoubleDown />
            </label>
          </div>
          {showNotes && (
            <Field
              as="textarea"
              id="notes"
              name="notes"
              style={{ width: '90%' }}
              className="ms-1"
            />
          )}

          {clientToEdit && (
            <div className="mt-2">
              <b className="ps-1">Змінити дату візиту:</b>
              <br />
              <label htmlFor="date">
                д.
                <input
                  type="number"
                  id="date"
                  name="date"
                  min="1"
                  max="31"
                  value={visitDate.date}
                  onChange={handleDateVisitChange}
                  style={{ width: '50px' }}
                  className="ms-1 me-2 ps-1"
                />
              </label>
              <label htmlFor="month">
                міс.
                <input
                  type="number"
                  id="month"
                  name="month"
                  min="1"
                  max="12"
                  value={visitDate.month}
                  onChange={handleDateVisitChange}
                  style={{ width: '50px' }}
                  className="ms-1 me-2 ps-1"
                />
              </label>
              <label htmlFor="year">
                р.
                <input
                  type="number"
                  id="year"
                  name="year"
                  min="2024"
                  max="2030"
                  value={visitDate.year}
                  onChange={handleDateVisitChange}
                  style={{ width: '70px' }}
                  className="m-1 ps-1"
                />
              </label>
            </div>
          )}

          <div className="d-flex justify-content-around mt-2 mb-1">
            <button type="submit" className={css.btn_save}>
              Зберегти
            </button>
            <button className={css.btn_cancel} onClick={handleAddRecordForm}>
              Скасувати
            </button>
          </div>
        </Form>
      </Formik>
    </Col>
  );
};

export default ClientForm;
