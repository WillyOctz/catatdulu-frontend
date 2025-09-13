


export const validateEmail = (email) => {
    if (email.trim()) {
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email)
    }
    
    return false
}

export const validatePassword = (password) => {
    if (password.trim()) {
        // Minimum 8 characters, at least one uppercase, one lowercase, one number and one special character
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return regex.test(password)
    }
    
    return false
}