import {React, useState, useEffect} from 'react';
import './displaylistdata.css';


const TableBankList = (props) => {

  const columns = props.data[0] && Object.keys(props.data[0]);
  const [listperpage, setListperpage] = useState(25);
  const [currentpage, setCurrentpage] = useState(1);
  const [maxpagelimit, setMaxpagelimit] = useState(5);
  const [minpagelimit, setMinpagelimit] = useState(0);
  const [pagenumberlimit, setPagenumberlimit] = useState(5);

  const pages =[];

  for(let i=1; i<=Math.ceil(props.data.length/listperpage); i++){
    pages.push(i);
  }

  const onPagenumberHandler = (event) => {
    setCurrentpage(Number(event.target.id))}

  const renderPageNumbers = pages.map(number =>{
    
      if(number < maxpagelimit+1 && number > minpagelimit){
        
      return(

              <li key={number} id={number} onClick={onPagenumberHandler} 
              className={currentpage === number ? 'active' : ''}>
              {number}
      </li>)
    } else {
      return null;
    }
  })
  const ArrayLastItem = currentpage*listperpage;
  const ArrayFirstItem = ArrayLastItem - listperpage;
  const displayDataperpage =props.data.slice(ArrayFirstItem,ArrayLastItem)

  const onPrevHandler = () =>{
    setCurrentpage(currentpage-1)
    if((currentpage-1)%pagenumberlimit===0){
      setMaxpagelimit(maxpagelimit-pagenumberlimit)
      setMinpagelimit(minpagelimit-pagenumberlimit)
    }


  };
  const onNextHandler = () =>{
    setCurrentpage(currentpage+1)
    if((currentpage+1) > maxpagelimit){
      setMaxpagelimit(maxpagelimit+pagenumberlimit)
      setMinpagelimit(minpagelimit+pagenumberlimit)
    }

  };
  const loadmoreHandler = () =>{
    setListperpage(listperpage+25)}

  let pageIncrementBtn = null;
  if(pages.length > maxpagelimit){
    pageIncrementBtn = <li onClick={onNextHandler} >&hellip;</li>
  };

  let pagedecrementBtn = null;
  if(minpagelimit >=1){
    pagedecrementBtn = <li onClick={onPrevHandler}>&hellip;</li>
  };

 
 
  return(

    <div>
  
    <table className='table-top' cellPadding={0} cellSpacing={0}>

    <thead className='table-head'>
    <tr>
    <th>Ifsc</th>
    <th>Bank ID</th>
    <th>Branch</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Bank Name</th>
    </tr>

    </thead><tbody>

    {displayDataperpage.map((data)=>(<tr key={data.ifsc}>
    <td>{data.ifsc}</td>
    <td>{data.bank_id}</td>
    <td>{data.branch}</td>
    <td style={{ width: 160 }} align="center">{data.address}</td>
    <td>{data.city}</td>
    <td>{data.state}</td>
    <td>{data.bank_name}</td>
    

    </tr>))
  }
  </tbody>
  
      
    </table>
      <ul className='pagenumber'>
      <li><button onClick={onPrevHandler} disabled={currentpage === pages[0] ? true : false}>Prev</button></li>
      
      {pagedecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      
      <li><button onClick={onNextHandler} disabled={currentpage === pages[pages.length-1]? true : false}>Next</button></li><br></br>
     
      </ul>
      <div className='loadmorebtn'> <button onClick={loadmoreHandler}>Load More</button> </div>
      </div>


    );

};

export default TableBankList;