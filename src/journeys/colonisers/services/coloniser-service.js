import {
  ASTEROIDS,
  COLONISERS,
  HABITATS,
  MOTHER_SHIPS,
} from '../../../common/constants/sprites';
import { AutomatonFactory } from '../../../common/models/AutomatonFactory';

export class ColoniserService {
  static generateHabitat(asteroids = 2, alphabet = [0, 1], planets = 1) {
    const entityCount = asteroids + planets;
    const automaton = AutomatonFactory.generateDFA(
      entityCount,
      alphabet,
      planets,
    );

    const dfa = automaton.parse();

    return {
      automaton,
      nodes: dfa.nodes.map((node) => {
        // If there is no planet then it means the ship must return to the mothership at the end of its mission
        const image = new Image();

        if (node.isStarting) {
          const mothership =
            MOTHER_SHIPS[Math.floor(Math.random() * MOTHER_SHIPS.length)];
          image.src = mothership;

          return {
            ...node,
            icon: image, // TODO: Make this random at some point
          };
        }
        // If there is a planet then it means the ship must land on it at the end of its mission

        if (node.isAccepting) {
          const habitat = HABITATS[Math.floor(Math.random() * HABITATS.length)];
          image.src = habitat;

          return {
            ...node,
            icon: image,
          };
        }

        // The rest of the entities will be asteroids and must never be landed on
        const asteroid =
          ASTEROIDS[Math.floor(Math.random() * ASTEROIDS.length)];
        image.src = asteroid;
        image.alt = asteroid.split('.png')[0];

        return {
          ...node,
          icon: image,
        };
      }),
      links: dfa.transitions.map((transition) => {
        if (transition.source === transition.target) {
          return {
            ...transition,
            rotation: (Math.PI * 7) / 6,
          };
        }
        return transition;
      }),
    };
  }

  static generateColonisers(habitat, length = 4, count = 1) {
    const colonisers = habitat.generateRandomAcceptedInputs(length, count);
    return colonisers.map((coloniser) => {
      let id = coloniser.join('');

      if (id === '') {
        id = 'e';
      }

      return {
        id,
        x: 0,
        y: 0,
        sprite: COLONISERS[Math.floor(Math.random() * COLONISERS.length)],
      };
    });
  }

  static validateJourney(habitat, coloniser) {
    return habitat.automaton.isInputAccepted(coloniser.id);
  }
}
