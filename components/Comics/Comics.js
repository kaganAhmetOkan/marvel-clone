import style from "./Comics.module.scss";
import ComicBox from "../ComicBox/ComicBox";


export default function Comics({comics}) {

    return (
        <div className={style.main}>{
            comics?.map((object) => {
                return <ComicBox key={object.id} comic={object} />
            })
        }</div>
    )
}