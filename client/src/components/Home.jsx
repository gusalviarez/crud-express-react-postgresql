import { useState, useEffect } from 'react'

function Home() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        console.log(data)
      }
      )
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const addItem = async (name) => {
    const newUser = {
      id: users.length + 1,
      name,
      date: new Date().toISOString()
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const createdUser = await response.json();
      setUsers([...users, createdUser]);
    } catch (error) {
      console.error(error);
    }
  }

  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      });

      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createHandleRemoveItem = (id) => () => {
    removeItem(id)
  }

  return (
    <main className="home_container">
      <h1 className="title_h1">Basic Crud React - Express - Postgresql</h1>
      <section className="container">
        <aside className="container_left">
          <h2 className="subtitle">Input</h2>
          <form className='form_container' onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
            <label htmlFor="item" className='form_label'>
              Elemento a introducir:
            </label>
            <input
              className='form_input'
              name="item"
              required
              type="text"
              placeholder="Nombre"
            />
            <button
              className='form_button'
            >Añadir</button>
          </form>
        </aside>
        <aside className="container_right">
          <h2 className="subtitle">List</h2>
          {
            users.length === 0 ? (
              <p className='list_zero-items'>
                <strong>No hay elementos en la lista.</strong>
              </p>
            ) : (
              <ul className='list'>
                {
                  users.map((user) => (
                    <li className="item_container" key={user.id}>
                      <p className='item_name'>{user.name}</p>
                      <button className='item_button' onClick={createHandleRemoveItem(user.id)}>x</button>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </aside>
      </section>
    </main>
  )
}

export default Home
