
export const getShortAddress = (length: number = 6, address: string) => {
    const maxLength = address.length;
    const minLength = 6;

    let actualLength = length - minLength < 0 ? minLength : length;

    if (actualLength < maxLength) {
        return `${address.substring(0, actualLength)}...${address.substring(
            maxLength - 4,
            maxLength,
        )}`;
    } else {
        return address;
    }
};

export const jsNumberForAddress = (address: string = '') => {
    const addr = address.slice(2, 10);
    const seed = parseInt(addr, 16);
    return seed;
};

export const hashInput = (s: string) => {
    return s.split("").reduce(function(a: any,b: any){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}
