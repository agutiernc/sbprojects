export const choice = (items) => items[Math.floor(Math.random() * items.length)];

export const remove = (items, item) => items.filter(i => i !== item)

