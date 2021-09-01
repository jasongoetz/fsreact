
const getVigFactor = (moneyline: number) => {
    return (moneyline > 0) ? (moneyline+100)/100 : (moneyline < 0) ? (-moneyline+100)/-moneyline : 1;
}

export const getParlayWinnings = (parlayAmount: number, moneyline: number, numWinningBets: number) => {
    const vigFactor = getVigFactor(moneyline);
    return (parlayAmount * Math.pow(vigFactor, numWinningBets)).toFixed(2);
}

export const getBetWinnings = (betAmount: number, moneyline: number) => {
    const vigFactor = getVigFactor(moneyline);
    return (betAmount * (vigFactor)).toFixed(2);
}

