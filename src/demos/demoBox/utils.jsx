export const generateRandomPrice = () => (Math.random() * 9 + 1).toFixed(5)

export const formatQty = (qty) => `${qty / 1000000}M`
