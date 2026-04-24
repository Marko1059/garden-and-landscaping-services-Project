// ============================================================
// src/routes/admin/+page.server.js
//
// This file protects the admin page.
// It checks if the user is logged in and has the right role.
// If not, it redirects them away.
// ============================================================

import { redirect } from '@sveltejs/kit';

export function load({ locals }) {

    // 'locals.user' is set by the better-auth system
    const user = locals.user;

    // If nobody is logged in, send them to the login page
    if (!user) {
        throw redirect(302, '/login');
    }

    // If the user is logged in but is just a customer (not admin or staff),
    // send them back to the home page
    if (user.role !== 'ROLE_ADMIN' && user.role !== 'ROLE_STAFF') {
        throw redirect(302, '/');
    }

    // If we get here, the user IS admin or staff - let them through
    return {
        user: user
    };
}