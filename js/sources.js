'use strict';

import { characters, bangboos, wEngines, skins, mc} from "./data.js";

const specialSources = {
    'Void Hunter': characters.filter(c => c.voidHunter === true),
    'Bangboo': bangboos,
    'W-Engine': wEngines,
    'Main Character': mc,
    'Skins': skins,

}


export default specialSources;