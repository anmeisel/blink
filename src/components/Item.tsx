import { type PropsWithChildren } from "react"
import FetchNews from './FetchNews.tsx'
import FetchGifs from './FetchGifs.tsx'


type ItemProps = PropsWithChildren<{ 
    id: number;
    info: string; 
    onDelete: (id: number) => void;
}>


export default function Item({ info, id, children, onDelete }: ItemProps) {
    return (
    <article>
        <div>
            <h2>{info}</h2>
            {children}
            <FetchNews/>
            {/* <FetchGifs/> */}
        </div>
        <button onClick={() => onDelete(id)}>Delete</button>
    </article>
    )
}