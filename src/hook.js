// useState
// useEffect
// useContext
// useRef
// useReducer
// useMemo
// useCallback
// useImperativeHandle
// useLayoutEffect
// useDebugValue

import { useEffect, useState, useContext, createContext, useRef } from "react";

/* useState
The purpose of this hook to handle reactive data, any data that changes in the application is called state, 
when any of the data changes, React re-renders the UI
 */
const UseState = () => {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>Click {count} times </button>
    );
}

/* useEffect
It allows us to implement all of the lifecycle hooks from within a single function API.
*/
const UseEffect = () => {
    const [state, setState] = useState(0);
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     alert('This will run when the component mounts and anytime the stateful data changes');
    // });

    useEffect(() => {
        alert('This will run, when the component is first initialized');
    }, []);

    useEffect(() => {
        alert('This will run only when count state changes');
    }, [count]);

    useEffect(() => {
        alert('This will run when the component is destroyed or before the component is removed from UI');
        return () => alert('Goodbye!')
    });

    return (
        <div>
            <button onClick={() => setState(state + 1)}>State change {state} times </button>
            <button onClick={() => setCount(count + 1)}>Click {count} times </button>
        </div>
    );
}

/* useContext
This hook allows us to work with React's Context API, which itself a mechanism to allow us 
to share data within it's component tree without passing through props. 
It basically removes prop-drilling
 */

const ans = {
    right: '✅',
    wrong: '❌'
}
const AnsContext = createContext(ans);

const UseContext = () => {
    return (
        <AnsContext.Provider value={ans.right}>
            <RightAns />
        </AnsContext.Provider>
    );
}

function RightAns() {
    const ans = useContext(AnsContext);
    return (
        <p>{ans}</p>
    );
}

/* useRef
This hook allows us to create a mutable object. It is used, when the value keeps changes like in 
the case of useState hook, but the difference is, it doesn't trigger a re-render when the value changes.
The common use case of this, is to grab HTML elements from the DOM.
 */

const UseRef = () => {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);

    function handlerStart() {
        setStartTime(Date.now())
        setNow(Date.now())

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now())
        }, 10);
    }

    function handlerStop() {
        clearInterval(intervalRef.current)
    }

    console.log("UseRef intervalRef: " + intervalRef.current);

    let timePassed = 0;
    if (startTime != null && now != null) {
        timePassed = (now - startTime) / 1000
    }

    return (
        <div>
            <h1>Time Passed {timePassed} </h1>
            <button onClick={handlerStart}>Start</button>
            <button onClick={handlerStop}>Stop</button>
        </div>
    );
}

const Hook = () => {
    return (
        // <UseState/>
        // <UseEffect />
        // <UseContext/>
        <UseRef />
    );
}

export default Hook