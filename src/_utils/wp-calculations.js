/* eslint-disable eqeqeq */
const level = exp => {
    if (exp > 300) return 1;
    if (exp > 900) return 2;
    if (exp > 2700) return 3;
    if (exp > 6500) return 4;
    if (exp > 14000) return 5;
    if (exp > 23000) return 6;
    if (exp > 34000) return 7;
    if (exp > 48000) return 8;
    if (exp > 64000) return 9;
    if (exp > 85000) return 10;
    if (exp > 100000) return 11;
    if (exp > 120000) return 12;
    if (exp > 140000) return 13;
    if (exp > 1650000) return 14;
    if (exp > 1950000) return 15;
    if (exp > 2250000) return 16;
    if (exp > 2650000) return 17;
    if (exp > 3050000) return 18;
    if (exp > 3550000) return 19;
    return 20;
};

const bonus = level => {
    if (level >= 1 && level <= 4) return 2;
    if (level >= 5 && level <= 8) return 3;
    if (level >= 9 && level <= 12) return 4;
    if (level >= 13 && level <= 16) return 5;
    if (level >= 17 && level <= 20) return 6;
};

const modifier = value => {
    if (value == 1) return -5;
    if (value >= 2 && value <= 3) return -4;
    if (value >= 4 && value <= 5) return -3;
    if (value >= 6 && value <= 7) return -2;
    if (value >= 8 && value <= 9) return -1;
    if (value >= 10 && value <= 11) return 0;
    if (value >= 12 && value <= 13) return 1;
    if (value >= 14 && value <= 15) return 2;
    if (value >= 16 && value <= 17) return 3;
    if (value >= 18 && value <= 19) return 4;
    if (value >= 20 && value <= 21) return 5;
    if (value >= 22 && value <= 23) return 6;
    if (value >= 24 && value <= 25) return 7;
    if (value >= 26 && value <= 27) return 8;
    if (value >= 28 && value <= 27) return 9;
    if (value == 30) return 10;
};

const getRoll = (adv, dis, dice) => {
    return adv && dis
        ? dice.norm
        : adv
        ? [dice.adv, " + ", dice.norm]
        : dis
        ? [dice.norm, " + ", dice.dis]
        : dice.norm;
};

const getModifier = (exp, pro, mod, bonus) => {
    return exp && pro
        ? " + " + (mod + bonus * 2)
        : pro
        ? " + " + (mod + bonus)
        : " + " + mod;
};

const calculate = {};
calculate.level = level;
calculate.bonus = bonus;
calculate.modifier = modifier;
calculate.getRoll = getRoll;
calculate.getModifier = getModifier;

export default calculate;
