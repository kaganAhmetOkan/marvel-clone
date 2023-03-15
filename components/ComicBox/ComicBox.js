/* eslint-disable @next/next/no-img-element */
import style from "./ComicBox.module.scss";


export default function ComicBox({comic}) {

    return (
        <div className={style.main} title={comic?.description} onClick={() => window.open(comic?.urls[0].url, "_blank")}>
            <div className={style.title}>
                {comic.title}
            </div>
            <div className={style.imageContainer}>
                <img
                    className={style.image}
                    alt={comic.title}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    width={"200px"}
                />
            </div>
                
        </div>
    )
}