// ============================================================
// src/routes/services/[slug]/+page.server.js
//
// This file runs on the server whenever someone visits a URL like:
//   /services/grass-cutting
//   /services/hedge-cutting
//
// SvelteKit extracts the word after /services/ and puts it in
// params.slug. We use that to find the right service from our data.
// ============================================================

// 'error' lets us show a 404 page if the service is not found
import { error } from '@sveltejs/kit';

// Import our services data and the helper function
import services from '$lib/data/services.json';
import { getServiceBySlug } from '$lib/utils.js';

export function load({ params }) {

    // params.slug is whatever is in the URL
    // e.g. visiting /services/grass-cutting gives params.slug = "grass-cutting"
    const service = getServiceBySlug(services, params.slug);

    // If we could not find a matching service, show a 404 error page
    if (!service) {
        throw error(404, `Sorry, we could not find a service called "${params.slug}"`);
    }

    // Get the other services to show as "related services" at the bottom
    const related = services.filter(s => s.slug !== params.slug);

    // Return the data - it becomes available as 'data' in +page.svelte
    return {
        service: service,
        related: related
    };
}