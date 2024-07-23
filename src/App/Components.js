import React from 'react';
import ItemsList from './ItemsList';


const Components = ({items , handleChange , handleDelete}) => {

  return (
    <>

      {
        (items.length !==0 ) ?
        (
          <ItemsList 
          items = {items}
          handleChange = {handleChange}
          handleDelete = {handleDelete} />
        ) :
        (
          <p>Your list is empty</p>
        )
      }
    </>
   
  )
}

export default Components