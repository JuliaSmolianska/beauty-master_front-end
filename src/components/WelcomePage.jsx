import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineDoubleRight } from 'react-icons/ai';

const WelcomePage = () => {
  return (
    <div className="pt-2">
      <div
        style={{ width: '300px' }}
        className="text-center mx-auto mt-4 fw-bolder"
      >
        <div className="border rounded border-black bg-white m-1 p-1">
          <h4 className="fw-bolder">Вітаю в Beauty Master!</h4>Я стану
          незамінним помічником у твоїй роботі.
        </div>

        <div className="border rounded border-black bg-white m-1 p-1">
          Зі мною ти з легко зможеш планувати свій робочій час та вихідні,
          уникаючи непорозумінь з записами клієнтів.
        </div>
        <div className="border rounded border-black bg-white m-1 p-1">
          А також матимеш можливість переглядати попередні візити по кожному
          клієнту
        </div>

        <div className="border rounded border-black bg-white text-center m-1 pt-3 pb-3 bg-opacity-75">
          <NavLink to="/register">
            Зареєструватись <AiOutlineDoubleRight className="ms-2" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage