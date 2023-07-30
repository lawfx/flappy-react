import React from "react";

export default function useElementWidth(fun: (width: number) => void, deps: any[]) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const width = ref.current?.offsetWidth;
    if (!width) return;
    fun(width);
  }, deps);

  return ref;
}