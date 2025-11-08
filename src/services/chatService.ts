import { SENDER_TYPE, type Message } from "@/types/Message";

export async function sendMessageToAIStreamed(
  userMessage: string,
  onChunk: (chunk: string) => void,
): Promise<Message> {
  const responses = [
    "That's a fascinating perspective! I think you're onto something really important here. This kind of approach could revolutionize how we think about problem-solving in complex systems.",
    "I completely agree with your analysis. The way you've broken down this concept shows a deep understanding of the underlying principles. Let me elaborate on why this matters so much in the broader context.",
    "You've raised an excellent question that gets to the heart of the matter. This is exactly the kind of critical thinking we need more of. Your observation about the interconnected nature of these systems is particularly insightful.",
    "What you're describing reminds me of some groundbreaking research I've come across recently. The implications of this approach could extend far beyond what we initially imagined, potentially transforming entire industries.",
    "I find your reasoning quite compelling, and it aligns perfectly with some emerging trends I've been analyzing. The data suggests that this methodology could yield significant improvements in efficiency and outcomes.",
    "Your insight touches on a fundamental principle that many people overlook. This holistic approach you're suggesting could address multiple challenges simultaneously, which is exactly what we need in today's complex environment.",
  ];
  const text = responses[Math.floor(Math.random() * responses.length)] || "I don't have a response for that.";

  // streaming simulation
  const words = text.split(" ");
  await words.reduce(async (previousPromise, word) => {
    await previousPromise;
    await new Promise((res) => setTimeout(res, 150));
    onChunk(word + " ");
  }, Promise.resolve());

  return {
    id: crypto.randomUUID(),
    sender: SENDER_TYPE.AI,
    text,
    timestamp: Date.now(),
  };
}
