"use client";

import useStore, { useActions } from "@/zustand/store";
import Icon from "./Icon";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const FloatingRight = ({ totalItems }: { totalItems: number }) => {
  const { buttonSelected } = useStore();
  const actions = useActions();
  const [hidden, setHidden] = useState(false);

  function test() {
    let referenceNo: number = buttonSelected;
    while (referenceNo % 3 !== 0) referenceNo--;
    if (referenceNo - 6 >= 0) {
      const next = document.getElementById(String(referenceNo - 6));
      next?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      actions.setSelectedGrid(-1);
      setHidden(false);
    } else if (referenceNo - 3 <= 0) {
      const next = document.getElementById(String(referenceNo - 3));
      next?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      actions.setSelectedGrid(-1);
      setHidden(false);
    }
    if (referenceNo - 3 < 0) {
      setHidden(true);
    }
  }
  return (
    <div
      className={`top-1/2 z-10 w-8 h-4  absolute 
        right-1 rotate-90
      ${hidden ? "invisible" : "visible"}
      `}
      onClick={test}
    >
      <Icon icon='Up2' className='invert' />
    </div>
  );
};

export const FloatingLeft = ({ totalItems }: { totalItems: number }) => {
  const { buttonSelected } = useStore();
  const actions = useActions();
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    console.log("layouteffect called");
    if (buttonSelected < totalItems) {
      setHidden(true);
    }
  }, []);
  function test() {
    let referenceNo: number = buttonSelected;
    while (referenceNo % 3 !== 0) referenceNo--;
    if (referenceNo + 6 <= totalItems) {
      const next = document.getElementById(String(referenceNo + 6));
      next?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      actions.setSelectedGrid(-1);
      setHidden(false);
    } else if (referenceNo + 3 <= totalItems) {
      const next = document.getElementById(String(referenceNo + 3));
      next?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      actions.setSelectedGrid(-1);
      setHidden(false);
    }
  }
  return (
    <div
      className={`top-1/2 z-10 w-8 h-4  absolute left -1 -rotate-90 ${
        !hidden ? "visible" : "invisible"
      }
      `}
      onClick={test}
    >
      <Icon
        icon='Up2'
        className={`invert

        ${hidden ? "invisible" : "visible"}
      `}
      />
    </div>
  );
};
