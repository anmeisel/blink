import React from 'react';
import { SetStateAction, useEffect, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useAsync } from "react-async-hook"
import {
    Carousel,
    Gif,
    Grid,
    Video,
    VideoOverlay
  } from "@giphy/react-components"
import { IGif } from "@giphy/js-types";
import ResizeObserver from "react-resize-observer";
const _ = require("lodash");

const gf = new GiphyFetch('bvWogBDRALOdICcvDhJPS5XVxe50qs7O')
const gifsall: IGif[][] = []
var gifsconcatenated: any[] = [];

// type dataType = {
//     userId: number;
//     id: number;
//     url: string;
//     body: string;
//     onDelete: (id: number) => void;
//  }
async function getgiffs({parentToChildItem}){

    for(const keyarray of parentToChildItem){
        for(const key of keyarray){
            const category = key;
            const { data: gifs } = await gf.search(category, { sort: 'relevant', lang: 'es', limit: 1, type: 'gifs' })//.then(result => result.data).then(alldata => setData(alldata)).catch(error => console.log(error.message))
            gifsall.push(gifs);
        }
    }
}
export default function ChildGif({parentToChildItem}) {

    // const [data, setData] = useState<IGif[]>();

    // useEffect(() => {
    //const { data: gifs } = await gf.search("world", { sort: 'relevant', lang: 'es', limit: 5, type: 'gifs' })//.then(result => result.data).then(alldata => setData(alldata)).catch(error => console.log(error.message))
    // }, [])

    // for(const keyarray of parentToChildItem){
    //     for(const key of keyarray){
    //         console.log(key);
    //         const category = key;
    //         useEffect(() => {
    //             gf.search(category, { sort: 'relevant', lang: 'es', limit: 5, type: 'gifs' }).then(result => result.data).then(alldata => setData(alldata)).catch(error => console.log(error.message))
    //         }, [])
    //     }
    // }
    if(gifsall.length === 0){
        getgiffs({parentToChildItem});
    }
    // const giffsconcat = [].concat.apply([], gifsall);
    for(var i = 0; i < gifsall.length; i++)
    {
        gifsconcatenated = gifsconcatenated.concat(gifsall[i]);
    }
    console.log(gifsconcatenated.length);
    gifsconcatenated = _.uniq(gifsconcatenated, 'id');


    // data.map(info => (
    //     console.log(info)
    // ))

    return (
        <div>
            {/* {parentToChildItem} */}
            {gifsconcatenated.map(info => (
                <iframe key={info.id} src={info.embed_url}  style={{width: 100 + 'px', height: 100 + 'px'}}></iframe>

            ))}
        </div>
    )
}