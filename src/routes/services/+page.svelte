<script>
    // ============================================================
    // src/routes/services/+page.svelte
    // This page lists ALL services at the URL /services
    // ============================================================

    // Import the services data from our JSON file
    import services from '$lib/data/services.json';
</script>

<svelte:head>
    <title>Our Services — GreenScape Garden Services</title>
    <meta name="description" content="Grass cutting, hedge cutting, weeding and garden design in Dublin." />
</svelte:head>

<!-- Green banner at the top (uses .page-hero class from global.css) -->
<div class="page-hero">
    <div class="container">
        <h1>Our Services</h1>
        <p>Everything your garden needs, handled by professionals who care.</p>
    </div>
</div>

<!-- Main services list -->
<section class="section">
    <div class="container">

        <!--
            Loop through every service in services.json
            'i' is the index (0, 1, 2, 3...)
            We use it to alternate the layout left/right with the 'reverse' class
        -->
        {#each services as service, i}

            <div class="service-row {i % 2 === 1 ? 'reverse' : ''}">

                <!-- Service image on the left (or right if reversed) -->
                <div class="service-img-wrap">
                    <img src={service.image} alt={service.title} />
                    <div class="service-badge">{service.icon}</div>
                </div>

                <!-- Service text on the right (or left if reversed) -->
                <div class="service-info">
                    <span class="service-tag">Service</span>
                    <h2>{service.title}</h2>
                    <p class="lead">{service.shortDesc}</p>
                    <p>{service.fullDesc}</p>

                    <!-- Features list using a Svelte {#each} loop -->
                    <ul class="features-list">
                        {#each service.features as feature}
                            <li>✅ {feature}</li>
                        {/each}
                    </ul>

                    <!-- Price and duration info box -->
                    <div class="service-meta">
                        <div class="meta-item">
                            <span class="meta-label">Starting Price</span>
                            <span class="meta-value">{service.price}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Typical Duration</span>
                            <span class="meta-value">{service.duration}</span>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="service-actions">
                        <a href="/services/{service.slug}" class="btn btn-outline">More Details</a>
                        <a href="/booking" class="btn btn-primary">Book This Service</a>
                    </div>
                </div>

            </div>

        {/each}

    </div>
</section>

<!-- Bottom call to action -->
<section class="services-cta">
    <div class="container" style="text-align: center;">
        <h2>Not Sure What You Need?</h2>
        <p>Get in touch and we will recommend the right service for your garden.</p>
        <a href="/contact" class="btn btn-primary" style="margin-top: 1.5rem;">Contact Us</a>
    </div>
</section>

<style>
    /* Each service row - image on one side, text on the other */
    .service-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        margin-bottom: 5rem;
        padding-bottom: 5rem;
        border-bottom: 1px solid var(--green-muted);
    }

    /* Remove border from the last row */
    .service-row:last-of-type {
        border-bottom: none;
    }

    /* Reverse the column order for every second row */
    .service-row.reverse {
        direction: rtl; /* right-to-left flips columns */
    }
    .service-row.reverse > * {
        direction: ltr; /* but keep the text reading left-to-right inside */
    }

    /* Image container */
    .service-img-wrap {
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
    }

    .service-img-wrap img {
        width: 100%;
        height: 380px;
        object-fit: cover;
        background: var(--green-muted); /* shows if image is missing */
        display: block;
    }

    /* Emoji badge in the corner of the image */
    .service-badge {
        position: absolute;
        bottom: 1.25rem;
        right: 1.25rem;
        width: 60px;
        height: 60px;
        background: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        box-shadow: var(--shadow-md);
    }

    /* Small green pill label above the heading */
    .service-tag {
        display: inline-block;
        background: var(--green-pale);
        color: var(--green-mid);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 0.3rem 0.9rem;
        border-radius: var(--radius-full);
        margin-bottom: 0.75rem;
    }

    /* The bold intro line under the heading */
    .lead {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--green-mid) !important;
        margin-bottom: 0.75rem;
    }

    /* Feature bullets */
    .features-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin: 1.25rem 0;
    }

    .features-list li {
        font-size: 0.95rem;
        color: var(--text-mid);
    }

    /* Price / duration box */
    .service-meta {
        display: flex;
        gap: 2rem;
        background: var(--green-pale);
        border-radius: var(--radius-md);
        padding: 1rem 1.5rem;
        margin: 1.5rem 0;
    }

    .meta-label {
        display: block;
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--text-muted);
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 0.2rem;
    }

    .meta-value {
        font-weight: 700;
        color: var(--green-dark);
        font-size: 1.1rem;
    }

    /* Buttons row */
    .service-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    /* Bottom CTA section */
    .services-cta {
        background: var(--green-pale);
        padding: 4rem 0;
    }

    .services-cta h2 { margin-bottom: 0.5rem; }

    /* Stack on mobile */
    @media (max-width: 768px) {
        .service-row {
            grid-template-columns: 1fr;
            direction: ltr !important;
        }
    }
</style>