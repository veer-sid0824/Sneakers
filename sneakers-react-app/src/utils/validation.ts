export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; score: number; feedback: string[] } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length === 0) {
        return { isValid: false, score: 0, feedback: ['Password is required'] };
    }

    if (password.length >= 8) {
        score += 1;
    } else {
        feedback.push('At least 8 characters');
    }

    if (password.length >= 12) {
        score += 1;
    }

    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        feedback.push('Lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        feedback.push('Uppercase letters');
    }

    if (/[0-9]/.test(password)) {
        score += 1;
    } else {
        feedback.push('Numbers');
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        score += 1;
    } else {
        feedback.push('Special characters');
    }

    return {
        isValid: password.length >= 8,
        score: Math.min(Math.ceil((score / 6) * 100), 100),
        feedback: feedback.length > 0 ? feedback : ['Strong password'],
    };
};

export const getPasswordStrength = (score: number): { label: string; color: string } => {
    if (score < 20) return { label: 'Very Weak', color: 'bg-red-500' };
    if (score < 40) return { label: 'Weak', color: 'bg-orange-500' };
    if (score < 60) return { label: 'Fair', color: 'bg-yellow-500' };
    if (score < 80) return { label: 'Good', color: 'bg-lime-500' };
    return { label: 'Strong', color: 'bg-emerald-500' };
};
