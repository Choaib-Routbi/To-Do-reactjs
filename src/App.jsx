import React, { useState, useEffect } from 'react';
import './css/App.css'
import './css/index.css'

function App() {
  const [inputValue, setInputValue] = useState(() => {
    // Load tasks from localStorage on initial render
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('normal');

    ////////////////////switchMode///////////////////////////////////
   const [bgDark, setBgDark] = useState(() => {
      const saved = localStorage.getItem('bgDark');
      return saved ? JSON.parse(saved) : true; // default to true
    });
  
  
   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(inputValue));
      localStorage.setItem('bgDark', JSON.stringify(bgDark));
      document.body.style.backgroundColor = bgDark ? 'black' : 'aliceblue';
      document.body.style.color = bgDark ? 'white' : 'black';
    }, [inputValue,bgDark]);
  
    const ToggleMode = () =>{
      setBgDark((prev) => !prev)
      console.log("bg btn clicked");
    }
  ///////////////////////////////////////////////////////////
  
  // Save tasks to localStorage whenever inputValue changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(inputValue));
  }, [inputValue,bgDark]);

  const clickToAdd = () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks
    const newTaskObj = {
      text: newTask,
      createdAt: new Date().toLocaleString(),
      done: false,
      priority: priority
    };
    setInputValue([newTaskObj, ...inputValue]); // Add new task to the top
    setNewTask(''); // Clear the input field
    setPriority('normal');
  };

  const clickToDelete = (index) => {
    const updatedTasks = inputValue.filter((_, i) => i !== index);
    setInputValue(updatedTasks);
  };

  const toggleDone = (index) => {
    const updatedTasks = inputValue.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setInputValue(updatedTasks);
  };

  return (
    <div
      className="app-container"
      style={{
        margin: 'auto',
        textAlign: 'center',
        minWidth: '80px',
        maxWidth: '1000px',
        padding: '20px',
        width: '95vw',
        boxSizing: 'border-box'
      }}
    >
      {
      document.body.style.backgroundColor = bgDark ? <button className='toggleModeBtn' onClick={ToggleMode}>dark</button> : <button className='toggleModeBtn' onClick={ToggleMode}>light</button>

      }
      <h2 className='title'>To Do List</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap'
        }}
      >
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          style={{
            flex: '1 1 180px',
            minWidth: 0,
            maxWidth: '100%',
            marginBottom: 8
          }}
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={{
            padding: '8px 10px',
            borderRadius: 8,
            border: '1px solid #35354d',
            background: '#181824',
            color: '#f3f3f3',
            fontSize: '1rem',
            flex: '0 0 110px',
            marginBottom: 8
          }}
        >
          <option value="urgent">urgent</option>
          <option value="normal">normal</option>
          <option value="can wait">can wait</option>
        </select>
        <button
          onClick={clickToAdd}
          className='add-button'
          style={{
            flex: '0 0 70px',
            marginBottom: 8
          }}
        >
          Add
        </button>
      </div>
      <div className='tasks-container'>
        <ul style={{ padding: 0 }}>
          {inputValue.map((task, index) => (
            <li
              key={index}
              className='task-item'
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '68px',
                padding: '0 8px',
                marginBottom: '30px',
                position: 'relative',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(index)}
                style={{
                  marginRight: 12,
                  width: 20,
                  height: 20,
                  accentColor: '#7ee787',
                  flexShrink: 0
                }}
              />
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '48px',
                  position: 'relative',
                  flexWrap: 'wrap'
                }}
              >
                {/* Priority label */}
                {task.priority === 'urgent' && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontSize: '0.65em',
                      color: '#ff5c5c',
                      fontWeight: 'bold',
                      letterSpacing: '0.5px'
                    }}
                  >
                    urgent
                  </span>
                )}
                {task.priority === 'normal' && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontSize: '0.65em',
                      color: '#7ee787',
                      fontWeight: 'bold',
                      letterSpacing: '0.5px'
                    }}
                  >
                    normal
                  </span>
                )}
                {task.priority === 'can wait' && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontSize: '0.65em',
                      color: '#6ec6ff',
                      fontWeight: 'bold',
                      letterSpacing: '0.5px'
                    }}
                  >
                    can wait
                  </span>
                )}
                {/* Task text */}
                <span
                  style={{
                    textAlign: 'left',
                    textDecoration: task.done ? 'line-through' : 'none',
                    opacity: task.done ? 0.5 : 1,
                    fontSize: '1rem',
                    flex: 1,
                    wordBreak: 'break-word',
                    transition: 'opacity 0.2s',
                    textWrap: 'wrap',
                    paddingTop: task.priority !== 'normal' ? '12px' : 0,
                    minWidth: 0,
                    marginTop: '20px'
                  }}
                >
                  {task.text}
                </span>
                {/* Delete button and date in a column */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    marginLeft: 12,
                    minWidth: 70
                  }}
                >
                  <button
                    onClick={() => clickToDelete(index)}
                    className='delete-button'
                    style={{
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                      marginBottom: 4
                    }}
                  >
                    X
                  </button>
                  <span
                    style={{
                      fontSize: '0.75em',
                      color: '#aaa',
                      whiteSpace: 'nowrap',
                      alignSelf: 'flex-end'
                    }}
                  >
                    {task.createdAt}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 600px) {
            .app-container {
              max-width: 98vw !important;
              padding: 8vw 2vw !important;
            }
            .task-item {
              flex-direction: column !important;
              align-items: stretch !important;
              padding: 10px 4px !important;
            }
            .task-item > div {
              flex-direction: row !important;
              align-items: flex-start !important;
            }
            .delete-button {
              margin-left: 0 !important;
              margin-top: 0 !important;
              width: auto !important;
              text-align: center;
            }
            input[type="text"], select, .add-button {
              width: 100% !important;
              margin-bottom: 8px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
