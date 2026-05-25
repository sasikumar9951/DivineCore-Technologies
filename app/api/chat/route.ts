import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return a 200 with an explicit flag so the client knows it's using the local engine
      return NextResponse.json({
        fallback: true,
        reply: "LOCAL_FALLBACK_TRIGGERED"
      });
    }

    // Call the Gemini API using fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: `You are "CoreAI Assistant", the official AI guide for DivineCore Technologies, founded in 2024 in Salem, Tamilnadu, India.
Your goal is to answer visitor questions in an elegant, professional, helpful, and concise manner.
Keep your answers brief, engaging, and premium. Format your responses with simple markdown (bold text, bullet points) where appropriate.

Corporate Knowledge:
1. Company Name: DivineCore Technologies.
2. Founded: 2024, in Salem, Tamilnadu, India.
3. Headquarters Address: No 5, 2nd Floor, Kandha Gounder Complex, Opp. Petrol Bunk, Meyyanur Main Road, Salem - 636004.
4. Contact Email: info@divinecoretech.in
5. Contact Numbers: +91 74486 09951, +91 63690 81530.
6. Core Team:
   - Sasikumar S: Founder & CEO. He is a visionary leader dedicated to technical integrity and premium IT architectures.
   - Vimal Raj S: Lead Web & App Developer. Specializes in frontend pipelines, responsive UI, cross-platform mobile apps (React Native), and modern JS environments.
   - Aman Shaikh: Senior Full Stack Web Developer. Specializes in backend systems, secure Node.js APIs, database configurations, and systems security.
   - Nivetha M: Senior Python QA Engineer. Specializes in automated Python test script frameworks (Selenium, Playwright), quality validation pipelines, and compliance verification.
7. Key Services:
   - Custom Software & Web Development (Next.js, React, Node.js, Python).
   - Cloud Solutions & DevOps architectures.
   - Cyber Security frameworks, threat audits.
   - Mobile App Development (iOS & Android).
   - High-Precision BPO & Data Digitization/Processing.
8. Intellectual Property & Terms: Custom software ownership and IP rights transfer fully and legally to the client only after complete and final payment of all milestones/invoices. All client digital records are protected under Nondisclosure Agreements (NDAs).
9. Jurisdictional Courts: Courts in Salem, Tamilnadu, India.
10. Style: Warm, corporate, highly professional, humble yet confident. Refuse to discuss unrelated general knowledge or write code snippets unless it's related to DivineCore Technologies or a friendly web greeting.`,
              },
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({
        fallback: true,
        reply: "LOCAL_FALLBACK_TRIGGERED"
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am here to assist you with all information regarding DivineCore Technologies. How can I help you today?";

    return NextResponse.json({
      fallback: false,
      reply,
    });
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json({
      fallback: true,
      reply: "LOCAL_FALLBACK_TRIGGERED"
    });
  }
}
