export interface Stats {
    intelligence: number;
    charisma: number;
    beauty: number;
    luck: number;
}

export interface Skills {
    gaming: number;
    music: number;
    trading: number;
    video: number;
}

export interface Variables {
    hunger: number;
    sleep: number;
    sanity: number;
    money: number;
}

export interface Player {
    name: string;
    gender: string;
    stats: Stats;
    skills: Skills;
    variables: Variables;
}