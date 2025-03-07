export const validateCreditCard = (numeroTarjeta, fechaVencimiento, cvv) => {
    const luhnCheck = (num) => {
        let arr = (num + '')
            .split('')
            .reverse()
            .map(x => parseInt(x));
        let lastDigit = arr.splice(0, 1)[0];
        let sum = arr.reduce(
            (acc, val, i) =>
                i % 2 !== 0
                    ? acc + val
                    : acc + ((val * 2) % 9) || 9,
            0
        );
        sum += lastDigit;
        return sum % 10 === 0;
    };

    const isValidDate = (date) => {
        const [month, year] = date.split('/');
        const now = new Date();
        const expDate = new Date(`20${year}`, month);
        return expDate > now;
    };

    const isValidCVV = (cvv) => /^[0-9]{3,4}$/.test(cvv);

    return luhnCheck(numeroTarjeta) && isValidDate(fechaVencimiento) && isValidCVV(cvv);
};