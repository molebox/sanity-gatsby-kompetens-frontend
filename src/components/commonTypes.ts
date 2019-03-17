import Skills from "./skills/Skills";

interface Skills {
    skillName: string;
}
interface Roles {
    role: string;
}

export type RoleSkill = Roles | Skills;
