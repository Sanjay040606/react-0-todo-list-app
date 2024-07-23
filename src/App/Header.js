import React from 'react';

const defaultProps = {
  title : "To Do List"
}
function Header({titleName = defaultProps}) {
  const { title } = titleName
  return (
    <header>
        <h1>{title}</h1>
    </header>
  )
}
/* Header.defaultProps = {
  title : "To Do List"
} */
export default Header