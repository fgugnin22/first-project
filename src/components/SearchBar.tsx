import { useState } from "react";
import { HOME_PAGE_ACTIONS } from "../pages/HomePage";
import { dispatch } from "../Interfaces/index";
export function SearchBar({ dispatch }: dispatch) {
    const [search, setSearch] = useState("");

    return (
        <input
            type="text"
            className="input rounded-none focus:outline-none input-bordered w-screen overflow-hidden"
            placeholder="Напиткогугл"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                dispatch({
                    type: HOME_PAGE_ACTIONS.SET_INPUT_STRING,
                    payload: e.target.value,
                });
            }}
        />
    );
}
