import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chat(message) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful cooking assistant. Answer only recipe-related questions.",
      },
      { role: "user", content: message },
    ],
  });

  return completion.choices[0].message.content;
}
