import './App.css';
import {useEffect} from 'react';
import {useState} from 'react';
function App() {
  async function getData(){
    let data = fetch('http://localhost:3001/books',{
      method: "GET"
    })
    .then(response => response.json())
    .then(data => console.log(data))

    return data;
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => {
      setData(data);
    })

  },[])

  return (
    <div className="App">
      <button>Get Data</button>
      <div>
        {
          
          data.map((book) => {
            return(
              <div>
                <h2>{book.title}</h2>
                <p>{book.id}</p>
              </div>
            )
          })
        }
      </div>
      
    </div>
  );
}

export default App;
