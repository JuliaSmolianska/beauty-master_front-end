import React, { useState } from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { AiFillCaretRight } from 'react-icons/ai';

const ClientCard = ({ client }) => {
  const [showVisits, setShowVisits] = useState(false);
  //console.log(client);

  const formatDate = date => {
    return date.toString().padStart(2, '0');
  };
  return (
    <>
      <h5
        onClick={() => setShowVisits(!showVisits)}
        className="text-capitalize text-decoration-underline"
      >
        <AiOutlineDoubleRight className="me-2" />
        {client.name}
      </h5>
      {showVisits && (
        <ul className="ps-1 pe-1 list-unstyled">
          {client.clients.map((clientVisit, index) => (
            <li key={index} className="">
              <p className="mb-0">
                <AiFillCaretRight className="me-2" />
                <span className="fw-bolder">
                  {formatDate(clientVisit.date)}.{formatDate(clientVisit.month)}
                  .{clientVisit.year}р.{' '}
                </span>
                {clientVisit.serviceType.join(', ')}
              </p>
              {clientVisit.phone && (
                <p className="mb-0">
                  <span className="fw-bolder">тел. </span>
                  {clientVisit.phone}
                </p>
              )}
              {clientVisit.notes && (
                <p className="mb-0">
                  <span className="fw-bolder">Дод. інформація: </span>
                  {clientVisit.notes}
                </p>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ClientCard;
