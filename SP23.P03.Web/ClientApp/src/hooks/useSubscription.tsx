import { useEffect } from "react";
import mitt from "mitt";

const emitter = mitt();

const useSubscription = (name: string, cb: () => any) => {
    useEffect(() => {
        emitter.on(name, cb)
        return () => emitter.off(name, cb);
    })
}

export default useSubscription;

export const notify = (name: string) => emitter.emit(name);