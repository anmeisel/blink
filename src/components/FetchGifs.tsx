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


// import  = require('currentsapi');
const gf = new GiphyFetch('bvWogBDRALOdICcvDhJPS5XVxe50qs7O')

  type dataType = {
    userId: number;
    id: number;
    title: string;
    body: string;
    onDelete: (id: number) => void;
 }
 
 function GridDemo({ onGifClick }) {
    const fetchGifs = (offset: number) =>
      gf.trending({ offset, limit: 10 });
    const [width, setWidth] = useState(window.innerWidth);
    return (
      <>
        <Grid
          onGifClick={onGifClick}
          fetchGifs={fetchGifs}
          width={width}
          columns={5}
          gutter={6}
        />
        <ResizeObserver
            onResize={({ width }) => {
                setWidth(width);
            }}
        />
      </>
    );
  }
 const FetchGifs = () => {
    const [modalGif, setModalGif] = useState();
    return (
        <>
          <GridDemo
            onGifClick={(gif: SetStateAction<undefined>, e: { preventDefault: () => void; }) => {
                console.log("gif", gif);
                e.preventDefault();
                setModalGif(gif);
              }}
          />
          {modalGif && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0, 0, 0, .8)"
              }}
              onClick={(e) => {
                e.preventDefault();
                setModalGif(undefined);
              }}
            >
              <Gif gif={modalGif} width={200} />
            </div>
          )}
        </>
      );
 }

export default FetchGifs

