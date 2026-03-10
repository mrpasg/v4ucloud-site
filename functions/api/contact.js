export async function onRequestPost(context) {

    try {

        const data = await context.request.json();

        if (!data.name || !data.email || !data.message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const message = `
New message from v4ucloud.com

Name:    ${data.name}
Email:   ${data.email}

Message:
${data.message}
    `.trim();

        const mailRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: "info@v4ucloud.com" }]
                    }
                ],
                from: {
                    email: "noreply@v4ucloud.com",
                    name: "V4U Cloud Website"
                },
                reply_to: {
                    email: data.email,
                    name: data.name
                },
                subject: "New Contact Message – V4U Cloud",
                content: [
                    {
                        type: "text/plain",
                        value: message
                    }
                ]
            })
        });

        if (!mailRes.ok) {
            const errText = await mailRes.text();
            console.error("MailChannels error:", errText);
            return new Response(
                JSON.stringify({ error: "Failed to send email" }),
                { status: 502, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        console.error("Contact function error:", err);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

}