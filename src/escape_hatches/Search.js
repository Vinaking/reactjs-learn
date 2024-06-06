import { useRef } from "react";
import SearchInput from "./SearchInput";

export const Search = () => {
    const inputRef = useRef(null);
    return (
        <div style={{display:'flex'}}>
            <button onClick={() => inputRef.current.focus() }>Search</button>
            <SearchInput ref={inputRef}/>
        </div>
    );
}