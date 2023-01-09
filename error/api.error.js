class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message){
        return new ApiError(400, message)// Відповідь означає, що сервер не розуміє запиту через невірний синтаксис
    }

    static unauthorized(message){
        return new ApiError(401, message)// Для отримання запитуваної відповіді потрібна аутентифікація. Статус схожий на статус 403, але в цьому випадку, аутентифікація можлива
    }

    static forbidden(message){
        return new ApiError(403, message)// У відвідувача недостатньо прав для перегляду контенту
    }

    static notFound(message){
        return new ApiError(404, message)// Сервер не може знайти запитуваний ресурс
    }

    static preconditionFailed(message){
        return new ApiError(412, message)// Клієнт вказав в своїх заголовках умови, які сервер не може виконати
    }

    static internal(message){
        return new ApiError(500, message)// Сервер не зміг виконати запит через непередбачену помилку
    }
}

module.exports = ApiError