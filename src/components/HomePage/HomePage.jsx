import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allClients } from '../../redux/clients/operations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import ukLocale from 'date-fns/locale/uk';
import Col from 'react-bootstrap/Col';
import css from './HomePage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import { selectClients } from '../../redux/clients/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { updatedUser } from '../../redux/auth/operations';

const HomePage = () => {
  const [chooseDate, setChooseDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [dateClients, setDateClients] = useState([]);
  const [isNotPast, setIsNotPast] = useState(true);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [isWeekend, setIsWeekend] = useState(false);
  const clients = useSelector(selectClients);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const currentDate = new Date();

  useEffect(() => {
    setChooseDate(currentDate);
    handleDateClick(currentDate);
    dispatch(allClients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDateClick(chooseDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseDate, clients, ]);

  const onChange = date => {
    setChooseDate(date);
    handleDateClick(date);
    compareDate(date);
  };

  const compareDate = date => {
    const currentDateFull = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const selectedDateFull = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setIsNotPast(selectedDateFull >= currentDateFull);
  };

  const handleAddRecordForm = () => {
    setShowAddForm(prevState => !prevState);
    setClientToEdit(null);
  };

  const handleDateClick = date => {
    const selectedClients = clients
      .filter(
        item =>
          item.year === date.getFullYear() &&
          item.month === date.getMonth() + 1 &&
          item.date === date.getDate()
      )
      .sort((a, b) => {
        const timeA = a.visitTimes[0].visitTime.split(':');
        const timeB = b.visitTimes[0].visitTime.split(':');
        if (parseInt(timeA[0]) !== parseInt(timeB[0])) {
          return parseInt(timeA[0]) - parseInt(timeB[0]);
        }
        return parseInt(timeA[1]) - parseInt(timeB[1]);
      });

    setDateClients(selectedClients);
    setIsWeekend(
      user.freeWorkDays.some(
        day =>
          day.year === date.getFullYear() &&
          day.month === date.getMonth() + 1 &&
          day.date === date.getDate()
      )
    );
  };

  const handleEditClient = clientId => {
    const client = clients.find(client => client._id === clientId);
    setClientToEdit(client);
    setShowAddForm(true);
  };

  const toggleWeekend = () => {
    if (isWeekend) {
      const updatedFreeWorkDays = user.freeWorkDays
        .filter(
          day =>
            day.year !== chooseDate.getFullYear() ||
            day.month !== chooseDate.getMonth() + 1 ||
            day.date !== chooseDate.getDate()
        )
        .map(({ _id, ...rest }) => rest);
      dispatch(
        updatedUser({
          id: user._id,
          freeWorkDays: updatedFreeWorkDays,
        })
      );
      setIsWeekend(!isWeekend);
    } else {
      addWeekend();
    }
  };

  const addWeekend = () => {
    const selectedYear = chooseDate.getFullYear();
    const selectedMonth = chooseDate.getMonth() + 1;
    const selectedDay = chooseDate.getDate();
    const freeWorkDay = {
      date: selectedDay,
      month: selectedMonth,
      year: selectedYear,
    };
    const currentFreeWorkDays = user.freeWorkDays.map(
      ({ _id, ...rest }) => rest
    );
    const updatedFreeWorkDays = [...currentFreeWorkDays, freeWorkDay];

    dispatch(
      updatedUser({
        id: user._id,
        freeWorkDays: updatedFreeWorkDays,
      })
    );
    setIsWeekend(!isWeekend);
  };

  const isWeekendSchedule = user.weekendSchedule.includes(String(chooseDate.getDay()))

  return (
    <Col className="d-flex justify-content-center justify-content-lg-end">
      <Col xs={12} sm={8} md={6} xl={5}>
        <Col className={css.listClientsBox}>
          <div>
            <div className="pb-2">
              <h4 className={css.date}>
                {format(chooseDate, 'd MMMM yyyy', { locale: ukLocale })}
              </h4>

              {dateClients.length === 0 ? (
                <p className="text-center pb-5">
                  {isWeekend || isWeekendSchedule? 'У Вас вихідний день' : 'Клієнтів не має'}
                </p>
              ) : (
                <ul className="ps-3 pe-3 list-unstyled">
                  {dateClients &&
                    dateClients.map((clientData, index) => (
                      <li key={index} className="">
                        <ClientList
                          client={clientData}
                          isNotPast={isNotPast}
                          handleEditClient={handleEditClient}
                        />
                      </li>
                    ))}
                </ul>
              )}
              {showAddForm && (
                <ClientForm
                  date={chooseDate}
                  handleAddRecordForm={handleAddRecordForm}
                  dateClients={dateClients}
                  clientToEdit={clientToEdit}
                />
              )}

              {!showAddForm &&
                isNotPast &&
                !isWeekend &&
                !isWeekendSchedule && (
                  <div className="text-center">
                    <button
                      type="button"
                      className={css.btn_addRecord}
                      onClick={handleAddRecordForm}
                    >
                      Додати запис
                    </button>
                  </div>
                )}
              {!showAddForm &&
                isNotPast &&
                !clientToEdit &&
                !isWeekendSchedule && (
                  <div className="text-center mt-3 mb-2">
                    <button
                      type="button"
                      className={`btn ${
                        isWeekend ? 'btn-success' : 'btn-danger'
                      }`}
                      onClick={toggleWeekend}
                    >
                      {isWeekend
                        ? 'Встановити як робочий день'
                        : 'Встановити як вихідний день'}
                    </button>
                  </div>
                )}
            </div>
          </div>
        </Col>
        <Col className="d-flex justify-content-center bg-white bg-opacity-50">
          <DatePicker
            selected={chooseDate}
            onChange={onChange}
            startDate={chooseDate}
            inline
            onSelect={handleDateClick}
            dayClassName={date =>
              (Array.isArray(user.freeWorkDays) &&
              user.freeWorkDays.some(
                day =>
                  day.year === date.getFullYear() &&
                  day.month === date.getMonth() + 1 &&
                  day.date === date.getDate()
              )
                ? 'bg-danger bg-opacity-50'
                : '') +
              (Array.isArray(user.weekendSchedule) &&
              user.weekendSchedule.includes(String(date.getDay()))
                ? 'bg-danger bg-opacity-50'
                : '') +
              (clients.some(
                client =>
                  client.year === date.getFullYear() &&
                  client.month === date.getMonth() + 1 &&
                  client.date === date.getDate()
              )
                ? 'bg-success-subtle'
                : '')
            }
          />
        </Col>
      </Col>
    </Col>
  );
};

export default HomePage;
