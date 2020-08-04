export const migrations = {
  /* version 0 */
  0: (state) => {
    return {
      ...state,
      lastRead: {},
    };
  },
  /* version 1 */
  1: (state) => {
    console.log('state   ===>   ', state)
    return {
      ...state,
      lastRead1: {},
    };
  },
};
