import { useState } from 'react'
import itemsImg from './assets/original_05bed5c6fbee694115da8ad57d7c06a5.png'
import Header from './components/Header.tsx'
import SomeList from './components/SomeList.tsx'

export type Item = {
  id: number
}

export default function App() {
  const [items, setItems] = useState<Item[]>([])

  function handleAddItem() {
    setItems(prevItems => {
        const newItem: Item = {
          id: Math.random(),
        }
        return [...prevItems, newItem]
      })
    }

    function handleDeleteItem(id: number) {
      setItems(prevItems => prevItems.filter((item) => item.id !== id))
    }

  return (
    <main>
      <Header 
      image={{src: itemsImg, alt: "A list of blinks"}}
      >
      <h1>Information</h1>
      </Header>
      <button onClick={handleAddItem}>Add info</button>
      <SomeList items={items} onDeleteItem={handleDeleteItem}/>
    </main>
  )
}
