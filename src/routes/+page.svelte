<script>
    import services from '$lib/data/services.json';
    import { getTimeGreeting } from '$lib/utils.js';

    // ✅ Svelte 5 props
    let { data } = $props();

    // ✅ reactive
    let user = $derived(data?.user ?? null);

    const greeting = getTimeGreeting();

    const testimonials = [
        {
            name: "Margaret O'Brien",
            location: 'Clontarf, Dublin',
            text: 'GreenScape transformed our back garden completely. The team were professional and the lawn looks incredible. Would highly recommend!',
            stars: 5
        },
        {
            name: 'David Kavanagh',
            location: 'Rathfarnham, Dublin',
            text: 'Brilliant service from start to finish. The hedge cutting is done perfectly every time and they always leave the place spotless.',
            stars: 5
        },
        {
            name: 'Patricia Doyle',
            location: 'Malahide, Dublin',
            text: 'The design and planting service exceeded all expectations. Our front garden is now the talk of the road — absolutely beautiful.',
            stars: 5
        }
    ];
</script>


<!-- svelte:head lets us set the browser tab title and description for this page -->
<svelte:head>
    <title>GreenScape — Professional Garden and Landscaping Services</title>
    <meta name="description" content="Professional grass cutting, hedge trimming, weeding and garden design services across Dublin." />
</svelte:head>


<!-- ============================================================
     HERO SECTION - Big banner at the top of the home page
     ============================================================ -->
<section class="hero">
    <!-- Dark overlay so text is readable over the background image -->
    <div class="hero-overlay"></div>

    <div class="container hero-content">

        <!-- If the user is logged in, greet them by name -->
        {#if user}
            <p class="hero-greeting">{greeting}, {user.name}! 👋</p>
        {/if}

        <h1>Your Garden,<br><em>Beautifully Maintained</em></h1>

        <p class="hero-sub">
            Professional grass cutting, hedge trimming, weeding and bespoke garden
            design across Dublin and surrounding areas.
        </p>

        <!-- Two buttons side by side -->
        <div class="hero-buttons">
            <a href="/booking" class="btn btn-primary">Book a Free Quote</a>
            <a href="/services" class="btn btn-outline-light">Our Services</a>
        </div>

        <!-- Trust badges -->
        <div class="hero-badges">
            <span>✅ Fully Insured</span>
            <span>✅ Free Quotes</span>
            <span>✅ 10+ Years Experience</span>
        </div>
    </div>
</section>


<!-- ============================================================
     INFO STRIP - 4 quick trust points under the hero
     ============================================================ -->
<section class="info-strip">
    <div class="container info-grid">
        <div class="info-item">
            <span class="info-icon">🏅</span>
            <div>
                <strong>Experienced Team</strong>
                <p>Over a decade of professional garden care</p>
            </div>
        </div>
        <div class="info-item">
            <span class="info-icon">📍</span>
            <div>
                <strong>Dublin Based</strong>
                <p>Serving Dublin city and all surrounding areas</p>
            </div>
        </div>
        <div class="info-item">
            <span class="info-icon">💬</span>
            <div>
                <strong>Free Quotes</strong>
                <p>No obligation, no hidden costs</p>
            </div>
        </div>
        <div class="info-item">
            <span class="info-icon">🔒</span>
            <div>
                <strong>Fully Insured</strong>
                <p>Complete peace of mind on every job</p>
            </div>
        </div>
    </div>
</section>


<!-- ============================================================
     SERVICES SECTION - Shows all 4 service cards
     ============================================================ -->
<section class="section services-section">
    <div class="container">
        <h2 class="section-title">What We Do</h2>
        <div class="divider"></div>
        <p class="section-subtitle">From routine lawn maintenance to complete garden transformations.</p>

        <!--
            {#each services as service}
            This Svelte loop goes through every item in services.json
            and creates one card for each one automatically.
        -->
        <div class="services-grid">
            {#each services as service}
                <a href="/services/{service.slug}" class="service-card card">
                    <div class="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.shortDesc}</p>
                    <div class="service-price">{service.price}</div>
                    <span class="service-link">Learn more →</span>
                </a>
            {/each}
        </div>

        <div class="center-btn">
            <a href="/services" class="btn btn-outline">View All Services</a>
        </div>
    </div>
</section>


<!-- ============================================================
     TESTIMONIALS - Customer reviews
     ============================================================ -->
<section class="section testimonials-section">
    <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        <div class="divider"></div>
        <p class="section-subtitle">Here is what some of our happy customers have to say.</p>

        <div class="testimonials-grid">
            <!--
                Another {#each} loop - this time for testimonials.
                The 'stars' value controls how many ⭐ icons appear.
            -->
            {#each testimonials as testimonial}
                <div class="testimonial card">
                    <!-- repeat() is a JS string method - repeats ⭐ by the stars number -->
                    <div class="stars">{'⭐'.repeat(testimonial.stars)}</div>
                    <p class="testimonial-text">"{testimonial.text}"</p>
                    <div class="testimonial-author">
                        <strong>{testimonial.name}</strong>
                        <span>{testimonial.location}</span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>


<!-- ============================================================
     CALL TO ACTION - Bottom banner encouraging bookings
     ============================================================ -->
<section class="cta-banner">
    <div class="container cta-inner">
        <div>
            <h2>Ready for a Beautiful Garden?</h2>
            <p>Book a free no-obligation quote today.</p>
        </div>
        <div class="cta-buttons">
            <a href="/booking" class="btn btn-primary">Book a Free Quote</a>
            <a href="/contact" class="btn btn-outline-light">Contact Us</a>
        </div>
    </div>
</section>


<style>
    /* ===== HERO ===== */
    .hero {
        position: relative;
        min-height: 90vh;
        display: flex;
        align-items: center;
        /* Replace hero-garden.jpg with your own image in /static/images/ */
        background: url('/images/hero-garden.jpg') center / cover no-repeat;
        background-color: var(--green-dark); /* fallback if image is missing */
    }

    /* Dark transparent overlay on top of the background image */
    .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(20, 40, 12, 0.82) 0%, rgba(45, 74, 30, 0.65) 100%);
    }

    /* Content sits on top of the overlay */
    .hero-content {
        position: relative;
        z-index: 1;
        color: var(--white);
        max-width: 700px;
        padding-top: 4rem;
        padding-bottom: 4rem;
    }

    .hero-greeting {
        color: var(--green-light);
        font-weight: 700;
        margin-bottom: 0.75rem;
    }

    .hero-content h1 {
        color: var(--white);
        font-size: clamp(2.4rem, 6vw, 4rem);
        margin-bottom: 1.25rem;
        line-height: 1.2;
    }

    /* The italic green word in the heading */
    .hero-content h1 em {
        color: var(--green-light);
        font-style: normal;
    }

    .hero-sub {
        color: rgba(255, 255, 255, 0.88);
        font-size: 1.15rem;
        margin-bottom: 2rem;
        max-width: 560px;
    }

    .hero-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    .hero-badges {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
    }

    .hero-badges span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        font-weight: 700;
    }

    /* ===== INFO STRIP ===== */
    .info-strip {
        background: var(--green-dark);
        padding: 2rem 0;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--white);
    }

    .info-icon { font-size: 2rem; }

    .info-item strong {
        display: block;
        font-size: 0.95rem;
        margin-bottom: 0.2rem;
    }

    .info-item p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.85rem;
        margin: 0;
    }

    /* ===== SERVICES GRID ===== */
    .services-section { background: var(--cream); }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    .service-card {
        padding: 2rem 1.5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: inherit;
    }

    .service-icon { font-size: 3rem; }
    .service-card h3 { font-size: 1.2rem; color: var(--green-dark); }
    .service-card p  { font-size: 0.9rem; color: var(--text-light); margin: 0; }

    .service-price {
        font-weight: 700;
        color: var(--green-mid);
        margin-top: auto;
    }

    .service-link {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--green-mid);
    }

    .center-btn {
        text-align: center;
        margin-top: 3rem;
    }

    /* ===== TESTIMONIALS ===== */
    .testimonials-section { background: var(--white); }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    .testimonial {
        padding: 2rem;
        border-top: 4px solid var(--green-light);
    }

    .stars { font-size: 1.1rem; margin-bottom: 1rem; }

    .testimonial-text {
        font-style: italic;
        color: var(--text-mid);
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
    }

    .testimonial-author strong {
        display: block;
        color: var(--green-dark);
        font-size: 0.95rem;
    }

    .testimonial-author span {
        color: var(--text-muted);
        font-size: 0.85rem;
    }

    /* ===== CTA BANNER ===== */
    .cta-banner {
        background: linear-gradient(135deg, var(--green-mid) 0%, var(--green-dark) 100%);
        padding: 4rem 0;
    }

    .cta-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .cta-banner h2 { color: var(--white); }
    .cta-banner p  { color: rgba(255, 255, 255, 0.85); margin: 0; }

    .cta-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
        .services-grid     { grid-template-columns: repeat(2, 1fr); }
        .info-grid         { grid-template-columns: repeat(2, 1fr); }
        .testimonials-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 560px) {
        .services-grid { grid-template-columns: 1fr; }
        .info-grid     { grid-template-columns: 1fr; }
        .cta-inner     { flex-direction: column; text-align: center; }
    }
</style>