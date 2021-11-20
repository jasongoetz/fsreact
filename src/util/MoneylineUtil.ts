
const getVigFactor = (moneyline: number) => {
    return (moneyline > 0) ? (moneyline+100)/100 : (moneyline < 0) ? (-moneyline+100)/-moneyline : 1;
}

export const getParlayWinnings = (parlayAmount: number, parlayBetMoneylines: number[]) => {
    let totalAmount = parlayAmount;
    for (let i=0; i<parlayBetMoneylines.length; i++) {
        totalAmount *= getVigFactor(parlayBetMoneylines[i]);
    }
    return totalAmount.toFixed(2);
}

export const getBetWinnings = (betAmount: number, moneyline: number) => {
    const vigFactor = getVigFactor(moneyline);
    return (betAmount * (vigFactor)).toFixed(2);
}

