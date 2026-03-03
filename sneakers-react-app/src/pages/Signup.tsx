import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, getPasswordStrength } from '../utils/validation';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, isLoading, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: [] as string[],
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Update password strength on password change
    useEffect(() => {
        const validation = validatePassword(formData.password);
        setPasswordStrength({
            score: validation.score,
            feedback: validation.feedback,
        });
    }, [formData.password]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            newErrors.password = `Password must be at least 8 characters with ${passwordValidation.feedback.join(', ').toLowerCase()}`;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            await signup(formData.fullName, formData.email, formData.password);
            // Navigate happens via useEffect watching isAuthenticated
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
        }
    };

    const strength = getPasswordStrength(passwordStrength.score);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-100 dark:shadow-none p-8 md:p-10 border border-slate-100 dark:border-slate-800">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: 'spring' }}
                            className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200 dark:shadow-none"
                        >
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </motion.div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Create Account</h1>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">Join the Sneakers community</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 flex items-start gap-3"
                            >
                                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                                <span className="text-red-700 dark:text-red-200 text-sm font-medium">{error}</span>
                            </motion.div>
                        )}

                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="fullName" className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm font-medium mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm font-medium mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm font-medium mt-1">{errors.password}</p>
                            )}

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 space-y-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength.score}%` }}
                                                transition={{ duration: 0.3 }}
                                                className={`h-full ${strength.color} transition-colors`}
                                            />
                                        </div>
                                        <span className={`text-xs font-black uppercase tracking-widest ${strength.color === 'bg-emerald-500' ? 'text-emerald-600 dark:text-emerald-400' : strength.color === 'bg-lime-500' ? 'text-lime-600 dark:text-lime-400' : strength.color === 'bg-yellow-500' ? 'text-yellow-600 dark:text-yellow-400' : strength.color === 'bg-orange-500' ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {strength.label}
                                        </span>
                                    </div>
                                    {passwordStrength.feedback.length > 0 && (
                                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                                            {passwordStrength.feedback.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-1">
                                                    <span className="text-slate-400 dark:text-slate-600">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm font-medium mt-1">{errors.confirmPassword}</p>
                            )}
                            {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    Passwords match
                                </p>
                            )}
                        </div>

                        {/* Sign Up Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                        <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Or</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-slate-600 dark:text-slate-400 font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                            Sign in
                        </Link>
                    </p>

                    {/* Password Requirements */}
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Password Requirements</p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                                At least 8 characters
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                                Uppercase and lowercase letters
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                                Number or special character
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
