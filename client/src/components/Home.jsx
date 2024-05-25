import { useState } from 'react'

function Home() {

  const [items, setItems] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const addItem = (text) => {
    const newItem = {
      id: crypto.randomUUID(),
      text,
      timestamp: Date.now()
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })
  }

  const removeItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id)
    })
  }

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
            <label for="item" className='form_label'>
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
            items.length === 0 ? (
              <p className='list_zero-items'>
                <strong>No hay elementos en la lista.</strong>
              </p>
            ) : (
              <ul className='list'>
                {
                  items.map((item) => {
                    return (
                      <li className="item_container" key={item.id}>
                        <p className='item_name'>{item.text}</p>
                        <button className='item_button' onClick={createHandleRemoveItem(item.id)}>x</button>
                      </li>
                    )
                  })
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
