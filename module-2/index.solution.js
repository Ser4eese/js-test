// РЕШЕНИЕ МОДУЛЯ 2
// Этот файл содержит решение для проверки тестов
// Удалите этот файл перед выдачей задания студентам

function checkAccess(age, isPremium) {
    if (age < 18) {
        return "Доступ запрещен: возраст менее 18 лет";
    }

    if (isPremium) {
        return "Полный доступ";
    } else {
        return "Базовый доступ";
    }
}

module.exports = checkAccess;
