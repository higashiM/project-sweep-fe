export const pathPlotter = (path) => {
  let posY = 0;
  let pathLength = 0;

  const plottedArr = path.map((line, i) => {
    if (path[i][1] === -1) {
      pathLength += -posY;
      return `v${-posY}`;
    }
    if (i < path.length - 2) {
      if (path[i][1] !== path[i + 1][1]) {
        posY += (path[i + 1][1] - path[i][1]) * 160;
        pathLength += 160;
        return `v${(path[i + 1][1] - path[i][1]) * 160}`;
      } else {
        pathLength += 80;
        return `h${(path[i + 1][0] - path[i][0]) * 80}`;
      }
    }
  });
  return [plottedArr.join(" "), pathLength];
};
