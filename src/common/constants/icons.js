const ICONS_PATH = `${process.env.PUBLIC_URL}/icons`;

export const ICONS = {
  Pause: `${ICONS_PATH}/pause.png`,
  Colonisers: {
    Banner: `${ICONS_PATH}/colonisers/colonisers-banner.jpg`,
    MenuBackground: `${ICONS_PATH}/colonisers/colonisers-menu-bg.jpg`,
    GameBackground: `${ICONS_PATH}/colonisers/colonisers-game-bg.jpg`,
  },
};

const TutorialPath = `${process.env.PUBLIC_URL}/tutorials`;
export const Images = {
  Tutorials: {
    Sandbox: {
      SelectAlphabet: {
        1: `${TutorialPath}/sandbox/select-alphabet/1.png`,
        2: `${TutorialPath}/sandbox/select-alphabet/2.png`,
        3: `${TutorialPath}/sandbox/select-alphabet/3.png`,
      },
      States: {
        1: `${TutorialPath}/sandbox/states/1.png`,
        2: `${TutorialPath}/sandbox/states/2.png`,
        3: `${TutorialPath}/sandbox/states/3.png`,
        4: `${TutorialPath}/sandbox/states/4.png`,
        5: `${TutorialPath}/sandbox/states/5.png`,
      }
    }
  }
};