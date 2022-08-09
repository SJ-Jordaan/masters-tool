const SPRITE_PATH = `${process.env.PUBLIC_URL}/sprites`;
const ASTEROID_PATH = `${SPRITE_PATH}/asteroids`;
const HABITATS_PATH = `${SPRITE_PATH}/habitats`;
const COLONISERS_PATH = `${SPRITE_PATH}/colonisers`;
// the path to each asteroid in assets/sprites
export const ASTEROIDS = [
  `${ASTEROID_PATH}/asteroid1.png`,
  `${ASTEROID_PATH}/asteroid2.png`,
  `${ASTEROID_PATH}/asteroid3.png`,
  `${ASTEROID_PATH}/asteroid4.png`,
  `${ASTEROID_PATH}/asteroid5.png`,
  `${ASTEROID_PATH}/asteroid6.png`,
  `${ASTEROID_PATH}/asteroid7.png`,
];

export const HABITATS = [
  `${HABITATS_PATH}/planet2.png`,
  `${HABITATS_PATH}/planet7.png`,
  `${HABITATS_PATH}/planet8.png`,
  `${HABITATS_PATH}/planet9.png`,
];
export const COLONISERS = [`${COLONISERS_PATH}/ship.png`];
export const MOTHER_SHIPS = [`${COLONISERS_PATH}/mother-ship.png`];
