import React, { useEffect } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import Components from './Components';
import Footer from './Footer';
import { useState } from 'react';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

const Project1 = () => {
  const API_URL = 'http://localhost:3500/items';
  const [items , setItems] = useState([]);
  const [fetchError , setFetchError] = useState(null);
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    /* JSON.parse(localStorage.getItem("ToDo_List")) */ //to take data in local storage
    /* now we take data in server */

    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Data Not Received")
        const listItem = await response.json();
      //const formatItem = listItem.map(item => ({...item , id: parseInt(item.id)}))

        setItems(listItem);
        setFetchError(null)
      }catch(err){
        setFetchError(err.message);
      }finally{
        setIsLoading(false)
      }
    }
      /* setTimeout(() => {
        (async () => await fetchItems()) ()
      },2000) */
      (async () => await fetchItems()) ()
    
  } ,[])
    
  const handleChange = async (id) => {
    const listItem = items.map((item) => item.id===id ? {...item , checked : !item.checked} : item);
    setItems(listItem);
    /* localStorage.setItem("ToDo_List" , JSON.stringify(listItem)); */ //now this no need because we get data in server side
    //update changes in server
    const myItem = listItem.filter((item) => item.id===id)
    
    const updateOption = {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({checked:myItem[0].checked})
     }
     const urlReq = `${API_URL}/${id}`
     const result = await apiRequest(urlReq , updateOption)
     if(result) setFetchError(result)
  
  }

  const handleDelete = async (id) =>{
      const deleteItem = items.filter((item) => item.id !== id)
      setItems(deleteItem);
      /* localStorage.setItem("ToDo_List" , JSON.stringify(deleteItem)); */

      //delete data in server

      const deleteOption = {
        method : 'DELETE'
      }
      const urlReq = `${API_URL}/${id}`
     const result = await apiRequest(urlReq , deleteOption)
     if(result) setFetchError(result)

    }

    const [newItem , setNewItem] = useState("");

    const handleSubmit = (e) =>{
      e.preventDefault();
      if (!newItem) return;
      addItem(newItem)
      setNewItem("");
      
    }
    const addItem = async (item) => {
      //get id code
      const preId = parseInt(items[items.length - 1].id)
      const id = items.length ? preId +1 : 1;
      const idAsString = id.toString();
      const addNewItem = { id : idAsString /* items.length + 1 */ ,checked:false,item}
      const listItem = [...items , addNewItem]
      setItems(listItem);
      
     /*  localStorage.setItem("ToDo_List" , JSON.stringify(listItem)); */

     //add item in server
     const postOption = {
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(addNewItem)
     }
     const result = await apiRequest(API_URL , postOption)
     if(result) setFetchError(result)
    }

    const [search , setSearch] = useState("");


  return (
    <div className='App'>
        <Header />
        <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
        />
        <SearchItem
          search = {search}
          setSearch = {setSearch}
        />
        <main>
          {isLoading && <p> Loading... </p>}
          {fetchError && <p> {`Error : ${fetchError}`} </p>}
          { !isLoading &&  !fetchError && <Components
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleChange = {handleChange}
          handleDelete = {handleDelete}
          />}
        </main>
        <Footer 
        length = {items.length}/>
    </div>
  )
}

export default Project1