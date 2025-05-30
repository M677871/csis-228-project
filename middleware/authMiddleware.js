/**
 * Authentication and Authorization Middleware.
 * This file contains middleware functions to protect routes based on user login status and roles.
 */

/**
 * Middleware to ensure a user is logged in.
 * If the user is not logged in, they are redirected to the login page with an error message.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const requireLogin = (req, res, next) => {
    if (req.session.user) {
        // User is logged in, proceed to the next middleware/route handler
        next();
    } else {
        // User is not logged in, redirect to login page
        req.flash('error', 'Please log in to access this page.');
        res.redirect('/login');
    }
};

/**
 * Middleware to ensure a user has a specific role.
 * This middleware should be used after `requireLogin`.
 * If the user does not have the required role, they are redirected to their dashboard
 * or a generic home page with an error message.
 * @param {string} role - The required role (e.g., 'admin', 'instructor', 'student').
 * @returns {Function} An Express middleware function.
 */
const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.userType === role) {
            // User is logged in and has the required role, proceed
            next();
        } else if (req.session.user) {
            // User is logged in but does not have the required role
            req.flash('error', `You do not have permission to access this page. (Required role: ${role})`);
            // Redirect based on their actual role or to a general dashboard
            if (req.session.user.userType) {
                res.redirect(`/${req.session.user.userType}/dashboard`);
            } else {
                res.redirect('/'); // Fallback to home if userType is somehow missing
            }
        } else {
            // User is not logged in (should ideally be caught by requireLogin first, but good fallback)
            req.flash('error', 'Please log in to access this page.');
            res.redirect('/login');
        }
    };
}
   



module.exports = {
    requireLogin,
    requireRole 
};
