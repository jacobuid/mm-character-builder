const characterData = {
    name: "",
    gender: "",
    size: "",
    lineage: "",
    archetypes: "",
    heritage: "",
    speed: "",
    skills: [
        { id: 1234, name: "punch", proficency: "4", specific: true },
        { id: 1244, name: "kick", proficency: "2", specific: false },
    ],
    traits: [
        { id: 6234, name: "strength", active: true },
        { id: 3234, name: "constitution", active: false },
    ],
    movement: "",
    stamina: "",
    ethos: "",
    reputation: "",
    experience: "",
    level: "",
    inspiration: "",
};

const skillData = [
    { name: "punch", proficency: "4" },
    { name: "kick", proficency: "2" },
];

const traitData = [
    { name: "strength", active: true },
    { name: "constitution", active: false },
];

export { characterData, skillData, traitData };
