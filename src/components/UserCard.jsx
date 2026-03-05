import React, { useState } from 'react'
import './UserCard.css'

const UserCard = ({ user, viewMode }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Для проверки - выведи в консоль
  console.log('Город пользователя:', user.address.city); // 👈 СМОТРИ СЮДА!

  return (
    <div 
      className={`user-card ${viewMode} ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="card-main">
        <div className="card-avatar">
          {user.name.charAt(0)}
          <span className="online-dot"></span>
        </div>
        
        <div className="card-info">
          <div className="card-header">
            <h3 className="user-name">{user.name}</h3>
            <span className="user-username">@{user.username}</span>
          </div>
          
          {/* 👇👇👇 ГЛАВНОЕ - ПРОВЕРЬ ЭТУ СТРОКУ! */}
          <div className="user-city">
            <span className="city-icon">🏙️</span>
            {user.address.city}  {/* ДОЛЖНО БЫТЬ address.city, НЕ city! */}
          </div>
        </div>

        <div className="card-time">
          {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default UserCard