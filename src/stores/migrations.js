export const migrations = {
  /* version 0 */
  0: (state) => {
    return {
      ...(state = typeof state === 'string' ? JSON.parse(state) : state),
      lastRead: {},
    };
  },
  /* version 1 */
  1: (state) => {
    return {
      ...(state = typeof state === 'string' ? JSON.parse(state) : state),
      lastRead1: {},
    };
  },
};
