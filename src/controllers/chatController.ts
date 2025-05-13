import { BotService } from '../services/botService';

class ChatController {
    private botService: BotService;

    constructor() {
        this.botService = new BotService();
    }

    async handleUserMessage(message: string, returnResponse = false) {
        const response = await this.botService.getResponse(message);
        if (returnResponse) {
            return typeof response === "string" ? response : JSON.stringify(response);
        }
        console.log(`WolfieWTF: ${response}`);
    }
}

export default ChatController;