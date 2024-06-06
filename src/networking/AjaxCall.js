import { useEffect, useState } from "react";

export const AjaxCall = () => {
    const [ids, setIds] = useState([1,2,3]);
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                setIds(result);
            },
            (error) => {
                alert('Error: ' + error);
            }
        )
    }, []);
    return(
        <ul>
            {ids.map(id => (
                <li key={id}>{id}</li>
            ))}
        </ul>
    );
}