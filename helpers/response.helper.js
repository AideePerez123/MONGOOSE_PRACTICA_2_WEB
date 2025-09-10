import i18n from 'i18n'

export const responseSuccess = (messageKey, data) => {
    const message = i18n.__({ phrase: messageKey, locale: 'es' })
    return {
        status: 'success',
        message,
        data
    }
}

export const responseError = (message) => {
    return {
        status: 'error',
        message,
        data: null
    }
}