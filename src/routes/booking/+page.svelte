<script>
    // ============================================================
    // src/routes/booking/+page.svelte
    // The booking request form
    // ============================================================

    import { enhance } from '$app/forms';

    export let data;
    export let form;

    // Shortcuts for the data loaded in +page.server.js
    $: services    = data.services;
    $: preselected = data.preselected;
    $: lastContact = data.lastContact;

    let submitting = false;

    // Calculate tomorrow's date to use as the minimum selectable date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0]; // formats as YYYY-MM-DD
</script>

<svelte:head>
    <title>Book a Visit — GreenScape Garden Services</title>
    <meta name="description" content="Book a free garden visit and quote with GreenScape." />
</svelte:head>

<div class="page-hero">
    <div class="container">
        <h1>Book a Visit</h1>
        <p>Request a free garden visit and no-obligation quote. We will get back to you within one business day.</p>
    </div>
</div>

<section class="section">
    <div class="container booking-layout">

        <!-- LEFT: Booking form -->
        <div class="form-wrapper">
            <h2>Request a Visit</h2>
            <p class="intro-text">Fill in your details below and we will confirm your appointment by email.</p>

            <!--
                If a cookie exists with the user's previous contact details,
                show them a welcome back message
            -->
            {#if lastContact && !form?.success}
                <div class="cookie-notice">
                    👋 Welcome back, <strong>{lastContact.name}</strong>! We have pre-filled your details from your last visit.
                </div>
            {/if}

            <!-- Show success message after booking is submitted -->
            {#if form?.success}
                <div class="alert alert-success">
                    ✅ {form.message}
                </div>

            {:else}
                <!-- Only show the form if not already submitted successfully -->

                {#if form?.error}
                    <div class="alert alert-error">⚠️ {form.error}</div>
                {/if}

                <form method="POST" use:enhance={() => {
                    submitting = true;
                    return async ({ update }) => {
                        await update();
                        submitting = false;
                    };
                }}>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your full name"
                                value={form?.values?.name ?? lastContact?.name ?? ''}
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="your@email.com"
                                value={form?.values?.email ?? lastContact?.email ?? ''}
                                required
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="phone">Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+353 01 234 567"
                                value={form?.values?.phone ?? ''}
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="date">Preferred Date *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                min={minDate}
                                value={form?.values?.date ?? ''}
                                required
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="service">Service Required *</label>
                        <select id="service" name="service" required>
                            <option value="">— Select a service —</option>

                            <!--
                                Loop through services from JSON to build the dropdown.
                                The 'selected' check pre-selects the right option
                                if the user came from a service page.
                            -->
                            {#each services as s}
                                <option
                                    value={s.slug}
                                    selected={(form?.values?.service ?? preselected) === s.slug}
                                >
                                    {s.icon} {s.title} — {s.price}
                                </option>
                            {/each}

                            <option value="multiple">Multiple Services</option>
                            <option value="not-sure">Not Sure — Need Advice</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="notes">Additional Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            placeholder="Tell us about your garden — size, access, any specific requirements..."
                        >{form?.values?.notes ?? ''}</textarea>
                    </div>

                    <button type="submit" class="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Request a Visit 📅'}
                    </button>

                </form>
            {/if}
        </div>

        <!-- RIGHT: Information sidebar -->
        <aside class="booking-sidebar">

            <div class="info-card">
                <h3>What to Expect</h3>
                <div class="steps">

                    <div class="step">
                        <span class="step-dot">1</span>
                        <div>
                            <strong>Submit your request</strong>
                            <p>Fill in the form with your details and preferred date.</p>
                        </div>
                    </div>

                    <div class="step">
                        <span class="step-dot">2</span>
                        <div>
                            <strong>We confirm</strong>
                            <p>We email you within one business day to confirm the visit.</p>
                        </div>
                    </div>

                    <div class="step">
                        <span class="step-dot">3</span>
                        <div>
                            <strong>Free site visit</strong>
                            <p>We visit your garden and give a free written quote.</p>
                        </div>
                    </div>

                    <div class="step">
                        <span class="step-dot">4</span>
                        <div>
                            <strong>You decide</strong>
                            <p>No obligation — accept the quote if you are happy to proceed.</p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Quick service prices from JSON data -->
            <div class="info-card" style="margin-top: 1.25rem;">
                <h3>Our Services</h3>
                {#each services as s}
                    <div class="service-row">
                        <span>{s.icon}</span>
                        <div>
                            <strong>{s.title}</strong>
                            <span class="price">{s.price}</span>
                        </div>
                    </div>
                {/each}
            </div>

        </aside>
    </div>
</section>

<style>
    .booking-layout {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 4rem;
        align-items: start;
    }

    .form-wrapper h2 { margin-bottom: 0.5rem; }
    .intro-text { color: var(--text-light); margin-bottom: 1.5rem; }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    /* Cookie welcome notice */
    .cookie-notice {
        background: var(--earth-pale);
        border-left: 4px solid var(--earth-light);
        padding: 0.85rem 1.25rem;
        border-radius: var(--radius-md);
        font-size: 0.9rem;
        color: var(--earth-dark);
        margin-bottom: 1.5rem;
    }

    /* Sidebar */
    .info-card {
        background: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 1.75rem;
    }

    .info-card h3 { margin-bottom: 1.25rem; }

    .steps { display: flex; flex-direction: column; gap: 1.25rem; }

    .step {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }

    .step-dot {
        width: 28px;
        height: 28px;
        background: var(--green-mid);
        color: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 700;
        flex-shrink: 0;
    }

    .step strong { display: block; color: var(--green-dark); font-size: 0.9rem; }
    .step p { font-size: 0.85rem; color: var(--text-light); margin: 0.1rem 0 0; }

    /* Service price rows */
    .service-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.6rem 0;
        border-bottom: 1px solid var(--green-pale);
        font-size: 1.2rem;
    }

    .service-row:last-child { border-bottom: none; }

    .service-row strong {
        display: block;
        font-size: 0.88rem;
        color: var(--green-dark);
    }

    .price {
        font-size: 0.8rem;
        color: var(--green-mid);
        font-weight: 700;
    }

    @media (max-width: 900px) {
        .booking-layout { grid-template-columns: 1fr; }
    }

    @media (max-width: 560px) {
        .form-row { grid-template-columns: 1fr; }
    }
</style>