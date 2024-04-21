//TODO: Пофиксить генерацию
//Генерация стат игрока с использованием треугольного распределения
export function generateTriangularValue(min: number, max: number, mode: number) {
    const range = max - min + 1; // Количество возможных целых чисел в заданном диапазоне
    const random = Math.random();// Cлучайное число в диапазоне [0, 1)

    // Вычисляем распределенную вероятность вокруг пика (mode)
    let probability;
    if (random < Math.abs(mode - min) / range) {
        probability = random * range; // Увеличиваем вероятность близости к mode
    } else {
        probability = (1 - random) * range; // Увеличиваем вероятность близости к mode
    }

    // Определяем значение на основе распределенной вероятности
    if (probability <= range) {
        // Генерация значений в первой половине диапазона
        return Math.floor(min + Math.sqrt(2 * probability * (mode - min)));
    } else {
        // Генерация значений во второй половине диапазона
        return Math.floor(max - Math.sqrt((range - probability) * (max - mode)));
    }
}

export const getRandomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};