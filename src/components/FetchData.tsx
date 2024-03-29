import { useEffect, useState } from 'react'

type dataType = {
   userId: number;
   id: number;
   title: string;
   body: string;
   onDelete: (id: number) => void;
}

const FetchData = () => {
   const [data, setData] = useState<dataType[]>([]);
   const url = 'https://jsonplaceholder.typicode.com/posts'
   useEffect(() => {
      fetch(url).then(result => result.json()).then(alldata => setData(alldata)).catch(error => console.log(error.message))
   }, [])
   return(
   <article>
      {data.map(info => (
         <div key={info.id}>{info.title}</div>
      ))}
   </article>
   )
}

export default FetchData

