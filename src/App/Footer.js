import React from 'react';

const Footer = ({length}) => {
    /* chapter 4 Functional components */
    
  return (
    <footer>
        {length} List of {(length === 1 | length === 0)? "item" : "items"}
    </footer>
  )
}

export default Footer