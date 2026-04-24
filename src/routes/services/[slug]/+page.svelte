<script>
    // ============================================================
    // src/routes/services/[slug]/+page.svelte
    //
    // This is the detail page for a single service.
    // The 'data' prop receives 'service' and 'related' from
    // +page.server.js
    // ============================================================

    export let data;

    // Make 'service' and 'related' reactive shortcuts
    $: service = data.service;
    $: related = data.related;
</script>

<!-- Set the browser tab title dynamically using the service name -->
<svelte:head>
    <title>{service.title} — GreenScape Garden Services</title>
    <meta name="description" content={service.fullDesc} />
</svelte:head>


<!-- ============================================================
     HERO - full-width image with text overlay
     ============================================================ -->
<div class="service-hero">
    <!-- Background image set dynamically from the service data -->
    <div class="hero-bg" style="background-image: url('{service.image}')"></div>
    <div class="hero-overlay"></div>

    <div class="container hero-content">
        <!-- Back link to the services list -->
        <a href="/services" class="back-link">← All Services</a>
        <div class="hero-icon">{service.icon}</div>
        <h1>{service.title}</h1>
        <p>{service.shortDesc}</p>
    </div>
</div>


<!-- ============================================================
     MAIN CONTENT - two columns: info on left, booking box on right
     ============================================================ -->
<section class="section">
    <div class="container detail-layout">

        <!-- LEFT COLUMN: service description and features -->
        <div class="detail-main">

            <h2>About This Service</h2>
            <p class="detail-desc">{service.fullDesc}</p>

            <h3>What is Included</h3>
            <ul class="features-list">
                {#each service.features as feature}
                    <li>
                        <span>✅</span>
                        {feature}
                    </li>
                {/each}
            </ul>

            <!-- Step-by-step process box -->
            <div class="process-box">
                <h3>How It Works</h3>
                <div class="steps">

                    <div class="step">
                        <span class="step-num">1</span>
                        <div>
                            <strong>Get a Quote</strong>
                            <p>Fill in our booking form for a free no-obligation quote.</p>
                        </div>
                    </div>

                    <div class="step">
                        <span class="step-num">2</span>
                        <div>
                            <strong>We Visit</strong>
                            <p>Our team visits your garden at a time that suits you.</p>
                        </div>
                    </div>

                    <div class="step">
                        <span class="step-num">3</span>
                        <div>
                            <strong>We Work</strong>
                            <p>Professional work carried out with full care and attention.</p>
                        </div>
                    </div>

                    <div class="step">
                        <span class="step-num">4</span>
                        <div>
                            <strong>You Enjoy</strong>
                            <p>Sit back and enjoy your beautifully maintained garden.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- RIGHT COLUMN: booking/info sidebar -->
        <aside class="detail-sidebar">

            <div class="sidebar-card">
                <h3>Service Details</h3>

                <div class="sidebar-rows">
                    <div class="sidebar-row">
                        <span>Starting Price</span>
                        <strong>{service.price}</strong>
                    </div>
                    <div class="sidebar-row">
                        <span>Typical Duration</span>
                        <strong>{service.duration}</strong>
                    </div>
                    <div class="sidebar-row">
                        <span>Area Covered</span>
                        <strong>Dublin and surrounds</strong>
                    </div>
                    <div class="sidebar-row">
                        <span>Insurance</span>
                        <strong>Fully Insured ✅</strong>
                    </div>
                </div>

                <!-- Link to booking page, passing the service slug in the URL -->
                <a href="/booking?service={service.slug}" class="btn btn-primary full-btn">
                    Book This Service
                </a>
                <a href="/contact" class="btn btn-outline full-btn">
                    Ask a Question
                </a>
            </div>

            <!-- Guarantee box -->
            <div class="guarantee-box">
                <span>🛡️</span>
                <div>
                    <strong>Satisfaction Guaranteed</strong>
                    <p>We are not happy until you are. Every job is done to the highest standard.</p>
                </div>
            </div>

        </aside>
    </div>
</section>


<!-- ============================================================
     RELATED SERVICES - shows the other 3 services at the bottom
     ============================================================ -->
<section class="related-section">
    <div class="container">
        <h2 class="section-title">Other Services</h2>
        <div class="divider"></div>

        <div class="related-grid">
            {#each related as rel}
                <a href="/services/{rel.slug}" class="related-card card">
                    <span class="related-icon">{rel.icon}</span>
                    <div>
                        <h4>{rel.title}</h4>
                        <p>{rel.shortDesc}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    /* ===== HERO ===== */
    .service-hero {
        position: relative;
        min-height: 55vh;
        display: flex;
        align-items: flex-end;
    }

    .hero-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        background-color: var(--green-mid); /* fallback colour */
    }

    /* Gradient overlay - dark at bottom, lighter at top */
    .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(20, 40, 12, 0.9) 0%, rgba(20, 40, 12, 0.4) 100%);
    }

    .hero-content {
        position: relative;
        z-index: 1;
        padding-bottom: 3rem;
        padding-top: 6rem;
        color: var(--white);
    }

    .back-link {
        display: inline-block;
        color: rgba(255, 255, 255, 0.75);
        font-weight: 700;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        text-decoration: none;
        transition: color var(--transition);
    }
    .back-link:hover { color: var(--white); }

    .hero-icon { font-size: 3rem; margin-bottom: 0.75rem; }
    .hero-content h1 { color: var(--white); margin-bottom: 0.75rem; }
    .hero-content p {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.1rem;
        max-width: 550px;
        margin: 0;
    }

    /* ===== TWO COLUMN LAYOUT ===== */
    .detail-layout {
        display: grid;
        grid-template-columns: 1fr 360px; /* main content + narrower sidebar */
        gap: 4rem;
        align-items: start;
    }

    .detail-main h2 { margin-bottom: 1rem; }
    .detail-main h3 { margin: 2rem 0 1rem; }

    .detail-desc {
        font-size: 1.05rem;
        line-height: 1.8;
        color: var(--text-mid);
    }

    /* Features list */
    .features-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .features-list li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1rem;
        color: var(--text-mid);
        padding: 0.75rem 1rem;
        background: var(--green-pale);
        border-radius: var(--radius-md);
    }

    /* Process steps box */
    .process-box {
        margin-top: 2.5rem;
        background: var(--earth-pale);
        border-radius: var(--radius-lg);
        padding: 2rem;
    }

    .process-box h3 { color: var(--earth-dark); margin-bottom: 1.5rem; }

    .steps {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .step {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }

    .step-num {
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        background: var(--earth-mid);
        color: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
    }

    .step strong { display: block; color: var(--earth-dark); margin-bottom: 0.2rem; }
    .step p { font-size: 0.9rem; color: var(--text-mid); margin: 0; }

    /* ===== SIDEBAR ===== */
    .sidebar-card {
        background: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        padding: 2rem;
        /* Sticky: the sidebar sticks while you scroll the main content */
        position: sticky;
        top: 90px;
    }

    .sidebar-card h3 { margin-bottom: 1.25rem; }

    .sidebar-rows { display: flex; flex-direction: column; }

    .sidebar-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--green-muted);
        font-size: 0.9rem;
    }

    .sidebar-row span   { color: var(--text-light); }
    .sidebar-row strong { color: var(--green-dark); }

    /* Full-width button in the sidebar */
    .full-btn {
        width: 100%;
        text-align: center;
        display: block;
        margin-top: 0.75rem;
    }

    /* Guarantee box */
    .guarantee-box {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        background: var(--green-pale);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-top: 1.25rem;
        font-size: 1.5rem;
    }

    .guarantee-box strong { display: block; color: var(--green-dark); font-size: 0.95rem; }
    .guarantee-box p { color: var(--text-light); font-size: 0.85rem; margin: 0; }

    /* ===== RELATED SERVICES ===== */
    .related-section {
        background: var(--cream);
        padding: 4rem 0;
    }

    .related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        margin-top: 2rem;
    }

    .related-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        text-decoration: none;
        color: inherit;
    }

    .related-icon { font-size: 2rem; flex-shrink: 0; }
    .related-card h4 { color: var(--green-dark); margin-bottom: 0.25rem; }
    .related-card p  { color: var(--text-light); font-size: 0.85rem; margin: 0; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
        .detail-layout { grid-template-columns: 1fr; }
        .sidebar-card  { position: static; }
        .related-grid  { grid-template-columns: 1fr; }
    }
</style>