import { type PropsWithChildren } from "react"
import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import FetchNews from './FetchNews.tsx'
import FetchGifs from './FetchGifs.tsx'
import FetchData from './FetchData.tsx'
import ChildItem from './ChildItem.tsx';


type ItemProps = PropsWithChildren<{ 
    id: number;
    info: string; 
    onDelete: (id: number) => void;
}>


export default function Item({ info, id, children, onDelete }: ItemProps) {
    const [data, setData] = useState('');

    const parentToChildItem = () => {
        setData("This is data from Parent Component to the Child Component.");
      }
    return (
    <article>
        <div>
            <h2>{info}</h2>
            {children}
            <ChildItem parentToChildItem={data}/>
            {/* <FetchNews/> */}
            {/* <FetchGifs/> */}
            <Button primary onClick={() => parentToChildItem()}>Click Parent</Button>
        </div>
        <button onClick={() => onDelete(id)}>Delete</button>
    </article>
    )
}