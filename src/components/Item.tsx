import { type PropsWithChildren } from "react"
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import FetchNews from './FetchNews.tsx'
import FetchGifs from './FetchGifs.tsx'
import FetchData from './FetchData.tsx'
import ChildItem from './ChildItem.tsx';
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

    data.forEach(function(obj) { 
        const extraction_result = keyword_extractor.extract(obj.description,{
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            return_chained_words: true,
            remove_duplicates: true
        });
        keywords.push(extraction_result);
    });


    console.log(keywords);

    // const parentToChildItem = () => {
    //     setData("This is data from Parent Component to the Child Component.");
    //   }
    return (
    <article>
        <div>
            <h2>{info}</h2>
            {children}
            {/* <ChildItem parentToChildItem={data}/> */}
            {/* <FetchNews/> */}
            {/* <FetchGifs/> */}
            {/* <Button primary onClick={() => parentToChildItem()}>Click Parent</Button> */}
        </div>
        <button onClick={() => onDelete(id)}>Delete</button>
    </article>
    )
}