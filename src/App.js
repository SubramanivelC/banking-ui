import './App.css';
import React, {useState, useEffect} from 'react';
import TableBankList from './components/displaylistdata';
import SelectBank from './components/selectbank';

 
function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [searchtext, setSearchtext] = useState('');

  useEffect(() => {
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  };   

  const SearchHandler = (event) =>{
    setSearchtext(event.target.value)
    

  }; 

  function Search(datas) {
    const Titles = datas[0] && Object.keys(datas[0])

    return(datas.filter((row) => Titles.some((title)=>row[title].toString().toLowerCase().indexOf(searchtext.toLowerCase()) > -1 )))
  };


return (
    <div className="App">
    <div className="header">
    <SelectBank />
    <input type='text' placeholder='Search here' style={{width:'250px'}} onChange={SearchHandler}/>
    </div><br />
    {isLoaded ? <TableBankList data={Search(data)} /> : <div>" Data is Fetching from API .... Please Wait......"</div>}

      
    </div>
  );
}

export default App;
