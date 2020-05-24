import Vector2D from './Vector2D';

const { scale } = require('../config.json');

export const vectorPixelsToWorld = (vector: Vector2D) => {
  vector.x /= scale;
  vector.y /= scale;

  return vector;
};

export const vectorWorldToPixels = (vector: Vector2D) => {
  vector.x *= scale;
  vector.y *= scale;

  return vector;
};
