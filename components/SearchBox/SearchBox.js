import React, { useCallback, useState } from "react";
import s from "./SearchBox.module.scss";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import searchImg from "@/public/search.png";

function SearchBox({callback}) {

    // useState to store search word
    const [state, setState] = useState({
        search: ""
    });

    // search characters when user stops typing
    const search = useCallback(debounce((value) => {
        callback(value);
        console.log("Searching for", value);
    }, 500), []);
    
    // search characters onSubmit
    function handleSubmit(e) {
        e.preventDefault();
        if (state.search !== "") {
            callback(state.search);
        }
        return handleSubmit;
    }

    // write value into state onChange
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        search(e.target.value);
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit} >
                <input className={s.search} name="search" onChange={handleChange} type={"text"} placeholder="Search a character..." />
                <div className={s.submit}>
                    <img alt={"search"} src={searchImg.src} style={{height: "20px", width: "20px"}} />
                </div>
            </form>
        </div>
    )
}

SearchBox.propTypes = {
    callback: PropTypes.func,
}

SearchBox.defaultProps = {
    callback: () => {}
}


export default SearchBox;
