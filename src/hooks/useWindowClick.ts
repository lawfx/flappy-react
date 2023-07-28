import React from "react";

export default function useWindowClick(fun: () => void, deps: any[]) {
  React.useEffect(() => {
    function handleClick() {
      fun();
    }

    window.addEventListener('pointerdown', handleClick);

    return () => window.removeEventListener('pointerdown', handleClick);
  }, deps);
}