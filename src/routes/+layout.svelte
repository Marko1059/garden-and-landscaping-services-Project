<script>
    import '../lib/styles/global.css';

    // Svelte 5 props
    let { data } = $props();

    // Reactive state (Svelte 5 style)
    let user = $derived(data?.user ?? null);
    let isAdmin = $derived(user?.role === 'ROLE_ADMIN');
    let isStaff = $derived(user?.role === 'ROLE_STAFF' || isAdmin);

    let mobileMenuOpen = false;

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    function closeMenu() {
        mobileMenuOpen = false;
    }
</script>

<header class="navbar">
    <div class="container navbar-inner">

        <a href="/" class="logo" on:click={closeMenu}>
            <span class="logo-icon">🌿</span>
            <span class="logo-text">GreenScape</span>
        </a>

        <nav class="nav-links">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/gallery">Gallery</a>
            <a href="/contact">Contact</a>
            <a href="/booking">Book Now</a>

            {#if isAdmin || isStaff}
                <a href="/admin" class="nav-badge">
                    {isAdmin ? 'Admin' : 'Staff'}
                </a>
            {/if}
        </nav>

        <div class="nav-auth">
            {#if user}
                <span class="nav-user">👤 {user.name}</span>
                <a href="/logout" class="btn btn-outline btn-sm">Log out</a>
            {:else}
                <a href="/login" class="btn btn-outline btn-sm">Log in</a>
                <a href="/register" class="btn btn-primary btn-sm">Register</a>
            {/if}
        </div>

        <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

    </div>

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

<main>
    <slot />
</main>

<footer class="footer">
    <div class="container footer-inner">

        <div class="footer-brand">
            <div class="footer-logo">🌿 GreenScape</div>
            <p>Professional garden and landscaping services across Dublin and surrounding areas.</p>
        </div>

        <div class="footer-col">
            <h4>Services</h4>
            <a href="/services/grass-cutting">Grass Cutting</a>
            <a href="/services/hedge-cutting">Hedge Cutting</a>
            <a href="/services/weeding">Weeding</a>
            <a href="/services/design-and-planting">Design and Planting</a>
        </div>

        <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/gallery">Gallery</a>
            <a href="/contact">Contact Us</a>
            <a href="/booking">Book a Visit</a>
        </div>

        <div class="footer-col">
            <h4>Get in Touch</h4>
            <p>📍 Dublin, Ireland</p>
            <p>📞 +353 01 234 567</p>
            <p>✉️ info@greenscape.ie</p>
            <p>🕐 Mon–Sat: 8am – 6pm</p>
        </div>

    </div>

    <div class="footer-bottom">
        <div class="container">
            <p>© {new Date().getFullYear()} GreenScape Garden Services. All rights reserved.</p>
        </div>
    </div>
</footer>