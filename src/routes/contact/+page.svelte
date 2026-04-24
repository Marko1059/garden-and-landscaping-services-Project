<script>
    // ============================================================
    // src/routes/contact/+page.svelte
    //
    // The contact page with a form.
    // When the form is submitted, +page.server.js handles it.
    // The result comes back here in the 'form' prop.
    // ============================================================

    // 'enhance' makes the form submit without a full page reload
    import { enhance } from '$app/forms';

    // 'form' contains the result from +page.server.js after submission
    // It will have form.success or form.error depending on what happened
    export let form;

    // Track whether the form is currently being submitted
    let submitting = false;
</script>

<svelte:head>
    <title>Contact Us — GreenScape Garden Services</title>
    <meta name="description" content="Get in touch with GreenScape for a free garden quote." />
</svelte:head>

<!-- Green hero banner -->
<div class="page-hero">
    <div class="container">
        <h1>Contact Us</h1>
        <p>Have a question or want a free quote? We would love to hear from you.</p>
    </div>
</div>

<section class="section">
    <div class="container contact-layout">

        <!-- LEFT: The contact form -->
        <div class="form-wrapper">
            <h2>Send Us a Message</h2>
            <p class="intro-text">Fill in the form and we will get back to you within one business day.</p>

            <!--
                Show a success message if the form was submitted successfully.
                form?.success checks if 'form' exists AND has a 'success' property.
            -->
            {#if form?.success}
                <div class="alert alert-success">
                    ✅ {form.message}
                </div>
            {/if}

            <!-- Show an error message if something went wrong -->
            {#if form?.error}
                <div class="alert alert-error">
                    ⚠️ {form.error}
                </div>
            {/if}

            <!--
                method="POST" sends the form data to +page.server.js
                use:enhance makes it work without full page reload
            -->
            <form method="POST" use:enhance={() => {
                submitting = true;
                return async ({ update }) => {
                    await update();
                    submitting = false;
                };
            }}>

                <!-- Two fields side by side -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={form?.values?.name ?? ''}
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
                            value={form?.values?.email ?? ''}
                            required
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+353 01 234 567"
                            value={form?.values?.phone ?? ''}
                        />
                    </div>
                    <div class="form-group">
                        <label for="service">Service Interested In</label>
                        <select id="service" name="service">
                            <option value="">— Select a service —</option>
                            <option value="grass-cutting">Grass Cutting</option>
                            <option value="hedge-cutting">Hedge Cutting</option>
                            <option value="weeding">Weeding</option>
                            <option value="design-and-planting">Design and Planting</option>
                            <option value="other">Other / Not Sure</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="message">Your Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your garden, what you need, or any questions you have..."
                        required
                    >{form?.values?.message ?? ''}</textarea>
                </div>

                <!-- Submit button - shows "Sending..." while the form is submitting -->
                <button type="submit" class="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message 📨'}
                </button>

            </form>
        </div>

        <!-- RIGHT: Contact info sidebar -->
        <aside class="contact-sidebar">

            <div class="info-card">
                <h3>Get in Touch</h3>

                <div class="info-row">
                    <span>📞</span>
                    <div>
                        <strong>Phone</strong>
                        <p>+353 01 234 567</p>
                    </div>
                </div>

                <div class="info-row">
                    <span>✉️</span>
                    <div>
                        <strong>Email</strong>
                        <p>info@greenscape.ie</p>
                    </div>
                </div>

                <div class="info-row">
                    <span>📍</span>
                    <div>
                        <strong>Location</strong>
                        <p>Dublin, Ireland<br>All surrounding areas covered</p>
                    </div>
                </div>

                <div class="info-row">
                    <span>🕐</span>
                    <div>
                        <strong>Opening Hours</strong>
                        <p>Mon–Fri: 8am – 6pm<br>Saturday: 9am – 4pm<br>Sunday: Closed</p>
                    </div>
                </div>
            </div>

            <div class="quick-book">
                <h3>Want to Book Directly?</h3>
                <p>Use our booking form for a faster response.</p>
                <a href="/booking" class="btn btn-primary" style="display: block; text-align: center; margin-top: 1rem;">
                    Book a Visit
                </a>
            </div>

        </aside>
    </div>
</section>

<style>
    /* Two column layout: form on left, info on right */
    .contact-layout {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 4rem;
        align-items: start;
    }

    .form-wrapper h2   { margin-bottom: 0.5rem; }
    .intro-text        { color: var(--text-light); margin-bottom: 2rem; }

    /* Two inputs side by side */
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    /* Contact info sidebar */
    .info-card {
        background: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 2rem;
        margin-bottom: 1.5rem;
    }

    .info-card h3 { margin-bottom: 1.5rem; }

    .info-row {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1.25rem;
        font-size: 1.3rem;
    }

    .info-row strong {
        display: block;
        color: var(--green-dark);
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
    }

    .info-row p {
        color: var(--text-mid);
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.5;
    }

    /* Quick book box */
    .quick-book {
        background: var(--green-pale);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
    }

    .quick-book h3 { margin-bottom: 0.5rem; font-size: 1.1rem; }
    .quick-book p  { font-size: 0.9rem; color: var(--text-light); }

    /* Stack on mobile */
    @media (max-width: 900px) {
        .contact-layout { grid-template-columns: 1fr; }
    }

    @media (max-width: 560px) {
        .form-row { grid-template-columns: 1fr; }
    }
</style>