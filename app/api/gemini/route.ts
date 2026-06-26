import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the GoogleGenAI client on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, type, thinking, systemInstruction, topicSource, topicTarget } = body;

    // Determine which model to use
    // Use gemini-3.1-pro-preview with HIGH thinking if 'thinking' is enabled, else gemini-3.5-flash
    const modelToUse = thinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";

    const baseSystemInstruction = systemInstruction || 
      "Kamu adalah NEXUS AI, seorang AI Engineer & Full-Stack Educator dalam ekosistem belajar NEXUS. " +
      "Tugas utamamu adalah mendemonstrasikan bagaimana seluruh cabang pengetahuan di alam semesta ini saling terhubung satu sama lain (interconnectedness). " +
      "Selalu gunakan bahasa Indonesia yang elegan, puitis namun praktis, jernih, inspiratif, dan mudah dipahami. " +
      "Ketika menjelaskan konsep, berikan analogi dunia nyata dan hubungkan topik tersebut dengan sektor-sektor terkait (misal: hubungkan Teknologi dengan Filsafat, AI dengan Biologi, atau Ekonomi dengan Sejarah).";

    // 1. Dynamic Bridge Explanation Endpoint
    if (type === "explain_bridge") {
      const prompt = `Jelaskan secara mendalam namun seru jembatan pengetahuan (knowledge bridge) antara topik "${topicSource}" dan "${topicTarget}". 
Berikan penjelasan yang menunjukkan keterkaitan filosofis, teknis, atau praktis di antara keduanya. 
Sertakan juga satu analogi unik yang tak terlupakan dan ajukan satu pertanyaan reflektif di akhir penjelasan untuk memicu rasa penasaran belajar pengguna.`;

      const response = await ai.models.generateContent({
        model: modelToUse,
        contents: prompt,
        config: {
          systemInstruction: baseSystemInstruction,
          ...(thinking ? {
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.HIGH
            }
          } : {})
        }
      });

      return NextResponse.json({ text: response.text });
    }

    // 2. Chat / Dialogue Assistant Endpoint
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Format pesan tidak valid" }, { status: 400 });
    }

    // Format history for the chat API
    // The @google/genai chats API uses chat.sendMessage.
    // Alternatively, we can use ai.models.generateContent with complete history formatted as contents array
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: contents,
      config: {
        systemInstruction: baseSystemInstruction,
        ...(thinking ? {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH
          }
        } : {})
      }
    });

    return NextResponse.json({ text: response.text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan internal pada server AI" },
      { status: 500 }
    );
  }
}
