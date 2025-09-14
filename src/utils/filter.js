export const fetchBurgers = (burgers, args) => {
    if (!args.where) return burgers;
    return burgers.filter(burger => {
        for (let key in args.where) {
            if (burger[key] === undefined || burger[key] != args.where[key]) {
                return false;
            }
        }
        return true;
    });
}