import logo from './logo.svg';
import './App.css';

import { Home } from './Home';
import { Department } from './Department';
import { Employee } from './Employee';
import { BrowserRouter, Routes, Route , NavLink } from 'react-router-dom';
import Trasactions from './Transactions';
import Category from './Category';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Expense Tracker
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Login
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/category">
                Categories
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/transactions">
                Transactions
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Login/>}></Route>
          <Route path='/category' element={<Category/>}></Route>
          <Route path='/transactions' element={<Trasactions/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
