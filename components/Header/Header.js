import s from "./Header.module.scss";
import SearchBox from "../SearchBox/SearchBox";
import PropTypes from "prop-types";

function Header({callback}) {
    

    return(
        <div className={s.root}>
            <div className={s.title}>
                Marvel Characters
            </div>
            <SearchBox callback={callback} />
        </div>
    )
}

Header.propTypes = {
    menu: PropTypes.array,
}

Header.defaultProps = {
    menu: ["Characters", "Stories", "Series"],
}

export default Header;