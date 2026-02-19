import { useState } from 'react'
import '../hooks.css'

export default function UseStateExample() {
  // 1. 숫자 상태
  const [count, setCount] = useState(0)

  // 2. 문자열 상태
  const [name, setName] = useState('')

  // 3. 배열 상태
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState('')

  // 4. 객체 상태
  const [user, setUser] = useState({ username: '', email: '', age: '' })

  // 5. 불린 상태
  const [isVisible, setIsVisible] = useState(false)

  // ===== 핸들러 함수들 =====

  // 카운터 함수들
  const handleIncrement = () => setCount(count + 1)
  const handleDecrement = () => setCount(count - 1)
  const handleReset = () => setCount(0)

  // 투두 추가
  const handleAddTodo = () => {
    if (todoInput.trim() === '') return
    const newTodo = {
      id: Date.now(),
      text: todoInput,
      completed: false
    }
    setTodos([...todos, newTodo])
    setTodoInput('')
  }

  // 투두 삭제
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // 투두 완료 처리
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // 사용자 정보 입력
  const handleUserChange = (field, value) => {
    setUser({
      ...user,
      [field]: value
    })
  }

  // 사용자 정보 초기화
  const handleResetUser = () => {
    setUser({ username: '', email: '', age: '' })
  }

  return (
    <div className="hooks-example">
      <h2>useState 연습</h2>

      {/* 1. 카운터 예제 */}
      <section className="example-section">
        <h3>1️⃣ 숫자 상태 - 카운터</h3>
        <div className="example-content">
          <div className="counter">
            <p>현재 값: <strong>{count}</strong></p>
            <div className="button-group">
              <button onClick={handleDecrement}>-1</button>
              <button onClick={handleIncrement}>+1</button>
              <button onClick={handleReset} className="reset-btn">초기화</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 문자열 상태 */}
      <section className="example-section">
        <h3>2️⃣ 문자열 상태</h3>
        <div className="example-content">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="input-field"
          />
          <p>입력한 이름: <strong>{name || '(아직 입력되지 않음)'}</strong></p>
        </div>
      </section>

      {/* 3. 배열 상태 */}
      <section className="example-section">
        <h3>3️⃣ 배열 상태 - Todo 리스트</h3>
        <div className="example-content">
          <div className="todo-input-group">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder="할 일을 입력하세요"
              className="input-field"
            />
            <button onClick={handleAddTodo}>추가</button>
          </div>

          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="empty">등록된 할 일이 없습니다</li>
            ) : (
              todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="delete-btn"
                  >
                    삭제
                  </button>
                </li>
              ))
            )}
          </ul>
          <p className="info">등록된 할 일: {todos.length}개</p>
        </div>
      </section>

      {/* 4. 객체 상태 */}
      <section className="example-section">
        <h3>4️⃣ 객체 상태 - 사용자 정보</h3>
        <div className="example-content">
          <div className="user-form">
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => handleUserChange('username', e.target.value)}
                placeholder="이름을 입력하세요"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleUserChange('email', e.target.value)}
                placeholder="이메일을 입력하세요"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>나이</label>
              <input
                type="number"
                value={user.age}
                onChange={(e) => handleUserChange('age', e.target.value)}
                placeholder="나이를 입력하세요"
                className="input-field"
              />
            </div>
            <button onClick={handleResetUser} className="reset-btn">초기화</button>
          </div>

          <div className="user-info">
            <h4>입력된 정보:</h4>
            <p>이름: <strong>{user.username || '(미입력)'}</strong></p>
            <p>이메일: <strong>{user.email || '(미입력)'}</strong></p>
            <p>나이: <strong>{user.age || '(미입력)'}</strong></p>
          </div>
        </div>
      </section>

      {/* 5. 불린 상태 */}
      <section className="example-section">
        <h3>5️⃣ 불린 상태 - 토글</h3>
        <div className="example-content">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className={isVisible ? 'toggle-btn active' : 'toggle-btn'}
          >
            {isVisible ? '숨기기' : '표시하기'}
          </button>
          {isVisible && (
            <div className="toggle-content">
              <p>🎉 숨겨진 내용이 나타났습니다!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
