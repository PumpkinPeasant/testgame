import { generateTriangularValue, getRandomNumberInRange } from '~/utils/randomizer';
import { Stats, Skills, Variables, Player } from '~/interfaces/player';

export const startGame = () : Player => {
    const randomStats: Stats = {
        intelligence: generateTriangularValue(1, 10, 5),
        charisma: generateTriangularValue(1, 10, 5),
        beauty: generateTriangularValue(1, 10, 5),
        luck: generateTriangularValue(1, 10, 5),
    };

    const randomSkills: Skills = {
        gaming: getRandomNumberInRange(0, 4),
        music: getRandomNumberInRange(0, 4),
        trading: getRandomNumberInRange(0, 4),
    };

    const startVariables: Variables = {
        hunger: 100,
        sleep: 100,
        sanity: 100,
        money: 10000,
    };

    const genders = ['male', 'female'];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];

    return  {
        gender: randomGender,
        stats: randomStats,
        skills: randomSkills,
        variables: startVariables,
    };
};