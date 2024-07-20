import { useState, useEffect } from 'react'
import './App.css'

// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])

  // 4 - custom
  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // 1- Resgatando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url)
  

  //     const data = await res.json()

  //     setProducts(data)
  //   }

  //   fetchData()
  // }, [])


  // 2- Add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // })

    // // 3 - carregamento dinâmico
    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // 5 - refatorando post
    httpConfig(product, "POST")

    setName("")
    setPrice("")

  }

  // 8 - desafio 6
  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  return (
    <>
      <h1>Lista de Produtos</h1>
      {/* 6 - loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <table border={'5px'}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Ação</th>
            </tr>
          </thead>
          {items && items.map((product) => (
            <tbody key={product.id}>
              <tr>
                <td>
                  {product.id}
                </td>
                <td>
                  {product.name}
                </td>
                <td>
                  - R$ {product.price}
                </td>
                <td>
                  <button onClick={() => handleRemove(product.id)}>Excluir</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name='name' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="number" value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
          </label>
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </>
  )
}

export default App
