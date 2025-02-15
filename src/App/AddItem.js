import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({newItem , setNewItem , handleSubmit}) => {

  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor='addItem'> Add Item : </label>
            <input 
              id='addItem'
              ref={inputRef}
              autoFocus
              required
              type='text'
              placeholder='Add Item'
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
            >
              <FaPlus />
            </button>
        </form>
  )
}

export default AddItem