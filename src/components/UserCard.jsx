import React, { useState } from 'react'

const UserCard = ({ user, viewMode }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  console.log('Город пользователя:', user.address.city);

  return (
    <div 
      className={`
        bg-tg-surface rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border border-transparent hover:bg-tg-surfaceHover hover:border-tg-blue
        flex flex-col
        ${viewMode === 'grid' ? 'items-center text-center' : ''}
        group
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Основная часть карточки */}
      <div className={`p-4 flex gap-3 ${viewMode === 'grid' ? 'flex-col items-center' : 'items-center'}`}>
        
        {/* Аватар с градиентом */}
        <div className={`
          bg-gradient-to-br from-tg-blue to-tg-purple rounded-full flex items-center justify-center text-white font-semibold relative flex-shrink-0
          ${viewMode === 'grid' ? 'w-20 h-20 text-3xl' : 'w-[54px] h-[54px] text-xl'}
        `}>
          {user.name.charAt(0)}
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-tg-green border-2 border-tg-surface rounded-full"></span>
        </div>
        
        {/* Инфо о пользователе */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-white text-base font-semibold">{user.name}</h3>
            <span className="text-tg-text text-sm">@{user.username}</span>
          </div>
          
          <div className="flex items-center gap-1 text-tg-text text-sm">
            <span className="text-base">🏙️</span>
            {user.address.city}
          </div>
        </div>

        {/* Время */}
        <div className="text-tg-text text-xs">
          {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Раскрывающиеся детали (анимация через CSS или JS) */}
      <div 
        className={`
          overflow-hidden transition-all duration-500 bg-black/20
          ${isExpanded ? 'max-h-[500px] opacity-100 p-4 border-t border-tg-blue/30' : 'max-h-0 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          {/* Email */}
          <div className="flex gap-2.5 p-2 bg-white/5 rounded-lg">
            <span className="text-base">📧</span>
            <div>
              <div className="text-tg-text text-xs uppercase">Email</div>
              <div className="text-white text-sm">{user.email}</div>
            </div>
          </div>
          
          {/* Телефон */}
          <div className="flex gap-2.5 p-2 bg-white/5 rounded-lg">
            <span className="text-base">📱</span>
            <div>
              <div className="text-tg-text text-xs uppercase">Телефон</div>
              <div className="text-white text-sm">{user.phone}</div>
            </div>
          </div>
          
          {/* Сайт */}
          <div className="flex gap-2.5 p-2 bg-white/5 rounded-lg">
            <span className="text-base">🌐</span>
            <div>
              <div className="text-tg-text text-xs uppercase">Сайт</div>
              <div className="text-white text-sm">{user.website}</div>
            </div>
          </div>
          
          {/* Компания */}
          <div className="flex gap-2.5 p-2 bg-white/5 rounded-lg">
            <span className="text-base">🏢</span>
            <div>
              <div className="text-tg-text text-xs uppercase">Компания</div>
              <div className="text-white text-sm">{user.company.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Подсказка при наведении */}
      <div className="flex items-center justify-center gap-2 p-2.5 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-tg-blue text-sm">↕</span>
        <span className="text-tg-text text-xs">{isExpanded ? 'Свернуть' : 'Подробнее'}</span>
      </div>
    </div>
  )
}

export default UserCard