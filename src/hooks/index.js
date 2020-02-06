import { useState, useCallback } from 'react';
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

export const useSubscribeStorage = function () {
    let [state, setState] = useState(null);

    this.update = fromEvent(window, 'storage');

    this.update.subscribe(store => {
        let serialisedState = store.storageArea.getItem('persist:forecast');
        let ser = JSON.parse(serialisedState);
        console.log('updateStorage', ser);
        let last_message = JSON.parse(ser.last_message);

        setState(last_message);
    });

    return [state];
}