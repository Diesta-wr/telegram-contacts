import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-container">
        <div className="loader-spinner">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="spinner-circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#2AABEE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.415, 31.415"
            />
          </svg>
        </div>
        <div className="loader-text">
          Загрузка контактов
          <span className="loader-dots"></span>
        </div>
      </div>
    </div>
  )
}

export default Loader