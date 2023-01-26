import React, { useCallback, useEffect, useState } from "react";
import s from "../styles/Home.module.css";
import Characters from "../components/Characters/Characters.js";
import Header from "../components/Header/Header.js";
import { fetchCharacters } from "./api/characters";
import 'react-loading-skeleton/dist/skeleton.css'
import Head from "next/head";

export default function Home() {
  const [characterData, setCharacterData] = useState([]);
  
  console.log("!", characterData);
  const getData = useCallback(
    async (data, offset) => {
      if (offset) {
        const result = await fetchCharacters("", offset);
        
        setCharacterData(currentcharacterData => [
          ...currentcharacterData,
          ...result
        ]);
        return;
      }

      if (data) {
        const result = await fetchCharacters(data);
        setCharacterData(result);
        return;
      }
      const result = await fetchCharacters();
      setCharacterData(result);
  }, [setCharacterData]);

  const loadMore = useCallback((offset) => {
    getData("", offset);
  }, [getData])
  useEffect(() => {
    getData();
  }, [getData]);

  const getCharacters = useCallback((data) => {
      getData(data);
  }, [getData]);

  return (
    <div className={s.main}>
      <Head>
        <title>Marvel Characters</title>
      </Head>
      <Header callback={getCharacters} />
      <Characters characterData={characterData} callback={loadMore} />
    </div>
  )
}

// TODOS
// infinitescroll pagination
// Style
// react-redux STORAGE

// STUDY
// DOM
// pagination
// CRUD

// Twitter with nodejs