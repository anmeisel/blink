import { useEffect, useState } from 'react'

type dataType = {
   publishedAt: string;
   title: string;
   description: string;
   onDelete: (id: number) => void;
}

const FetchNews = () => {
   const [data, setData] = useState<dataType[]>([]);
   const apikey = '48878147a05368955e614dca472e6dc4';
   const category = 'world';
   const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;
   useEffect(() => {
    fetch(url).then(result => result.json()).then(alldata => setData(alldata.articles)).catch(error => console.log(error.message))
 }, [])
//  console.log(data.articles);
 console.log(data[0]);
 if(!data){
    return(
        <article>
            <div>this one empty</div>
        </article>
    )
 }else{
    return(
        <article>
           {data.map(info => (
              <div key={info.publishedAt}>{info.title}</div>
           ))}
        </article>
    )
 }
}

export default FetchNews;

