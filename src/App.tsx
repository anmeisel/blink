import './App.css';
import { useState } from 'react'
import binkGif from './assets/output-onlinegiftools.gif'
import SomeList from './components/SomeList.tsx'

export type Item = {
  id: number
}

export default function App() {
  const [items, setItems] = useState<Item[]>([])
  const [gifPlayed, setGifPlayed] = useState(false);

  function handleAddItem() {
    if (!gifPlayed) {
      const blinkElement = document.getElementById('blink') as HTMLImageElement;
      if (blinkElement) {
        blinkElement.onload = () => {
          blinkElement.src = binkGif;
          setGifPlayed(true);
        };
        blinkElement.src = binkGif; 
      }
    }

    setItems(prevItems => {
        const newItem: Item = {
          id: Math.random(),
        }
        return [...prevItems, newItem]
      })
    }

    function handleDeleteItem(id: number) {
      if (!gifPlayed) {
        const blinkElement = document.getElementById('blink') as HTMLImageElement;
        if (blinkElement) {
          blinkElement.onload = () => {
            blinkElement.src = binkGif;
            setGifPlayed(true);
          };
          blinkElement.src = binkGif; 
        }
      }

      setItems(prevItems => prevItems.filter((item) => item.id !== id))
    }

  return (
    <main>
      Blink to update: <button className="blink-img" onClick={handleAddItem}><img id="blink" src={binkGif} alt="Blinking eye gif"></img></button>
      <SomeList items={items} onDeleteItem={handleDeleteItem}/>
    </main>
  )
}
