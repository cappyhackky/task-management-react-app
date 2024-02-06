import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TaskForm from './Components/TaskForm';
import NavBar from './Components/NavBar';
import TaskList from './Components/TaskList';
import Error404 from './Components/Error404';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Router basename="https://cappyhackky.github.io/task-management-react-app/">
        <NavBar />
        <Routes>
          <Route path='/task-management-react-app' Component={TaskList} />
          <Route path='add-task' Component={TaskForm} />
          <Route path='/*' Component={Error404} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
