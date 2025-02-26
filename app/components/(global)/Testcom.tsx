import React from 'react'

const Testcom = (name: string, typename: string) => {
  return (
    <div>
      <label>{name}</label><input type={typename}>{name}</input></div>
  )
}

export default Testcom