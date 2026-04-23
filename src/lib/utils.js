// ============================================================
// utils.js
// This file contains helper functions that we can reuse
// across different pages by importing them.
// ============================================================


// This function finds one service from a list by its slug (the URL name)
// Example: getServiceBySlug(services, "grass-cutting") returns that service object
export function getServiceBySlug(services, slug) {
    return services.find(service => service.slug === slug);
}


// This function returns a greeting depending on the time of day
// Example: returns "Good morning" if it's before 12pm
export function getTimeGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Good morning';
    } else if (hour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}


// This function shortens long text and adds "..." at the end
// Example: truncateText("Hello world this is long", 10) returns "Hello worl..."
export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}