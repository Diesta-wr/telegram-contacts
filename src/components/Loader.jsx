import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-tg-dark flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Спиннер */}
        <div className="relative">
          <svg 
            className="w-12 h-12 animate-spin" 
            viewBox="0 0 50 50"
            style={{ animationDuration: '2s' }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#2AABEE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.415, 31.415"
              className="origin-center animate-[dash_1.5s_ease-in-out_infinite]"
            />
          </svg>
        </div>
        
        {/* Текст загрузки */}
        <div className="text-white text-base font-medium flex items-center gap-1">
          Загрузка контактов
          <span className="animate-[dots_1.5s_steps(4,end)_infinite]">.</span>
        </div>
      </div>
    </div>
  )
}

export default Loader