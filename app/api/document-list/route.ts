import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { startCountry, endCountry } = await req.json();

  if (!startCountry || !endCountry) {
    return NextResponse.json({ message: "Please provide start and end country" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string

  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   const prompt = (
    `
    Start country: ${startCountry}, End country: ${endCountry}. For a tourist visa application, 
    list the required documents in one line separated by '||'. For each document, use the format: 
    Document Name [Compulsory] or if an alternative exists, Document Name [Compulsory] → Alternative Document Name [Alternative]. 
    Do not include any extra text."
    `
)

  const response = await model.generateContent(
    prompt
  );

  const textResponse = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  return NextResponse.json({ documents: textResponse });
}
