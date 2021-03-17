import { useState, useEffect } from 'react';
import './App.css';

const URL = 'http://localhost/shoppinglist/'

function App() {
  const [coll, setColl] = useState([])
  const [desc, setDesc] = useState("")
  const [task, setTask] = useState(0)

  useEffect(() => {
    let status = 0;
    fetch(URL + 'index.php')
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setColl(res)
        } else {
          alert(res.error)
        }
      }, (error) => {
        alert(error)
      }
    )
  })

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL + 'add.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: desc,
        amount: task
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setColl(coll => [...coll, res]);
          setTask(0)
          setDesc('')
        } else {
          alert(res.error)
        }
      }, (error) => {
        alert(error)
      }
    )
  }
  return (
    <div className="main">
      <h3>Shopping list</h3>
      <div>
        <form onSubmit={save}>
          <div>
            <label>Description</label>
            <input value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div>
            <label>Amount</label>
            <input value={task} onChange={e => setTask(e.target.value)} />
          </div>
          <button>Add</button>
        </form>
      </div>
      <ol>
        {coll.map(task =>(
          <li key={task.id}>{task.description}{task.amount}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
