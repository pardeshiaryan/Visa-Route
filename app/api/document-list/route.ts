import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const {  startCountry,
    endCountry,
    passport_type,
    visa_type
  } = await req.json();

  if (!startCountry || !endCountry) {
    return NextResponse.json({ message: "Please provide start and end country" }, { status: 400 });
  } 
 console.log(  startCountry,
  endCountry,
  passport_type,
  visa_type);
  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string

  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   const prompt = (
       `
    Start country: ${startCountry}, End country: ${endCountry}. For a ${visa_type}  application the passport type is ${passport_type}, 
    list the required documents in one line separated by '||'. 
    
    Instead of generic terms like "Address Proof" or "Identity Proof," specify actual document names used in the given country. 
    For example, in India, use "Aadhaar Card" or "Voter ID" instead of "Address Proof." 
    
    For each document, use the format:
    Specific Document Name [Compulsory] 
    or if an alternative exists: 
    Specific Document Name [Compulsory] → Alternative Document Name [Alternative]. 
    
    Do not include any extra text.
    i just need it for knowledge purpose so list any random document if you cant find the exact one
    `
)

  const response = await model.generateContent(
    prompt
  );

  const textResponse = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
console.log(
  textResponse
);
// (response)

  return NextResponse.json({ documents: textResponse });
}

