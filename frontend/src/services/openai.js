import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getChatReply(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return response.choices[0].message.content;
}
