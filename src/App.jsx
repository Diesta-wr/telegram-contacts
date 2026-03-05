import { useState, useEffect } from 'react'
import UserCard from './components/UserCard'
import Loader from './components/Loader'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('list')

  // Загрузка данных
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

  // 🔍 УЛУЧШЕННЫЙ ПОИСК + СОРТИРОВКА
  useEffect(() => {
    if (!users.length) return
    
    let result = [...users]
    
    // 🔥 ПОИСК ПО ПЕРВЫМ БУКВАМ (и по имени, и по городу)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(user => {
        // Ищем по имени (с начала)
        const nameMatch = user.name.toLowerCase().startsWith(searchLower)
        // Ищем по городу (с начала)
        const cityMatch = user.address.city.toLowerCase().startsWith(searchLower)
        // Ищем по имени (в любом месте)
        const nameIncludes = user.name.toLowerCase().includes(searchLower)
        // Ищем по городу (в любом месте)
        const cityIncludes = user.address.city.toLowerCase().includes(searchLower)
        
        return nameMatch || cityMatch || nameIncludes || cityIncludes
      })
    }
    
    // СОРТИРОВКА
    if (sortBy === 'city') {
      result.sort((a, b) => a.address.city.localeCompare(b.address.city))
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    setFilteredUsers(result)
  }, [users, searchTerm, sortBy])

  if (loading) return <Loader />

  return (
    <div className="app">
      <div className="telegram-bg">
        <div className="gradient-circle circle1"></div>
        <div className="gradient-circle circle2"></div>
      </div>

      <div className="chat-container">
        <header className="chat-header">
          <div className="header-top">
            <h1 className="chat-title">
              <span className="status-dot"></span>
              Контакты
            </h1>
            <div className="header-actions">
              <button 
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞
              </button>
              <button 
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ≡
              </button>
            </div>
          </div>

          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Поиск по имени или городу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="sort-select"
            >
              <option value="name">По имени</option>
              <option value="city">По городу</option>
            </select>
          </div>

          <div className="contacts-count">
            Найдено: {filteredUsers.length}
          </div>
        </header>

        <main className={`contacts-view ${viewMode}`}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div key={user.id} className="contact-item-wrapper">
                <UserCard user={user} viewMode={viewMode} />
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">😕</div>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте другой запрос</p>
            </div>
          )}
        </main>

        <footer className="chat-footer">
          <div className="footer-tabs">
            <span className="tab active">Контакты</span>
            <span className="tab">Чаты</span>
            <span className="tab">Звонки</span>
            <span className="tab">Настройки</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App