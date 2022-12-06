import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import './excessreport.css';

function ExcessReport(){
const [startdate, setStartDate] = useState('2022-10-02')
const [enddate, setEndDate] = useState('2022-10-03')
const[columns, setColumns] = useState([])
const[starts, setStarts] = useState([])
const[ends, setEnds] = useState([])
const[excess,setExcess] = useState([])

useEffect(() => {
    const getColumns = async()=>{
        await axios.get('https://team63chickfila.onrender.com/column').then((result)=>{
            // console.log("It gets all of the columns")
            setColumns(result.data)
        })
    }
    getColumns()
  },[]);
//   console.log("This is all of the columns in the system: ", columns)
  const change1 = event =>{
    setStartDate(event.target.value)
    console.log(startdate)
  }

  const change2 = event =>{
    setEndDate(event.target.value)
    console.log(enddate)
  }


  const callApiStart = async (startdate) =>{
    //Object.values(temp1[0])[0]
    await axios.get(`https://team63chickfila.onrender.com/supplydatestart/${startdate}`).then((result) => {
        const new_list = []
        //console.log("This is the data from the api start: ",result.data);
        for(var i = 1; i<Object.values(result.data[0]).length; ++i){
          //console.log("This is the value for each one for start: ",Object.values(result.data[0])[i])
          new_list.push(Object.values(result.data[0])[i])
        }
        console.log("The new list for start is :",new_list)
        setStarts(new_list)
        //console.log("This is the starts array: ",starts)
    });
  
  }
    


const callApiEnd = async (enddate) =>{ 
    await axios.get(`https://team63chickfila.onrender.com/supplydateend/${enddate}`).then((result) => {
      
      const new_list = []
        //console.log("This is the data from the api end: ",result.data);
        for(var i = 1; i<Object.values(result.data[0]).length; ++i){
          //console.log("This is the value for each one for end: ",Object.values(result.data[0])[i])
          new_list.push(Object.values(result.data[0])[i])
        }
        console.log("The new list for end is :",new_list)
        setEnds(new_list)
        // console.log("This is the ends array: ",ends)
      
    });
}

const isExcess = async()=>{
   console.log("This is starts: ",starts)
    console.log("This is ends: ",ends)
    console.log(columns);
    const new_list = []
    for(var i =1; i < columns.length;++i){
        // console.log(columns[i])
        // console.log("This is the start value", starts[i-1])
        // console.log("This is the end value: ",ends[i-1])
        const math = (starts[i-1]-ends[i-1])/(starts[i-1])
        console.log("The math is ",math)
        if(math < .1){
          console.log("Made it bitch")
          new_list.push(columns[i])
        }
        
    }
    console.log("This is the new list: ",new_list)
    setExcess(new_list)
}

const displayTable = () => {
  
      return(
       
        <><table id="excessTable">
            {/* <thread> */}
              <tr>
                <th>Food ID</th>
              </tr>
            {/* </thread> */}
            <tbody>
              {excess.map((item) => (
                <tr>
                  <td key = {item.column_name}>{item.column_name}</td>
                </tr>
              ))}
            </tbody>
          </table></>
      )
    
  }

  function finalResult(){
    console.log("This is the start date: ",startdate);
    console.log("This is the enddate: ",enddate);
    callApiStart(startdate);
    callApiEnd(enddate);
    isExcess();
    // console.log("This is the array for start: ",starts);
    // console.log("This is the array for the end: ", ends);
    displayTable();
  }
  

return(
    <><body>
        
        {/* <ul>
            <button><Link to="/manager">Ordering System</Link></button>
            <button><Link to="/manager/salesreport">Sales Report</Link></button>
        </ul> */}
    </body>
    
    
    <h1 class="intro">Excess Report</h1>
    
      <div class="dateHeader">
        <h3 class="start">Start</h3>
        <h3 class="end">End</h3>
      </div>
      <div>
      <input type="date" onChange={change1} value = {startdate} min="2022-10-02" max="2022-12-31" class="startDate"/>
      <input type="date" onChange={change2} value = {enddate} min="2022-10-02" max="2022-12-31" class="endDate"/>
      <button onClick = {()=> finalResult()} class="reddy">Submit</button>
      </div>
    
    
    {displayTable()}
    </>

)


}

export default ExcessReport