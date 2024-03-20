import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient } from '../../redux/clients/operations';
import { selectClients } from '../../redux/clients/selectors';
import { FaAngleDown } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import css from './ClientList.module.css';
import toast from 'react-hot-toast';

const ClientList = ({ client, isNotPast, handleEditClient }) => {
  const [showFullInfoMap, setShowFullInfoMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const clients = useSelector(selectClients);

  useEffect(() => {}, [clients]);

  const handleDelete = _id => {
    dispatch(deleteClient(_id))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success(`Запис успішно видалений!`, {
            duration: 2000,
            position: 'top-center',
          });
        } else if (response.meta.requestStatus === 'rejected') {
          toast.error(
            `Сталася помилка, запис не видалений! Оновіть сторінку та спробуйте знову`,
            {
              duration: 3000,
              position: 'top-center',
            }
          );
        }
      })
      .catch(error => {});
    setShowDeleteModal(false);
  };

  const toggleShowFullInfo = () => {
    setShowFullInfoMap(!showFullInfoMap);
  };

  const formatTime = timeString => {
    const [hoursStr, minutesStr] = timeString.split(':');
    let hours = parseInt(hoursStr);
    let minutes = parseInt(minutesStr);

    minutes += 1;

    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <>
      <Row className={`gx-0 ${css.client_list}`}>
        {isNotPast && (
          <Col xs={1} className="my-auto text-center">
            <FaEdit
              size={25}
              onClick={() => handleEditClient(client._id)}
              className="p-0"
            />
          </Col>
        )}
        <Col
          xs={9}
          className={`ps-2 pe-2 ms-2 me-2 mb-2 ${css.list_box}`}
          onClick={() => toggleShowFullInfo()}
        >
          <span className="fw-bold text-decoration-underline">
            {client.visitTimes[0].visitTime} -{' '}
            {formatTime(
              client.visitTimes[client.visitTimes.length - 1].visitEndTime
            )}{' '}
          </span>
          <span className="fw-semibold">{client.serviceType.join(', ')}</span>{' '}
          {showFullInfoMap ? (
            <FaAngleDown className="text-primary" />
          ) : (
            <FaAngleDown />
          )}
          {showFullInfoMap && (
            <>
              <div className="mb-0 text-capitalize">Ім'я: {client.name}</div>
              {client.phone && <div>Телефон: {client.phone}</div>}
              {client.notes && <div>{client.notes}</div>}
            </>
          )}
        </Col>
        {isNotPast && (
          <Col xs={1} className="my-auto">
            <RiDeleteBin2Fill
              size={25}
              onClick={() => setShowDeleteModal(true)}
            />
          </Col>
        )}
      </Row>
      {showDeleteModal && (
        <div className="border rounded border-danger border-2 ps-2 pe-2 m-1 text-center">
          <p className="mb-0">
            Ви впевнені, що хочете видалити запис на{' '}
            <span className="fw-bolder">
              {client.visitTimes[0].visitTime} -{' '}
              {formatTime(
                client.visitTimes[client.visitTimes.length - 1].visitEndTime
              )}{' '}
            </span>
            ?
          </p>
          <button
            className="btn btn-success mt-1 mb-1 ms-1 me-5"
            onClick={() => handleDelete(client._id)}
          >
            Видалити
          </button>
          <button
            className="btn btn-danger m-1"
            onClick={() => setShowDeleteModal(false)}
          >
            Скасувати
          </button>
        </div>
      )}
    </>
  );
};

export default ClientList;
