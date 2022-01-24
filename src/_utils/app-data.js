const characterData = {
    name: "",
    gender: "",
    size: "",
    lineage: "",
    archetypes: "",
    heritage: "",
    speed: "",
    skills: [
        { name: "punch", proficency: "4" },
        { name: "kick", proficency: "2" },
    ],
    traits: [
        { name: "strength", active: true },
        { name: "constitution", active: false },
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
