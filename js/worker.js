export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Only allow requests to /api/contact
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") {
      return new Response("Not found", { status: 404 });
    }

    try {
      // Parse form data
      const data = await request.json();

      // Validate required fields
      if (!data.name || !data.email || !data.project) {
        return new Response(
          JSON.stringify({
            error: "Hiányzó kötelező mezők",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return new Response(
          JSON.stringify({
            error: "Érvénytelen email cím",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Turnstile verification
      if (!data.turnstileToken) {
        return new Response(
          JSON.stringify({
            error: "Hiányzó captcha token",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Verify Turnstile token
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${data.turnstileToken}`,
        }
      );

      const turnstileResult = await turnstileResponse.json();
      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({
            error: "Captcha érvényesítés sikertelen",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Format timestamp for Hungarian locale
      const timestamp = new Date(data.timestamp).toLocaleString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Admin email content
      const adminEmailHtml = `
        <h2>Új ajánlatkérés érkezett</h2>
        <p><strong>Név:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone || "Nem adott meg"}</p>
        <p><strong>Projekt leírása:</strong></p>
        <p>${data.project.replace(/\n/g, "<br>")}</p>
        <p><strong>Beküldés időpontja:</strong> ${timestamp}</p>
      `;

      // Customer email content (you'll replace this with your Brevo template HTML)
      const customerEmailHtml = `
        <h2>Köszönjük megkeresését!</h2>
        <p>Kedves ${data.name}!</p>
        <p>Köszönjük, hogy felkereste a PixelCraft-ot. Üzenetét megkaptuk és hamarosan felvesszük Önnel a kapcsolatot.</p>
        <p>Az Ön által megadott adatok:</p>
        <ul>
          <li><strong>Név:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Telefon:</strong> ${data.phone || "Nem adott meg"}</li>
        </ul>
        <p>Projekt leírása:</p>
        <p>${data.project.replace(/\n/g, "<br>")}</p>
        <p>Üdvözlettel,<br>PixelCraft csapat</p>
      `;

      // Send admin notification email
      const adminEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "info@pixelcraft.hu",
          to: ["info@pixelcraft.hu"],
          subject: `Új ajánlatkérés - ${data.name}`,
          html: adminEmailHtml,
        }),
      });

      // Send customer confirmation email
      const customerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "PixelCraft <info@pixelcraft.hu>",
          to: [data.email],
          subject: "Köszönjük megkeresésed - PixelCraft",
          html: customerEmailHtml,
          text: "Kollégáink hamarosan megkeresnek a megadott elérhetőségeiden",
        }),
      });

      // Check if emails were sent successfully
      if (!adminEmailResponse.ok) {
        //console.error("Admin email failed:", await adminEmailResponse.text());
        throw new Error("Admin email küldése sikertelen");
      }

      if (!customerEmailResponse.ok) {
        //console.error("Customer email failed:", await customerEmailResponse.text());
        throw new Error("Ügyfél email küldése sikertelen");
      }

      // Return success response
      return new Response(
        JSON.stringify({
          success: true,
          message: "Emailek sikeresen elküldve",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    } catch (error) {
      //console.error("Error processing form:", error);

      return new Response(
        JSON.stringify({
          error: "Szerver hiba történt",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
