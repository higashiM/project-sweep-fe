import React, { useState } from "react";

const showAisle = (aisleNum, height) => {
  let x = 40;
  if (aisleNum > 9) x = 35;

  return (
    <>
      <text x={x} y={`${height / 2}`}>
        {`${aisleNum}`}
      </text>
    </>
  );
};

const drawWayPoint = (cy) => {
  return <circle cx="45" cy={cy / 2 - 5} r="10" fill="red" />;
};

const verticalPathSection = (id, height, y) => {
  return (
    <rect
      style={{ fill: "#ff2a2a" }}
      id={id}
      width="8"
      height={height}
      x="41"
      y={y}
      ry="0"
    />
  );
};

const horizontalPathSection = (id, width, x, y) => {
  return (
    <rect
      style={{ fill: "#ff2a2a" }}
      id={id}
      width={width}
      height="8"
      x={x}
      y={y}
      ry="0"
    />
  );
};

const endPoint = (id, cy) => {
  return <circle id={id} cx="45" cy={cy} r="10" fill="red" />;
};
const endPointBot = endPoint("endPointBot", 149);
const endPointTop = endPoint("endPointBot", 9);
const fullVertical = verticalPathSection("fullVertical", 160, 0);
const topFullTraverse = horizontalPathSection("topFullTraverse", 80, 0, 8);
const botFullTraverse = horizontalPathSection("botFullTraverse", 80, 0, 152);
const topLTraverse = horizontalPathSection("topLTraverse ", 49, 0, 8);
const topRTraverse = horizontalPathSection("topRTraverse", 44, 41, 8);
const topExit = verticalPathSection("topExit", 16, 0);
const botExit = verticalPathSection("botExit ", 8, 156);
const botRTraverse = horizontalPathSection("botRTraverse", 49, 41, 152);
const botLTraverse = horizontalPathSection("botLTraverse", 49, 0, 152);
const shortVerticalBoth = verticalPathSection("shortVerticalBoth ", 146, 8);
const shortVerticalTop = verticalPathSection("shortVerticalTop", 146, 14);
const shortVerticalBot = verticalPathSection("shortVerticalBot", 154, 0);

const paths = {
  fullvertical: <> {fullVertical}</>,
  TopMtoBotMEnd: (
    <>
      {" "}
      {fullVertical} {endPointBot}
    </>
  ),
  BotMtoTopMEnd: (
    <>
      {" "}
      {fullVertical} {endPointTop}
    </>
  ),

  TopLtoTopR: <>{topFullTraverse}</>,
  TopRtoTopL: <>{topFullTraverse}</>,
  TopLtoTopM: (
    <>
      {topLTraverse} {topExit}
    </>
  ),
  TopLtoBotR: (
    <>
      {topLTraverse} {shortVerticalBoth} {botRTraverse}
    </>
  ),
  TopLtoBotM: (
    <>
      {topLTraverse} {shortVerticalTop}
    </>
  ),
  TopLtoBotL: (
    <>
      {topLTraverse} {shortVerticalBoth} {botLTraverse}
    </>
  ),
  TopMtoTopR: (
    <>
      {topExit} {topRTraverse}
    </>
  ),
  TopMtoTopL: (
    <>
      {topExit} {topLTraverse}
    </>
  ),
  TopMtoBotM: <>{fullVertical}</>,

  BotMtoTopM: <>{fullVertical}</>,
  BotMtoTopR: (
    <>
      {topRTraverse} {shortVerticalTop}
    </>
  ),
  TopMtoBotL: (
    <>
      {shortVerticalBot} {botLTraverse}
    </>
  ),
  TopMtoBotR: (
    <>
      {shortVerticalBot} {botRTraverse}
    </>
  ),
  TopRtoBotL: (
    <>
      {topRTraverse} {shortVerticalBoth} {botLTraverse}
    </>
  ),
  TopRtoBotM: (
    <>
      {topRTraverse} {shortVerticalTop}
    </>
  ),
  BotLtoTopM: (
    <>
      {shortVerticalBot} {botLTraverse}
    </>
  ),
  BotLtoTopMEnd: (
    <>
      {shortVerticalBot} {botLTraverse}
      {endPointTop}
    </>
  ),
  TopRtoBotR: (
    <>
      {topRTraverse} {botRTraverse}
      {shortVerticalBoth}
    </>
  ),
  BotLtoBotR: <>{botFullTraverse}</>,
  BotLtoBotM: (
    <>
      {botLTraverse} {botExit}
    </>
  ),
  BotMtoBotR: (
    <>
      {botRTraverse} {botExit}
    </>
  ),
};
export { paths, showAisle, drawWayPoint };
