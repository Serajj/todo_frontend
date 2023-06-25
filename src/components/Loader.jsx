import React from 'react'

export default function Loader(props) {
  return (
    <div className='loader-container'>
        <img src="/loader.gif" alt='Loader' />
        <h1>{props.title ?? "Loading"}</h1>
    </div>
  )
}
