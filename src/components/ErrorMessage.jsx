import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center p-5">
      
      {/* Иконка ошибки */}
      <span className="text-5xl">⚠️</span>
      
      {/* Заголовок */}
      <h2 className="text-white text-xl font-semibold">
        Ошибка загрузки
      </h2>
      
      {/* Сообщение об ошибке (красный текст) */}
      <p className="text-[#ff6b6b] text-[1.2rem] max-w-[500px]">
        {message}
      </p>
      
      {/* Кнопка с градиентом */}
      <button 
        onClick={() => window.location.reload()}
        className="
          py-3 px-7.5 
          bg-gradient-to-r from-[#00d9ff] to-[#00ff88] 
          border-none rounded-[25px] 
          text-[#1a1a2e] font-semibold text-base 
          cursor-pointer 
          transition-transform duration-200 ease-in-out
          hover:scale-[1.05] hover:shadow-[0_5px_20px_rgba(0,255,136,0.4)]
          active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50
        "
      >
        Попробовать снова
      </button>
    </div>
  )
}

export default ErrorMessage