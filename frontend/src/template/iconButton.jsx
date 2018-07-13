import React from 'react'

export default ({ style, icon, onClick, hide }) => !hide && (
  <button className={`btn btn-${style}`}
          onClick={onClick}>
    <i className={`fa fa-${icon}`}></i>
  </button>
)
