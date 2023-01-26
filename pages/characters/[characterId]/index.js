import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchCharacter } from "../../api/characters";
import s from "./characterPage.module.scss";
import closeImg from "./close-48.svg";

// useEffect, useState, useMemo, useCallBack (react hooks)

export default function CharacterDetail() {
  const router = useRouter();
  const [characterData, setCharacterData] = useState([]);
  const { characterId } = router.query;

  const returnHome = () => {
    router.push("/");
  }
  useEffect(() => {
    async function getData() {
      const data = await fetchCharacter(characterId);
      if (data !== undefined) {
        setCharacterData(data);
      }
    }
    getData();
  }, [fetchCharacter, characterId]);

  console.log(characterData);

  const imageUrl = characterData[0]?.thumbnail.path.replace("http", "https");

  return (
    <div className={s.root}>
      <div className={s.container}>
        <img src={closeImg.src} className={s.return} onClick={returnHome} ></img>
        <div className={s.main}>
          <div className={s.characterBox}>
            <div className={s.title}>
              {characterData[0]?.name}
            </div>
            <div className={s.overflowHidden}>
              <img className={s.img} src={imageUrl + "/portrait_xlarge." + characterData[0]?.thumbnail.extension} />
            </div>
            <div className={s.paragraph}>
              {characterData[0]?.description == "" ? `${characterData[0]?.name} does not have a description...` : characterData[0]?.description}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

// inherit color from dominant color of the character's image

/*
<div className={s.links}>
  <button className={s.button} onClick={() => router.push(`/characters/${characterId}/comics`)}>Comics</button>
  <button className={s.button} onClick={() => router.push(`/characters/${characterId}/series`)}>Series</button>
  <button className={s.button} onClick={() => router.push(`/characters/${characterId}/stories`)}>Stories</button>
</div>
*/