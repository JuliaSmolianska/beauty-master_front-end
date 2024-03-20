import { Bars } from 'react-loader-spinner';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = () => {
  return (
    <Col className="d-flex justify-content-center my-auto">
      <Bars
        height="80"
        width="80"
        color="#465881"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Col>
  );
};

export default Loader;
