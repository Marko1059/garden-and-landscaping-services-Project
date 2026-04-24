// ============================================================
// src/routes/contact/+page.server.js
//
// This file handles what happens when the contact form is submitted.
// In SvelteKit, form handling on the server is done with 'actions'.
// ============================================================

import { fail } from '@sveltejs/kit';

export const actions = {

    // 'default' runs when the form is submitted
    default: async ({ request, cookies }) => {

        // Get all the form data the user typed in
        const data      = await request.formData();
        const name      = data.get('name')?.toString().trim();
        const email     = data.get('email')?.toString().trim();
        const phone     = data.get('phone')?.toString().trim();
        const service   = data.get('service')?.toString().trim();
        const message   = data.get('message')?.toString().trim();

        // Check that required fields are filled in
        // If not, return an error and send the values back so the form stays filled
        if (!name || !email || !message) {
            return fail(400, {
                error: 'Please fill in your name, email and message.',
                values: { name, email, phone, service, message }
            });
        }

        // Basic email check - must contain an @ symbol
        if (!email.includes('@')) {
            return fail(400, {
                error: 'Please enter a valid email address.',
                values: { name, email, phone, service, message }
            });
        }

        // Save the user's name and email in a cookie
        // This lets us welcome them back if they visit again
        cookies.set('lastContact', JSON.stringify({ name, email }), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30  // cookie lasts 30 days
        });

        // In a real project you would send an email here using a service like Nodemailer.
        // For now, we just return a success message.
        return {
            success: true,
            message: `Thank you, ${name}! We have received your message and will be in touch shortly.`
        };
    }
};