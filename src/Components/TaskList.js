import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaPlus, FaRegCheckCircle, FaTrash } from 'react-icons/fa'
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
const TaskList = () => {

  const [initialTasks, setInitialTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.taskId !== taskId);
    console.log(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast.success("Task Deleted!!!");
  };

  const editTask = (taskId) => {
    setIsEditable(true);
    const getTask = tasks.filter((task) => task.taskId === taskId);
    setModalData(getTask[0]);
    setShowModal(true)
  };
  const viewTask = (taskId) => {
    setIsEditable(false);
    const getTask = tasks.filter((task) => task.taskId === taskId);
    setModalData(getTask[0]);
    setShowModal(true)
  };
  const completedTask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].status = 'completed';
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast.success("Task Completed!!!");
    document.getElementById(taskId).classList.add('disabled');
  };

  const getUpcomingTasks = () => {
    const currentDate = new Date();
    return ((tasks.filter((task) => new Date(task.dueDate) > currentDate && task.status !== 'completed')).length);
  };

  const getDueTasks = () => {
    const currentDate = new Date();
    return ((tasks.filter((task) => new Date(task.dueDate) <= currentDate && task.status !== 'completed')).length);
  };

  const getCompletedTasks = () => {
    return ((tasks.filter((task) => task.status === 'completed')).length);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
    let filteredTasks = initialTasks.slice();
    if (!showCompleted) {
      filteredTasks = filteredTasks.filter((task) => task.status === 'completed');
    }
    setTasks(filteredTasks);
  };

  //Search functionality

  const searchTasks = (searchTerm) => {
    setSearchTerm(searchTerm)
    let filteredTasks = initialTasks.slice();

    if (searchTerm !== '') {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.priority.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    setTasks(filteredTasks);
  };
  const handlePriorityChange = (filterPriority) => {
    setFilterPriority(filterPriority)
    let filteredTasks = initialTasks.slice();
    if (filterPriority !== 'All') {
      filteredTasks = filteredTasks.filter((task) => task.priority === filterPriority);
    }

    setTasks(filteredTasks);
  };


  //Code for pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }


  useEffect(() => {
    const storedTasks = (JSON.parse(localStorage.tasks)) ?? []
    setInitialTasks(storedTasks);
    setTasks(storedTasks);
  }, []);

  return (
    <>
      {showModal && (<Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        data={modalData}
        editMode={isEditable}
        tasks={tasks}
        setTasks={setTasks}
      />)}
      <ToastContainer />
      <div className="row vh-100 gx-0">
        <img src="/img/upcoming.png" alt="gasdg" />
        <div className="bg-mgreen col-md-3 d-flex align-items-center py-5">
          <div className="px-3 py-5">
            <div className="card hover shadow mb-3">
              <div className="card-body text-dark">
                <div className="row" role='button'>
                  <div className="col-md-4 text-center"><img src="/img/upcoming.png" className='img-fluid w-75' alt='upcoming' /></div>
                  <div className="col-md-8 d-flex align-items-center"><p className='h5 w-100 text-center'>Upcoming ({getUpcomingTasks()})</p></div>
                </div>
              </div>
            </div>
            <div className="card hover shadow mb-3">
              <div className="card-body text-dark"> 
                <div className="row" role='button'>
                  <div className="col-md-4 text-center"><img src="/img/overdue.png" className='img-fluid w-75' alt='overdue' /></div>
                  <div className="col-md-8 d-flex align-items-center"><p className='h5 w-100 text-center'>OverDue ({getDueTasks()})</p></div>
                </div>
              </div>
            </div>
            <div className="card hover shadow mb-3">
              <div className="card-body text-dark">
                <div className="row" role='button'>
                  <div className="col-md-4 text-center"><img src="/img/completed.png" className='img-fluid w-75' alt='completed' /></div>
                  <div className="col-md-8 d-flex align-items-center"><p className='h5 w-100 text-center'>Completed ({getCompletedTasks()})</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 container p-5">
          <div className="pt-3">
            <h2>Task List</h2>
            <hr />
            <div className="row py-4 bg-teal rounded">

              <div className="col-md-3 pt-2">
                <div className="btn btn-success w-100">
                  <a href='/add-task' className="text-decoration-none link-light"><FaPlus /> Add Task</a>
                </div>
              </div>
              <div className="col-md-3 pt-2">
                <select
                  className="form-control"
                  value={filterPriority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>


              <div className="col-md-3 pt-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => searchTasks(e.target.value)}
                />
              </div>

              <div className="col-md-3 pt-2">
                <div className="p-2">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="showCompleted"
                    checked={showCompleted}
                    onChange={toggleShowCompleted}
                  />
                  <label className="form-check-label text-success " htmlFor="showCompleted">Completed Tasks</label>
                </div>
              </div>

            </div>
            <div className="table-responsive">
              <table className="table text-center table-hover">
                <thead>
                  <tr className="">
                    <th>Task ID</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => (
                    <tr className={`${(task.status === "completed") ? "table-info" : ""}`} key={task.taskId}>
                      <td>{task.taskId}</td>
                      <td>{task.title}</td>
                      <td>{task.priority}</td>
                      <td>{task.dueDate}</td>
                      <td className="d-flex justify-content-around">
                        <button
                          className="btn btn-danger btn-sm"
                          title="Delete"
                          onClick={() => deleteTask(task.taskId)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          title="Edit"
                          onClick={() => editTask(task.taskId)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          title="View"
                          onClick={() => viewTask(task.taskId)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          title="Completed"
                          id={task.taskId}
                          disabled={(task.status === "completed")}
                          onClick={() => completedTask(task.taskId)}
                        >
                          <FaRegCheckCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination buttons  */}
            <nav>
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <div role="button" onClick={() => setCurrentPage(number)} className="page-link">
                      {number}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
