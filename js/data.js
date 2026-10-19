'use strict';

const response = await fetch(new URL('../data/json/data.json', import.meta.url));
const data =  await response.json();


/*
const data = {
    attributes: [
        "Physical",
        "Fire",
        "Ice",
        "Electric",
        "Ether",
        "Wind",
        "Lumiflux",
    ],

    specialities: [
        "Attack",
        "Stun",
        "Anomaly",
        "Support",
        "Defense",
        "Rupture",
        "Armorer",
    ],

    factions: [
        "Cunning Hares",
        "Belobog Heavy Industries",
        "Sons of Calydon",
        "Mockingbord",
        "Spook Shack",
        "Angels of Delusion",
        "Phaethon",
        "Victoria Housekeeping Co.",
        "Obol Squad",
        "Criminal Investigation Special Response Team",
        "Hollow Special Operations Section 6",
        "Stars of Lyra",
        "Defense Force - Silver Squad",
        "Yunkui Summit",
        "Krampus Comliance Authority",
        "Metropolitan order Division",
        "Externals Strategy Department",
        "Airspace Patrol Department",
        "Flint Workshop",
    ],
}

*/

export default data;