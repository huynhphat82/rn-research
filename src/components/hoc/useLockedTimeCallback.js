import {useRef} from 'react';

const useLockedTimeCallback = (callback, delay = 500) => {
  const lockedRef = useRef(false);
  const timeoutRef = useRef(false);
  return (...args) => {
    if (!lockedRef.current) {
      callback(...args);
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => (lockedRef.current = false), delay);
    lockedRef.current = true;
  };
};

export default useLockedTimeCallback;
