import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({item , handleChange , handleDelete}) => {
    return (
        <li className='item' key={item.id}>
            <input
                type='checkbox' checked={item.checked}
                onChange={() => handleChange(item.id)} />
            <label
                onDoubleClick={() => handleChange(item.id)}
                style={(item.checked) ? { textDecoration: "line-through" } : null}>{item.item}</label>
            <FaTrashAlt
                role='button'
                tabIndex="0"
                onClick={() => handleDelete(item.id)} 
                aria-label={`Delete ${item.item}`}
                />
        </li>
    )
}

export default LineItem