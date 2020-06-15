import {useEffect, useRef} from 'react';

/**
 * @description saves last reference of given value
 * @param {any} value to save
 */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
