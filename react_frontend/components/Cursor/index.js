import React, { useEffect, useState } from "react";
import CursorFollow from "react-cursor-follow";
import { useTheme } from "next-themes";

const Cursor = () => {
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  const getCusomColor = () => {
    if (theme.theme === "dark") {
      return "#fff";
    } else if (theme.theme === "light") {
      return "#000";
    }
    return "#000";
  };

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && (
        <CursorFollow
          color={getCusomColor()}
          size={30}
          opacity={0.7}
          borderColor={getCusomColor()}
          borderWidth={2}
          scale={1.2}
          zIndex={9999}
          style={{ mixBlendMode: theme.theme === "dark" ? "difference" : "normal" }}
          duration={0}
        />
      )}
    </>
  );
};

export default Cursor;
