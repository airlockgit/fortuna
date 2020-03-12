import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fromEvent } from 'rxjs';

export const useClientRect = () => {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node) {
            setRect(node.getBoundingClientRect());
        }
    }, []);

    return [rect, ref];
}

const updateStorage = fromEvent(window, 'storage');

export function useSubscribeStorage(key) {
    const defaultState = useSelector(
        state => state[key],
    );

    let [newState, setState] = useState(defaultState);

    useEffect(() => {
        const subscribe = updateStorage.subscribe(store => {
            let state = store.storageArea.getItem('persist:' + key);
            let serialisedState = JSON.parse(state);
            let newState = {};

            for (let property in serialisedState) {
                newState[property] = JSON.parse(serialisedState[property]);
            }

            setState(newState);
        });

        return () => subscribe.unsubscribe();
    });

    return newState;
}