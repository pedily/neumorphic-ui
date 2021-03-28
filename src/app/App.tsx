import React, { FC, useEffect, useState } from "react";
import SoftBox from "./SoftBox";
import styled from "@emotion/styled";

import "normalize.css";
import { ISoftContext, SoftProvider, useSoftContext } from "./SoftProvider";

const Provider: FC = (props) => {
  const [angle, setAngle] = useState(250);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((angle) => (angle + 1) % 360);
    }, 33);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const value: ISoftContext = {
    angle,
    color: "#e8d1bf",
    dentDepth: 10,
    elevationDepth: 20,
  };

  return <SoftProvider {...props} value={value} />;
};

const WrapperBase = styled.div({
  width: "100vw",
  height: "100vh",

  fontFamily: "sans-serif",
  fontSize: "200%",

  backgroundColor: "#fab",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&>*": {
    margin: "1em",
  },
});

const Wrapper: FC = (props) => {
  const { color } = useSoftContext();
  return (
    <WrapperBase style={{ backgroundColor: color }}>
      {props.children}
    </WrapperBase>
  );
};

const App: FC = () => {
  return (
    <Provider>
      <Wrapper>
        <SoftBox elevation="raised">raised</SoftBox>
        <SoftBox elevation="raised-concave">concave</SoftBox>
        <SoftBox elevation="raised-convex">convex</SoftBox>
        <SoftBox elevation="lowered">lowered</SoftBox>
      </Wrapper>
    </Provider>
  );
};

export default App;
