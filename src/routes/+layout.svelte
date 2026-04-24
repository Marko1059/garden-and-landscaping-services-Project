<script>
    // ============================================================
    // +layout.svelte
    // This file wraps every page on your site.
    // The navbar and footer you write here will appear on ALL pages.
    // The <slot /> tag below is where each individual page loads in.
    // ============================================================

    // Import our global CSS so it applies to every page
    import '../lib/styles/global.css';

    // 'data' comes from +layout.server.js - it contains the logged-in user
    export let data;

    // Create a shortcut variable for the user
    // If no one is logged in, user will be null
    $: user = data?.user ?? null;

    // Check if the user is an admin or staff member
    $: isAdmin = user?.role === 'ROLE_ADMIN';
    $: isStaff = user?.role === 'ROLE_STAFF' || isAdmin;

    // This variable controls whether the mobile menu is open or closed
    let mobileMenuOpen = false;

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    function closeMenu() {
        mobileMenuOpen = false;
    }
</script>


<!-- ============================================================
     NAVBAR - appears at the top of every page
     ============================================================ -->
<header class="navbar">
    <div class="container navbar-inner">

        <!-- Logo - clicking it goes to the home page -->
        <a href="/" class="logo" on:click={closeMenu}>
            <span class="logo-icon">🌿</span>
            <span class="logo-text">GreenScape</span>
        </a>

        <!-- Navigation links - shown on desktop -->
        <nav class="nav-links">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/gallery">Gallery</a>
            <a href="/contact">Contact</a>
            <a href="/booking">Book Now</a>

            <!-- Only show Admin link if the user is an admin or staff -->
            {#if isAdmin || isStaff}
                <a href="/admin" class="nav-badge">
                    {isAdmin ? 'Admin' : 'Staff'}
                </a>
            {/if}
        </nav>

        <!-- Login / Register buttons on the right -->
        <div class="nav-auth">
            {#if user}
                <!-- If logged in, show their name and a logout button -->
                <span class="nav-user">👤 {user.name}</span>
                <a href="/logout" class="btn btn-outline btn-sm">Log out</a>
            {:else}
                <!-- If not logged in, show login and register -->
                <a href="/login" class="btn btn-outline btn-sm">Log in</a>
                <a href="/register" class="btn btn-primary btn-sm">Register</a>
            {/if}
        </div>

        <!-- Hamburger button - only visible on mobile -->
        <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

    </div>

    <!-- Mobile dropdown menu - only shows when hamburger is clicked -->
    {#if mobileMenuOpen}
        <div class="mobile-menu">
            <a href="/" on:click={closeMenu}>Home</a>
            <a href="/services" on:click={closeMenu}>Services</a>
            <a href="/gallery" on:click={closeMenu}>Gallery</a>
            <a href="/contact" on:click={closeMenu}>Contact</a>
            <a href="/booking" on:click={closeMenu}>Book Now</a>

            {#if isAdmin || isStaff}
                <a href="/admin" on:click={closeMenu}>Admin Dashboard</a>
            {/if}

            <div class="mobile-auth">
                {#if user}
                    <span>Logged in as {user.name}</span>
                    <a href="/logout" on:click={closeMenu}>Log out</a>
                {:else}
                    <a href="/login" on:click={closeMenu}>Log in</a>
                    <a href="/register" on:click={closeMenu}>Register</a>
                {/if}
            </div>
        </div>
    {/if}
</header>


<!-- ============================================================
     MAIN CONTENT AREA
     <slot /> is a special Svelte tag - it means "put the current
     page content here". Every page you visit loads inside this slot.
     ============================================================ -->
<main>
    <slot />
</main>


<!-- ============================================================
     FOOTER - appears at the bottom of every page
     ============================================================ -->
<footer class="footer">
    <div class="container footer-inner">

        <!-- Brand column -->
        <div class="footer-brand">
            <div class="footer-logo">🌿 GreenScape</div>
            <p>Professional garden and landscaping services across Dublin and surrounding areas.</p>
        </div>

        <!-- Services links column -->
        <div class="footer-col">
            <h4>Services</h4>
            <a href="/services/grass-cutting">Grass Cutting</a>
            <a href="/services/hedge-cutting">Hedge Cutting</a>
            <a href="/services/weeding">Weeding</a>
            <a href="/services/design-and-planting">Design and Planting</a>
        </div>

        <!-- Site links column -->
        <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/gallery">Gallery</a>
            <a href="/contact">Contact Us</a>
            <a href="/booking">Book a Visit</a>
        </div>

        <!-- Contact info column -->
        <div class="footer-col">
            <h4>Get in Touch</h4>
            <p>📍 Dublin, Ireland</p>
            <p>📞 +353 01 234 567</p>
            <p>✉️ info@greenscape.ie</p>
            <p>🕐 Mon–Sat: 8am – 6pm</p>
        </div>

    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
        <div class="container">
            <!-- new Date().getFullYear() automatically shows the current year -->
            <p>© {new Date().getFullYear()} GreenScape Garden Services. All rights reserved.</p>
        </div>
    </div>
</footer>


<style>
    /* ===== NAVBAR ===== */

    .navbar {
        /* sticky makes it stay at the top when you scroll */
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(255, 255, 255, 0.97);
        border-bottom: 1px solid var(--green-muted);
        box-shadow: var(--shadow-sm);
    }

    .navbar-inner {
        display: flex;
        align-items: center;
        gap: 2rem;
        height: 70px;
    }

    /* Logo */
    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        flex-shrink: 0;
    }

    .logo-icon { font-size: 1.6rem; }

    .logo-text {
        font-family: var(--font-display);
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--green-dark);
    }

    /* Nav links */
    .nav-links {
        display: flex;
        gap: 0.25rem;
        flex: 1;
    }

    .nav-links a {
        padding: 0.5rem 0.9rem;
        border-radius: var(--radius-full);
        color: var(--text-mid);
        font-weight: 700;
        font-size: 0.9rem;
        transition: all var(--transition);
    }

    .nav-links a:hover {
        background: var(--green-pale);
        color: var(--green-dark);
    }

    /* Admin/Staff badge link */
    .nav-badge {
        background: var(--green-dark) !important;
        color: var(--white) !important;
        padding: 0.5rem 0.9rem;
        border-radius: var(--radius-full);
        font-weight: 700;
        font-size: 0.9rem;
    }

    /* Auth area (login/register/logout) */
    .nav-auth {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }

    .nav-user {
        font-size: 0.85rem;
        color: var(--text-light);
        font-weight: 700;
    }

    /* Hamburger - hidden on desktop, shown on mobile */
    .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
    }

    .hamburger span {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--green-dark);
        border-radius: 2px;
    }

    /* Mobile dropdown */
    .mobile-menu {
        display: flex;
        flex-direction: column;
        background: var(--white);
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--green-muted);
    }

    .mobile-menu a {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--green-pale);
        color: var(--text-dark);
        font-weight: 700;
    }

    .mobile-auth {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-top: 1rem;
    }

    /* On small screens: hide desktop nav, show hamburger */
    @media (max-width: 768px) {
        .nav-links { display: none; }
        .nav-auth  { display: none; }
        .hamburger { display: flex; }
    }


    /* ===== FOOTER ===== */

    .footer {
        background: var(--green-dark);
        color: rgba(255, 255, 255, 0.8);
    }

    .footer-inner {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: 3rem;
        padding: 4rem 1.5rem 3rem;
    }

    .footer-logo {
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--white);
        margin-bottom: 1rem;
    }

    .footer-brand p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
    }

    .footer-col {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .footer-col h4 {
        color: var(--white);
        font-family: var(--font-display);
        font-size: 1rem;
        margin-bottom: 0.75rem;
        font-weight: 600;
    }

    .footer-col a {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        transition: color var(--transition);
    }

    .footer-col a:hover { color: var(--white); }

    .footer-col p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
    }

    .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        padding: 1.25rem 0;
        text-align: center;
    }

    .footer-bottom p {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
        margin: 0;
    }

    /* Responsive footer - stack on smaller screens */
    @media (max-width: 900px) {
        .footer-inner { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 560px) {
        .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
    }

    /* ===== PAGE WRAPPER ===== */
    /* Makes the footer always stick to the bottom */
    :global(body) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }
</style>