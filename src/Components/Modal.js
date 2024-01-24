import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Modal = (props) => {
  const [editTitle, setEditTitle] = useState(props.data.title);
  const [editDate, setEditDate] = useState(props.data.dueDate);
  const [editPriority, setEditPriority] = useState(props.data.priority);
  const [editDescription, setEditDescription] = useState(props.data.description);
  const handleUpdate = (taskId)=>{
    const taskIndex = props.tasks.findIndex((task) => task.taskId === taskId);
    const updatedTask = [...(props.tasks)];
    updatedTask[taskIndex].title = editTitle;
    updatedTask[taskIndex].dueDate = editDate;
    updatedTask[taskIndex].priority = editPriority;
    updatedTask[taskIndex].description = editDescription;
    localStorage.setItem('tasks', JSON.stringify(updatedTask));
    props.setTasks(updatedTask);
    toast.success("Task Updated Successfully!!!")
    props.handleCloseModal();
  }
  return (
    <>
      <div className={`modal bg-dark bg-opacity-50 fade ${props.showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: props.showModal ? 'block' : 'none' }} data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow">
            <div className="modal-header p-0 ps-3 bg-black text-light border">
              <h5 className="modal-title">{props.data.taskId}</h5>
              <button type="button" className="btn close" data-dismiss="modal" aria-label="Close" onClick={props.handleCloseModal}>
                <span aria-hidden="true" className='h3'>&times;</span>
              </button>
            </div>
            <div className="modal-body rounded">
              <table className="table">
                <tbody className="bg-teal">
                  <tr>
                    <td>Title</td>
                    <td>:</td>
                    <td><input type="text" className="form-control border-0 " disabled={(!props.editMode || props.data.status === 'completed')} value={editTitle} onChange={(e)=>{setEditTitle(e.target.value)}} /></td>
                  </tr>

                  <tr>
                    <td>Due Date</td>
                    <td>:</td>
                    <td><input type="date" className="form-control border-0" disabled={(!props.editMode || props.data.status === 'completed')} value={editDate} onChange={(e)=>{setEditDate(e.target.value)}} /></td>
                  </tr>

                  <tr>
                    <td>Priority</td>
                    <td>:</td>
                    <td>
                      <select id="priority" className="form-control border-0" disabled={(!props.editMode || props.data.status === 'completed')} value={editPriority} onChange={(e)=>{setEditPriority(e.target.value)}}>
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>Description</td>
                    <td>:</td>
                    <td><textarea type="text" className="form-control border-0" disabled={(!props.editMode || props.data.status === 'completed')} value={editDescription} onChange={(e)=>{setEditDescription(e.target.value)}} /></td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td>{props.data.status.toUpperCase()}</td>
                  </tr>

                </tbody>
              </table>
              {props.editMode && <div className="btn btn-warning" onClick={()=>{handleUpdate(props.data.taskId)}}>Update</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;