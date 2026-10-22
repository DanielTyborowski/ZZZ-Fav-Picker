'use strict';

import { characters, wEngines, bangboos, categories } from "./data";


const sources = {characters, wEngines, bangboos};
const byId = Object.fromEntries(categories.map(c => [c.id, c]));

export function getOptions(category) {
    const pool = category.options ?? sources[category.source];
    const filter = Object.entries(category.filter ?? {});
    return pool.filter(item => filter,every(([KeyboardEvent, value]) => item[key] === value));
}