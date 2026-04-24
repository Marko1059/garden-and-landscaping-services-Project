// ============================================================
// src/routes/booking/+page.server.js
//
// This file does two things:
// 1. LOAD: runs before the page loads, reads cookies and URL params
// 2. ACTION: runs when the booking form is submitted
// ============================================================

import { fail } from '@sveltejs/kit';
import services from '$lib/data/services.json';

// The 'load' function runs before the page is shown to the user
export function load({ url, cookies }) {

    // Check if a service was pre-selected via the URL
    // e.g. /booking?service=grass-cutting
    const preselected = url.searchParams.get('service') ?? '';

    // Try to read the saved contact info from a cookie
    // This lets us pre-fill the form if the user has contacted us before
    let lastContact = null;
    const cookieValue = cookies.get('lastContact');

    if (cookieValue) {
        try {
            lastContact = JSON.parse(cookieValue);
        } catch {
            // If the cookie data is broken, just ignore it
            lastContact = null;
        }
    }

    return {
        services: services,
        preselected: preselected,
        lastContact: lastContact
    };
}


// The 'actions' object handles form submissions
export const actions = {

    default: async ({ request, cookies }) => {

        // Read the submitted form data
        const data    = await request.formData();
        const name    = data.get('name')?.toString().trim();
        const email   = data.get('email')?.toString().trim();
        const phone   = data.get('phone')?.toString().trim();
        const service = data.get('service')?.toString().trim();
        const date    = data.get('date')?.toString().trim();
        const notes   = data.get('notes')?.toString().trim();

        // Check required fields are filled in
        if (!name || !email || !phone || !service || !date) {
            return fail(400, {
                error: 'Please fill in all required fields.',
                values: { name, email, phone, service, date, notes }
            });
        }

        // Save the booking details in a cookie for 7 days
        cookies.set('lastBooking', JSON.stringify({ name, email, service, date }), {
            path: '/',
            maxAge: 60 * 60 * 24 * 7  // 7 days
        });

        // Return a success message to display on the page
        return {
            success: true,
            message: `Thanks ${name}! Your booking request has been received. We will confirm by email shortly.`
        };
    }
};