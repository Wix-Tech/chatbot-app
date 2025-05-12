export interface UserMessage {
    userId: string;
    content: string;
    timestamp: Date;
}

export interface BotResponse {
    botId: string;
    content: string;
    timestamp: Date;
}