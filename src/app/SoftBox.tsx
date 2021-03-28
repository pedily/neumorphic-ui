import React, { CSSProperties, FC, HTMLProps } from "react";
import { colorLuminance } from "./neumorphism/utils";
import { useSoftContext, ISoftContext } from "./SoftProvider";

export type TSoftBoxElevation =
  | "flat"
  | "raised"
  | "raised-concave"
  | "raised-convex"
  | "lowered";

const radians = (degrees: number) => degrees * (Math.PI / 180);

const getRaisedStyles = ({
  color,
  elevationDepth,
  angle,
}: ISoftContext): CSSProperties => {
  const darkColor = colorLuminance(color, -0.15);
  const lightColor = colorLuminance(color, 0.15);

  const x = Math.sin(radians(-angle));
  const y = Math.cos(radians(-angle));

  const dx = x * elevationDepth;
  const dy = y * elevationDepth;

  const firstBoxShadow = `${dx}px ${dy}px ${elevationDepth * 2}px ${darkColor}`;
  const secondBoxShadow = `${-dx}px ${-dy}px ${
    elevationDepth * 2
  }px ${lightColor}`;
  const boxShadow = `${firstBoxShadow}, ${secondBoxShadow}`;

  const background = `linear-gradient(${angle}deg, ${color}, ${color})`;

  return {
    background,
    boxShadow,
  };
};

const getLoweredStyles = ({
  color,
  elevationDepth,
  angle,
}: ISoftContext): CSSProperties => {
  const darkColor = colorLuminance(color, -0.15);
  const lightColor = colorLuminance(color, 0.15);

  const x = Math.sin(radians(-angle));
  const y = Math.cos(radians(-angle));

  const dx = x * elevationDepth;
  const dy = y * elevationDepth;

  const firstBoxShadow = `${dx}px ${dy}px ${elevationDepth * 2}px ${darkColor}`;
  const secondBoxShadow = `${-dx}px ${-dy}px ${
    elevationDepth * 2
  }px ${lightColor}`;
  const boxShadow = `inset ${firstBoxShadow}, inset ${secondBoxShadow}`;

  const background = color;

  return {
    background,
    boxShadow,
  };
};

/**
 * concave => "pushed in" )]
 */
const getRaisedConcaveStyles = ({
  color,
  angle,
  elevationDepth,
}: ISoftContext): CSSProperties => {
  const firstGradientColor = colorLuminance(color, 0.07);
  const secondGradientColor = colorLuminance(color, -0.1);
  const background = `linear-gradient(${angle}deg, ${firstGradientColor}, ${secondGradientColor})`;

  const x = Math.sin(radians(-angle));
  const y = Math.cos(radians(-angle));

  const dx = x * elevationDepth;
  const dy = y * elevationDepth;

  const darkColor = colorLuminance(color, -0.15);
  const lightColor = colorLuminance(color, 0.15);
  const firstBoxShadow = `${dx}px ${dy}px ${elevationDepth * 2}px ${darkColor}`;
  const secondBoxShadow = `${-dx}px ${-dy}px ${
    elevationDepth * 2
  }px ${lightColor}`;
  const boxShadow = `${firstBoxShadow}, ${secondBoxShadow}`;

  return {
    background,
    boxShadow,
  };
};

/**
 * convex => "pushed out" (]
 */
const getRaisedConvexStyles = ({
  color,
  angle,
  elevationDepth,
}: ISoftContext): CSSProperties => {
  const firstGradientColor = colorLuminance(color, -0.1);
  const secondGradientColor = colorLuminance(color, 0.07);
  const background = `linear-gradient(${angle}deg, ${firstGradientColor}, ${secondGradientColor})`;

  const x = Math.sin(radians(-angle));
  const y = Math.cos(radians(-angle));

  const dx = x * elevationDepth;
  const dy = y * elevationDepth;

  const darkColor = colorLuminance(color, -0.15);
  const lightColor = colorLuminance(color, 0.15);
  const firstBoxShadow = `${dx}px ${dy}px ${elevationDepth * 2}px ${darkColor}`;
  const secondBoxShadow = `${-dx}px ${-dy}px ${
    elevationDepth * 2
  }px ${lightColor}`;
  const boxShadow = `${firstBoxShadow}, ${secondBoxShadow}`;

  return {
    background,
    boxShadow,
  };
};

const getSoftBoxStyles = (
  type: TSoftBoxElevation,
  context: ISoftContext
): CSSProperties => {
  switch (type) {
    case "raised":
      return getRaisedStyles(context);

    case "raised-concave":
      return getRaisedConcaveStyles(context);

    case "raised-convex":
      return getRaisedConvexStyles(context);

    case "lowered":
      return getLoweredStyles(context);

    default:
      return {};
  }
};

interface ISoftBoxProps extends HTMLProps<HTMLDivElement> {
  elevation?: TSoftBoxElevation;
}

const SoftBox: FC<ISoftBoxProps> = (props) => {
  const { elevation, style, ...divProps } = props;

  const softContext = useSoftContext();

  const styles = getSoftBoxStyles(elevation, softContext);

  return (
    <div
      {...divProps}
      style={{
        ...styles,
        padding: "1em",
        borderRadius: "1em",
        color: "hsla(0, 0%, 100%, .54)",
        ...style,
      }}
    >
      {props.children}
    </div>
  );
};

export default SoftBox;
