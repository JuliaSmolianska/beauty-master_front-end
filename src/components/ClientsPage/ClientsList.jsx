import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ClientCard from './ClientCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import css from './ClientsPage.module.css';
import Loader from '../Loader';

const ClientsList = () => {
  const [allClientsList, setAllClientsList] = useState([]);
  const [searchClient, setSearchClient] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          `https://beauty-master-back-end.onrender.com/clients/all-clients`
        );
        const sortedClients = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setAllClientsList(sortedClients);
        setLoading(false);
      } catch (error) {
        toast.error('Сталася помилка');
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = allClientsList.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase())
  );

  // Функція для обробки введення користувача у полі пошуку
  const handleSearch = event => {
    setSearchClient(event.target.value);
  };

  return (
    <Col className="d-flex justify-content-center justify-content-lg-end">
      <Col xs={12} sm={8} md={6} xl={5} className={css.box}>
        <h3 className="text-center fst-italic">Мої клієнти</h3>
        {loading ? (
          <>
            <Loader />
            <Col className="text-center mt-2 mb-3">Загружається...</Col>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control mb-3 mx-auto w-75"
              placeholder="Пошук за іменем"
              value={searchClient}
              onChange={handleSearch}
            />
            {allClientsList.length === 0 && (
              <p className="text-center">У Вас поки що не має клієнтів</p>
            )}
            <ul className="ps-1 pe-1 pb-3 list-unstyled">
              {filteredClients.map((client, index) => (
                <li key={index} className="ps-3">
                  <ClientCard client={client} />
                </li>
              ))}
            </ul>
          </>
        )}
        <Toaster />
      </Col>
    </Col>
  );
};

export default ClientsList;
