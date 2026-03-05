import React from 'react'

// ПУНКТ 6: Сообщение об ошибке
const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <h2>Ошибка загрузки</h2>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>
        Попробовать снова
      </button>
    </div>
  )
}

export default ErrorMessage