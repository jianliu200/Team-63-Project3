import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './receipt.css';

const Receipt = () =>{
  //all the variable we need to use
  const [message, setMessage] = useState([]); //This is the order receipt of all the item
  const [listOfBts, setListOfBits] = useState([]) //This is for all the list of buttons
  const [price, setPrice] = useState(0) //setting the total price of the order
  const [orderId, setOrderId] = useState(501);//This is for the order id
  //creating the date
  var today = new Date();
  var day = String(today.getDate()).padStart(2, '0');
  var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var year = today.getFullYear();

  var orderdt = year + '-' + month + '-' + day;
  
  //getting all the items in the food table to the listOfBts
  useEffect(() => {
    const callApi = async () =>{
      await axios.get("http://localhost:6969/food").then((result) => {
        setListOfBits(result.data)
      });
    }
    callApi()
  }, [])

  //This is for error checking
  
 
  //when you add new item into the order receipt 
  const addItem = (item) => {
    const new_list = []
    new_list.push(...message)
    new_list.push(item)
    setMessage(new_list)
    setPrice(price + item.price)
  }

  //display to button 
  const displayButtons = () => {
    if(listOfBts.length === 0){
      return <div></div>
    }
    //map all the food item to create them into butons
    return listOfBts.map((button) => {
      return(
        <button class="btn" onClick={() => addItem(button)}>
          <div class={button.fooditem}>
            <img src={button.foodimg} width="100" height="100"></img>
            <p>{button.fooditem}</p>
          </div>
        </button>
      )
    })
  }

  //show all the things that you ordered
  const displayItems = message.map(item => {
      return <li key = {item.fooditem}>{item.fooditem}: {item.price}</li>
  })

  //This is the function call for us to push the order into the backend
  const pushOrder = (orderId, foodId, quantity, orderdate, amount) =>{
    axios.post("http://localhost:6969/insertorder",{
      orderId: orderId,
      foodId: foodId,
      quantity: quantity,
      orderdate: orderdate,
      amount: amount,
    }).then(()=>{
      console.log("Success");
      
    })
  }

  // const pushSupply = ()=>{
  
  // }

  //This allows us to push everything into the order table in the data base and reset everything
  const ordering = () =>{
    for(var i = 0; i < message.length; ++i){

      pushOrder(orderId,message[i].foodid,1,orderdt,message[i].price);
    
    }
    setOrderId(orderId + 1);
    setMessage([])
    setPrice(0)
    return 
  }

  //return the html of what we created
  return(
    <>
      <div class="customer">
        <div class="menuButtons">
          {displayButtons()}
        </div>
        <div class="receipt">
          <h3>Your total Price is: <span translate="no">{price.toFixed(2)}</span></h3>
          {displayItems}
          <button onClick = {ordering} class="submit-order">Submit Order</button>
        </div>
      </div>
    </>
  )
}
export default Receipt;