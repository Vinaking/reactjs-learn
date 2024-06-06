import { useState } from "react";
import { useImmer } from "use-immer";

const StateVocj = () => {
    return (
        // <ObjectState />
        <ArrayState />
    );
}

const QueueState = () => {
    const [pending, setPending] = useState(0);
    const [complete, setComplete] = useState(0);

    async function handleClick() {
        setPending(pending + 1);
        await delay(3000);
        setPending(pending => pending - 1);
        setComplete(complete => complete + 1);
    }

    return (
        <>
            <h1>Pending: {pending} </h1>
            <h1>Completed: {complete} </h1>
            <button onClick={handleClick}>Buy</button>
        </>

    );
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/* 
 Object State
 */
const ObjectState = () => {
    const [person, updatePerson] = useImmer({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg'
        }
    });

    function handleChangeName(e) {
        updatePerson(draft => {
            draft.name = e.target.value;
        });
    }

    function handleChangeTitle(e) {
        updatePerson(draft => {
            draft.artwork.title = e.target.value;
        });
    }

    function handleChangeCity(e) {
        updatePerson(draft => {
            draft.artwork.city = e.target.value;
        });
    }

    function handleChangeImage(e) {
        updatePerson(draft => {
            draft.artwork.image = e.target.value;
        });
    }

    return (
        <>
            <label style={{ display: 'flex' }}>
                Name:
                <input
                    value={person.name}
                    onChange={handleChangeName}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleChangeTitle}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleChangeCity}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleChangeImage}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <image
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    );
}

let nextId = 3;
const initialList = [
    { id: 0, title: 'Big Bellies', seen: false },
    { id: 1, title: 'Lunar Landscape', seen: false },
    { id: 2, title: 'Terracotta Army', seen: true },
];

const ArrayState = () => {
    // const [myList, setMyList] = useState(initialList);
    // const [yourList, setYourList] = useState(initialList);

    // function handleMyListChange(id, value) {
    //     setMyList(myList.map(item => {
    //         if (item.id === id) {
    //             return {...item, seen: value}
    //         } 
    //         return item
    //     }));
    // }

    // function handleYourListChange(id, value) {
    //     setYourList(yourList.map(item => {
    //         if (item.id === id) {
    //             return {...item, seen: value}
    //         }
    //         return item
    //     }));
    // }

    const [myList, updateMyList] = useImmer(initialList);
    const [yourList, updateYourList] = useImmer(initialList);

    function handleMyListChange(id, value) {
        updateMyList(draft => {
            const item = draft.find(item => item.id === id);
            item.seen = value
        })
    }

    function handleYourListChange(id, value) {
        updateYourList(draft => {
            const item = draft.find(item => item.id === id);
            item.seen = value
        })
    }

    return (
        <div>
            <h2>My list</h2>
            <ItemList
                list={myList}
                onChange={handleMyListChange}
            />
            <h2>Your list</h2>
            <ItemList
                list={yourList}
                onChange={handleYourListChange}
            />
        </div>
    );

}

function ItemList({ list, onChange }) {
    return (
        <ul>
            {list.map(item => (
                <li key={item.id}>
                    <label>
                        <input type="checkbox"
                            checked={item.seen}
                            onChange={e => {
                                onChange(
                                    item.id,
                                    e.target.checked
                                )
                            }}
                        />
                        {item.title}
                    </label>
                </li>
            ))
            }
        </ul>
    );
}

export default StateVocj;