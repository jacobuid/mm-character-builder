const characterData = {
    name: "",
    gender: "",
    size: "",
    lineage: "",
    archetypes: "",
    heritage: "",
    speed: "",
    actions: [
        { id: 1234, name: "Punch", proficiency: 4, specific: true, max:'12' },
        { id: 1244, name: "Kick", proficiency: 2, specific: false, max:'10' },
    ],
    traits: [
        { id: 6234, name: "Punch", damage:'1d8', active: true },
        { id: 3234, name: "Kick", damage:'4', active: false },
    ],
    movement: "",
    stamina: "",
    ethos: "",
    reputation: "",
    experience: 0,
    level: 1,
    inspiration: false,
};

export { characterData };
