import { forwardRef } from "react";

export default forwardRef (
    function SearchInput(props, ref) {
        return(
            <input type="text" ref={ref}></input>
        );
    }
)
