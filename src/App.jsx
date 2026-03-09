import { useState, useEffect } from 'react'
import UserCard from './components/UserCard'
import Loader from './components/Loader'

function App() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('list')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (err) {
        console.error('Ошибка:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!users.length) return
    let result = [...users]
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(user => {
        const nameMatch = user.name.toLowerCase().startsWith(searchLower)
        const cityMatch = user.address.city.toLowerCase().startsWith(searchLower)
        const nameIncludes = user.name.toLowerCase().includes(searchLower)
        const cityIncludes = user.address.city.toLowerCase().includes(searchLower)
        return nameMatch || cityMatch || nameIncludes || cityIncludes
      })
    }
    
    if (sortBy === 'city') {
      result.sort((a, b) => a.address.city.localeCompare(b.address.city))
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    setFilteredUsers(result)
  }, [users, searchTerm, sortBy])

  if (loading) return <Loader />

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-5 bg-tg-dark">
      
      {/* Фон с градиентными кругами */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-tg-blue blur-[60px] opacity-[0.15] top-[-200px] left-[-200px] animate-float1"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-tg-purple blur-[60px] opacity-[0.15] bottom-[-150px] right-[-150px] animate-float2"></div>
      </div>

      {/* Контейнер чата */}
      <div className="relative z-10 w-full max-w-[900px] h-[800px] bg-tg-card rounded-[30px] shadow-glass flex flex-col overflow-hidden border border-white/5">
        
        {/* Шапка */}
        <header className="bg-tg-card p-5 pb-2.5 border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="flex items-center gap-2 text-white text-2xl font-semibold">
              <span className="w-2.5 h-2.5 bg-tg-green rounded-full inline-block shadow-[0_0_10px_#31B545]"></span>
              Контакты
            </h1>
            <div className="flex gap-2">
              <button 
                className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all duration-200 ${viewMode === 'grid' ? 'bg-tg-blue text-white' : 'bg-tg-surface text-tg-text hover:bg-tg-surfaceHover hover:text-white'}`}
                onClick={() => setViewMode('grid')}
              >⊞</button>
              <button 
                className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all duration-200 ${viewMode === 'list' ? 'bg-tg-blue text-white' : 'bg-tg-surface text-tg-text hover:bg-tg-surfaceHover hover:text-white'}`}
                onClick={() => setViewMode('list')}
              >≡</button>
            </div>
          </div>

          {/* Поиск и сортировка */}
          <div className="flex gap-2.5 mb-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-tg-text text-base z-10">🔍</span>
              <input
                type="text"
                placeholder="Поиск по имени или городу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-5 pl-11 bg-tg-surface border border-[#3f3f3f] rounded-full text-base text-white outline-none transition-all duration-200 focus:border-tg-blue focus:bg-[#353535] placeholder-tg-text"
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tg-text hover:text-white hover:bg-tg-surfaceHover rounded-full p-1.5 transition-all"
                  onClick={() => setSearchTerm('')}
                >✕</button>
              )}
            </div>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="py-3 px-6 bg-tg-surface border border-[#3f3f3f] rounded-full text-base text-white outline-none cursor-pointer transition-all duration-200 hover:border-tg-blue hover:bg-[#353535] min-w-[120px] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27white%27%3e%3cpath d=%27M7 10l5 5 5-5z%27/%3e%3c/svg%3e')] bg-no-repeat bg-[right_12px_center] bg-[length:16px]"
            >
              <option value="name">По имени</option>
              <option value="city">По городу</option>
            </select>
          </div>

          <div className="text-tg-text text-sm py-1.25">
            Найдено: {filteredUsers.length}
          </div>
        </header>

        {/* Список контактов */}
        <main className={`flex-1 overflow-y-auto p-5 ${viewMode === 'grid' ? 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4' : 'flex flex-col gap-2'}`}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div key={user.id} className="animate-fadeIn opacity-0" style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}>
                <UserCard user={user} viewMode={viewMode} />
              </div>
            ))
          ) : (
            <div className="text-center py-15 px-5 text-tg-text">
              <div className="text-6xl mb-4 opacity-50">😕</div>
              <h3 className="text-white mb-2 font-normal">Ничего не найдено</h3>
              <p className="text-sm">Попробуйте другой запрос</p>
            </div>
          )}
        </main>

        {/* Футер */}
        <footer className="bg-tg-card border-t border-white/5 p-2.5">
          <div className="flex justify-around items-center">
            {['Контакты', 'Чаты', 'Звонки', 'Настройки'].map((tab, i) => (
              <span key={tab} className={`py-2 px-4 text-sm font-medium cursor-default transition-colors duration-200 relative ${i === 0 ? 'text-tg-blue' : 'text-tg-text'}`}>
                {tab}
                {i === 0 && <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[30px] h-[3px] bg-tg-blue rounded-[3px]"></span>}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App