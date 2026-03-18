import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const payload = await req.json();
  const { email } = payload.record;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Vinicius <hi@newsletter.vinicius.pm>",
      reply_to: "mail@vinicius.pm",
      to: email,
      subject: "You're in",
      text: `Hey — thanks for signing up for Things I Build.\n\nI'll send you an email every now and then when I have something worth sharing. Projects, ideas, things I'm working on.\n\nThat's it. Talk soon.\n\n— Vinicius`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response(err, { status: res.status });
  }

  return new Response("ok");
});
