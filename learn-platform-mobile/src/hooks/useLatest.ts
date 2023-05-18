import { useEffect, useRef } from "react";

/**
 * 获取最新value
 */
const useLatest = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
