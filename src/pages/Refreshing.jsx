import { Layout } from 'components/Layout/Layout';
import Loader from 'components/Loader';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const Refreshing = () => {
  return (
    <>
      <Layout />
      <Col className="z-2 position-absolute translate-middle  top-50 start-50 bg-white bg-opacity-75 d-flex justify-content-center">
        <Col className="p-5 mx-auto">
          <Loader />
          <b className="text-center mt-2 mb-3">Оновлення сторінки...</b>
        </Col>
      </Col>
    </>
  );
};
export default Refreshing;
