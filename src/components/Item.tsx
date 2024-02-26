import { type PropsWithChildren } from "react"
import { useEffect, useState } from 'react';
import FetchNews from './FetchNews.tsx'
import FetchGifs from './FetchGifs.tsx'
import FetchData from './FetchData.tsx'
import ChildItem from './ChildItem.tsx';
import ChildGifs from './ChildGifs.tsx';
const keyword_extractor = require("keyword-extractor");


type dataType = {
    publishedAt: string;
    title: string;
    description: string;
    onDelete: (id: number) => void;
}

type ItemProps = PropsWithChildren<{ 
    id: number;
    info: string; 
    onDelete: (id: number) => void;
}>

const keywords: any[] = [];


export default function Item({ info, id, children, onDelete }: ItemProps) {
    const [data, setData] = useState<dataType[]>([]);
    const apikey = '48878147a05368955e614dca472e6dc4';
    const category = 'world';
    const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=50&apikey=' + apikey;
    useEffect(() => {
     fetch(url).then(result => result.json()).then(alldata => setData(alldata.articles)).catch(error => console.log(error.message))
    }, [])

    if(keywords.length === 0){
        data.forEach(function(obj) { 
            console.log(obj.image);
            const extraction_result = keyword_extractor.extract(obj.description,{
                language:"english",
                remove_digits: true,
                return_changed_case:true,
                return_chained_words: true,
                remove_duplicates: true
            });
            keywords.push(extraction_result);
        });
    }


    // console.log(keywords);

    const parentToChildItem = () => {
        if(keywords.length !== 0){
            setData(keywords);
        }
    }
    return (
    <article>
        <div>
            <h2>{info}</h2>
            {children}
            <article>
                {data.map(info => (
                <div key={info.publishedAt}>{info.title}</div>
            ))}
            </article>
            <ChildItem parentToChildItem={keywords}/>
            <ChildGifs parentToChildItem={keywords}/>
            {/* <FetchNews/> */}
            {/* <FetchGifs/> */}
        </div>
        <button onClick={() => onDelete(id)}>Delete</button>
    </article>
    )
}