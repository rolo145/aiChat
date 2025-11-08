export const SENDER_TYPE = {
  USER: "user",
  AI: "ai",
};

export type SenderType = (typeof SENDER_TYPE)[keyof typeof SENDER_TYPE];

export interface Message {
  id: string,
  sender: SenderType,
  text: string,
  timestamp: number,
}
