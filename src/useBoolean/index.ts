import { useMemo } from 'react';
import useToggle from '../useToggle';

export interface Actions {
    setTrue: () => void;
    setFalse: () => void;
    set: (value: boolean) => void;
    toggle: () => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions] {

}
