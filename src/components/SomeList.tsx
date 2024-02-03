import Item from './Item.tsx'
import { type Item as CGoal } from '../App.tsx'

type SomeListProps = {
    items: CGoal[];
    onDeleteItem: (id: number) => void;
  }

export default function SomeList({items, onDeleteItem}: SomeListProps) {

      return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                <Item 
                id={item.id} info={item.info} onDelete={onDeleteItem}>
                    <p>{item.info}</p>
                </Item>
                </li>
            ))}
        </ul>
      )
}