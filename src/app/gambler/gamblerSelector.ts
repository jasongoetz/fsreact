export const getGambler = state => state.gambler;
export const getGamblerWithAccount = state => state.league.gamblers.find(g => g.id === state.gambler.id);