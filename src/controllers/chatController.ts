import { BotService } from '../services/botService';

class ChatController {
    private botService: BotService;

    constructor() {
        this.botService = new BotService();
    }

    handleUserMessage(message: string, returnResponse = false) {
        const response = this.botService.getResponse(message);
        if (returnResponse) {
            return response;
        }
        console.log(`WolfieWTF: ${response}`);
    }
}

export default ChatController;