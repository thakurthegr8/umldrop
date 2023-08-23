import React, { useEffect, useState } from 'react'

const useLocalStorage = (props) => {
    const [value, setValue] = useState(props.fallback);
    useEffect(() => {
        if (props.key) {
            setValue(localStorage.getItem(props.key))
        }
    }, [])
    const setItem = (key, value) => {
        localStorage.setItem(key, value);
        setValue(value);
    }
    return { value, setItem };

}

export default useLocalStorage;