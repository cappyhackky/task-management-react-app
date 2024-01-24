import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const validateRequired = (requiredFields) => {
    requiredFields.forEach((field) => {
      const inputField = document.getElementById(field);
      if (inputField.value === '') {
        console.log(inputField);
        inputField.classList.add('is-invalid');
      } else {
        inputField.classList.remove('is-invalid');
      }
    });
  }
  const validateForm = () => {
    const requiredFields = ['title', 'dueDate', 'priority', 'description']
    validateRequired(requiredFields)
    console.log(document.querySelectorAll('.is-invalid'));
    return document.querySelector('.is-invalid') === null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
      const newTask = {
        taskId: "TSK" + (Date.now()).toString(),
        title,
        dueDate,
        priority,
        description,
        status: "Pending"
      }
      const updatedTasks = [...taskArray, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      toast.success(`New task [${newTask.taskId}] created successfully!`, {
        position: 'top-right'
      });
      setTitle('');
      setDueDate('');
      setPriority('');
      setDescription('');
    } else {
      toast.error("Some fields are empty", {
        position: 'top-right'
      });
    }
  }
  
  return (
    <>
      <ToastContainer />
      <div className="container py-4 my-5">
        <h2 className="text-center">Add a task</h2>
        <form className="col-md-6 mx-auto">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" value={title} id="title" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor="title">Due Date</label>
            <input type="date" className="form-control" value={dueDate} id="dueDate" min={today} onChange={(e) => { setDueDate(e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" className="form-control" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea type="text" className="form-control" rows={3} value={description} id="description" placeholder="Description" onChange={(e) => { setDescription(e.target.value) }} />
          </div>
          <div className="text-center mt-2"><button className="btn btn-success" onClick={handleSubmit}>Add Task</button></div>
        </form>
      </div>
    </>
  )
}

export default TaskForm