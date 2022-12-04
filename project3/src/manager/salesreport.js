import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Manager from '../manager';
import './saleReport.css';

const Salesreport = () =>{
    const [startdate,setStartDate] = useState('2022-10-03');
    const [enddate, setEndDate] = useState('2022-10-04');
    console.log(startdate)
    console.log(enddate)
    const [tables, setTable] = useState([])


    const callApi = async (startdate,enddate) =>{
        await axios.get(`http://localhost:6969/certainorder/${startdate}/${enddate}`).then((result) => {
            console.log("It has succesfully got through the query")
            console.log(result.data)
            setTable(result.data)
        });
    }
      

      const change1 = event =>{
        setStartDate(event.target.value)
        console.log(startdate)
      }

      const change2 = event =>{
        setEndDate(event.target.value)
        console.log(enddate)
      }

      const displayTable = () => {
        // getAllvalue()
        // callApi()
        // if(tables.length === 0){
        //   return <div>
        //     <h1>Welcome to Chick-Fil-A</h1>
        //     <h1>This is the manager tab</h1>
        //   <img src="/chick.png" />
        //   <ul>  
        //     <button><Link to = "/manager">Ordering System</Link></button>
        //   </ul>
        //   </div>
        // }
    
        
          return(
            <><table>
                <thread class = "amongsus">
                  <tr>
                    <th>Order ID</th>
                    <th>Food ID</th>
                    <th>Quantity</th>
                    <th>Order Date</th>
                    <th>Amount</th>
                  </tr>
                </thread>
                <tbody class = "pabloemilioescobargaviria">
                  {tables.map((item) => (
                    <tr>
                      <td>{item.orderid}</td>
                      <td>{item.foodid}</td>
                      <td>{item.quantity}</td>
                      <td>{item.orderdate}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table></>
          )
        
      }

      function finalResult(){
        console.log("This is the start date: ",startdate)
        console.log("This is the enddate: ",enddate)
        callApi(startdate,enddate)
        // displayTable()
      }

      return(<>

        <div>
            <body>
            
            <h1>Sales Report</h1>
            {/* <ul>
              <button><Link to = "/manager">Ordering System</Link></button>
              <button><Link to ="/manager/excessreport">Excess Report</Link></button>
            </ul> */}
            </body>
            <input type="date" onChange={change1} value = {startdate}/>
            <input type="date" onChange={change2} value = {enddate}/>
            <button onClick = {()=>{finalResult()}}>Submit</button>
            {displayTable()}
        </div>
        </>
      )
  
    
}
export default Salesreport;