import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';

const FoodUpdate = () =>{
    const [foods,setFoods] = useState([])
    const [theFoodId , setTheFoodId] = useState(-1)
    const [theFoodItem, setTheFoodItem] = useState("")
    const [thePrice, setThePrice] = useState(-1.00)
    const [theSupplies, setSupplies] = useState("")
    const [theimage, setTheImage] = useState("")
    const [counter, setCounter] = useState(0)

    
    // const getFood = async()=>{
    //     await axios.get('http://localhost:6969/food').then((result)=>{
    //         console.log("It gets all of the columns")
    //         console.log("This is the result: ", result)
    //         setFoods(result.data)
    //         console.log("The size of the food is; ",result.data.length)
    //         setCounter(result.data.length)
    //     })
    // }
    useEffect(() => {
        const getFood = async()=>{
            await axios.get('http://localhost:6969/food').then((result)=>{
                console.log("It gets all of the columns")
                console.log("This is the result: ", result)
                setFoods(result.data)
                console.log("The size of the food is; ",result.data.length)
                setCounter(result.data.length)
            })
        }
        getFood()
      }, [foods])
   

    const update=async(theFoodId,theFoodItem,thePrice,theSupplies,theimage)=>{
        console.log("This is the data that is in my function: ",theFoodId,theFoodItem,thePrice,theSupplies,theimage)
        await axios.post('http://localhost:6969/updatefood',{
            foodId: theFoodId,
            foodItem: theFoodItem,
            price: thePrice,
            supplies: theSupplies,
            image: theimage
        
        }).then(()=>{
            console.log("Success")
            setTheFoodId(-1)
            setSupplies("")
            setTheFoodItem("")
            setThePrice(-1.00)
            setTheImage("")
        })
    }
    const addLeFood=async(counter,theFoodItem,thePrice,theSupplies,theimage)=>{
        console.log("This is data that is getting passed in: ",counter,theFoodItem,thePrice,theSupplies,theimage)
        await axios.post('http://localhost:6969/insertfood',{
            foodId: counter,
            foodItem: theFoodItem,
            price:thePrice,
            supplies:theSupplies,
            foodimg:theimage
        }).then(()=>{
            console.log("Success")
            setTheFoodId(-1)
            setSupplies("")
            setTheFoodItem("")
            setThePrice(-1.00)
            setTheImage("")
        })
    }
    const change1 =event=>{
    setTheFoodId(event.target.value)
    }

    const change2=event=>{
        setTheFoodItem(event.target.value)
    }
    const change3=event=>{
        setThePrice(event.target.value)
    }
    const change4=event=>{
        setSupplies(event.target.value)
    }
    const change5=event=>{
        setTheImage(event.target.value)
    }


    const displayTable = ()=>{
       
        //getFood();
        return(
            
            <><table>
                <thread>
                  <tr>
                    <th>Food ID</th>
                    <th>Food Item</th>
                    <th>Price</th>
                    <th>Supplies</th>
                    <th>Food Image</th>
                  </tr>
                </thread>
                <tbody>
                  {foods.map((item) => (
                    <tr>
                      <td>{item.foodid}</td>
                      <td>{item.fooditem}</td>
                      <td>{item.price}</td>
                      <td>{item.supplies}</td>
                      <td>{item.foodimg}</td>
                    </tr>
                  ))}
                </tbody>
              </table></>
        )
    }
    function now(){
        update(theFoodId,theFoodItem,thePrice,theSupplies,theimage);
        displayTable();
    }
    function plusFood(){
        addLeFood(counter,theFoodItem,thePrice,theSupplies,theimage);
        displayTable();
    }
    return(
        <><body>
           
            <h1>This is the foodupdate tab</h1>
            {/* <ul>
                <button><Link to="/manager">Ordering System</Link></button>
                <button><Link to="/manager/salesreport">Sales Report</Link></button>
            </ul> */}

            {displayTable()}
            <label>Food ID:</label>
            <input onChange={change1} value={theFoodId}></input>
            <label>Food Item:</label>
            <input onChange={change2} value={theFoodItem}></input>
            <label>Price:</label>
            <input onChange={change3} value={thePrice}></input>
            <label>Supply:</label>
            <input onChange={change4} value={theSupplies}></input>
            <label>image:</label>
            <input onChange={change5} value={theimage}></input>
            <button onClick={()=>now()}>Submit Change</button>
            <button onClick={()=>plusFood()}>Add Food!</button>
        </body><h1>Howdy guys</h1></>
    )
}

export default FoodUpdate