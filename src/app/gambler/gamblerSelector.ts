export const getGambler = state => state.gambler;
export const getGamblerWithAccount = (state, gamblerId) => state.league.gamblers.find(g => g.id == gamblerId);