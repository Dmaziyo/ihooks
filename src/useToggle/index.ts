import {useEffect, useMemo, useState} from "react";

interface Actions<T> {
    toggle: () => void;
    set: (state: T) => void
    setLeft: () => void
    setRight: () => void
}

// 函数重载
function useToggle<T = boolean>(): [T, Actions<T>]
function useToggle<T>(defaultValue: T): [T, Actions<T>]
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]
function useToggle<T, U>(defaultValue = false as unknown as T, reverseValue?: U) {
    const [state, setState] = useState<T | U | boolean>(defaultValue);
    /** plan 1 **/
    // const setLeft = () => setState(defaultValue)
    // const setRight = () => setState(reverseValue||!defaultValue)
    // const toggle = () => {
    //     if (reverseValue) {
    //         setState(state === defaultValue ? reverseValue : defaultValue)
    //     } else {
    //         setState(state === defaultValue ? !defaultValue : defaultValue)
    //     }
    // }
    /** plan 2 **/
    const actions = useMemo(() => {
        const _reverseValue = (reverseValue ?? !defaultValue);
        const toggle = () => setState(s => s === defaultValue ? _reverseValue : defaultValue);
        const setLeft = () => setState(defaultValue);
        const setRight = () => setState(_reverseValue);
        const set = (value: T | U) => setState(value);
        return {
            toggle,
            setLeft,
            setRight,
            set
        }

    }, [])
    return [state, actions]
}

export default useToggle
