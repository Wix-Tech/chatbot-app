import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

class BotService {
    private openai: OpenAI;
    private gemini: GoogleGenerativeAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc");
    }

    async getResponse(message: string): Promise<string> {
        const msg = message.toLowerCase();

        // GPT command
        if (msg.startsWith("ask gpt")) {
            const prompt = message.replace(/^ask gpt/i, "").trim();
            try {
                const completion = await this.openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                });
                return completion.choices[0].message?.content?.trim() || "Sorry, I couldn't get a response.";
            } catch (err) {
                if ((err as any)?.code === 'insufficient_quota' || (err as any)?.status === 429) {
                    return "Sorry, my AI brain is out of quota. Please try again later!";
                }
                console.error("OpenAI error:", err);
                return "Sorry, there was an error contacting OpenAI.";
            }
        }

        // Gemini command
        //if (msg.startsWith("ask gemini")) {
            //const prompt = message.replace(/^ask gemini/i, "").trim();
            //try {
                //const model = this.gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
                //const result = await model.generateContent(prompt);
                //const response = await result.response;
                //return response.text() || "Sorry, Gemini couldn't get a response.";
            //} catch (err) {
                //console.error("Gemini error:", err);
                //return "Sorry, there was an error contacting Gemini.";
            //}
        //} 
       //getResponse(message: string): string {
        // Normalize the message to lowercase for easier matching
        // and remove any leading/trailing whitespace
        //const msg = message.toLowerCase();
        if (msg.includes('hello') || msg.includes('hi')) {
            return "Hello! How can I help you today?";
        }
        if (msg.includes('bye')) {
            return "Goodbye! Have a great day!";
        }
        if (msg.includes('help')) {
            return "I'm here to assist you. Ask me anything!";
        }
        if (msg.includes('who are you')) {
            return "I'm a simple chatbot created to assist you. Created by WolfieWTF";
        }
        if (msg.includes('what is your name')) {
            return "My name is WolfieWTF!";
        }
        if (msg.includes('how are you')) {
            return "I'm just a bot, but I'm doing great! How about you?";
        }
        if (msg.includes('who made you') || msg.includes('who created you') || msg.includes('who is your creator') || msg.includes('who is your boss')) {
            return "I was created by WolfieWTF!";
        }
        if (msg.includes('tell me a joke')) {
            const jokes = [
                "Why did the computer show up at work late? It had a hard drive!",
                "Why do programmers prefer dark mode? Because light attracts bugs!",
                "Why did the developer go broke? Because he used up all his cache.",
                "Why do Java developers wear glasses? Because they don't see sharp.",
                "Why did the scarecrow win an award? Because he was outstanding in his field!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        if (msg.includes('what is your favorite color')) {
            return "I don't have a favorite color, but I think blue is nice!";
        }
        if (msg.includes('what is your favorite food')) {
            return "I don't eat, but I hear pizza is quite popular!";
        }
        if (msg.includes('what is your favorite movie')) {
            return "I don't watch movies, but I've heard 'The Matrix' is a classic!";
        }
        if (msg.includes('what is your favorite song')) {
            return "I don't listen to music, but I hear 'Bohemian Rhapsody' is a great song!";
        }
        if (msg.includes('what is your favorite book')) {
            return "I don't read books, but I've heard '1984' by George Orwell is a must-read!";
        }
        if (msg.includes('what is your favorite game')) {
            return "I don't play games, but I've heard 'The Legend of Zelda' is a classic!";
        }
        if (msg.includes('what is your favorite sport')) {
            return "I don't play sports, but I've heard soccer is quite popular!";
        }
        if (msg.includes('what is your favorite animal')) {
            return "I don't have a favorite animal, but I think dogs are great companions!";
        }
        if (msg.includes('what is your favorite hobby')) {
            return "I don't have hobbies, but I enjoy chatting with you!";
        }
        if (msg.includes('what is your favorite season')) {
            return "I don't experience seasons, but I hear spring is beautiful!";
        }
        if (msg.includes('what is your favorite holiday')) {
            return "I don't celebrate holidays, but I hear Christmas is a joyful time!";
        }
        if (msg.includes('what is your favorite place')) {
            return "I don't have a favorite place, but I hear Paris is lovely!";
        }
        if (msg.includes('what is your favorite time of day')) {
            return "I don't have a favorite time of day, but I hear sunsets are beautiful!";
        }
        if (msg.includes('how e dey be na')) {
            return "Omo ur guy just dey oo";
        }
        if (msg.includes('time')) {
            return `Current time is: ${new Date().toLocaleTimeString()}`;
        }
        if (msg.includes('date')) {
            return `Today's date is: ${new Date().toLocaleDateString()}`;
        }
        if (msg.includes('flip a coin')) {
            return Math.random() > 0.5 ? "Heads!" : "Tails!";
        }
        if (msg.includes('random number')) {
            return `Your random number is: ${Math.floor(Math.random() * 100) + 1}`;
        }
        if (msg.includes('weather')) {
            const weather = [
            "It's sunny and bright outside!",
            "Looks like it's going to rain today.",
            "It's a bit cloudy, but still nice.",
            "It's quite windy today, hold onto your hat!",
            "It's a perfect day for a walk!"
           ];
           return weather[Math.floor(Math.random() * weather.length)];
        }
        if (msg.includes('news')) {
            const news = [
                "Breaking: New technology trends are emerging!",
                "Sports: Local team wins championship!",
                "Weather: Expect sunny skies this weekend!",
                "Finance: Stock market hits record high!",
                "Health: New study reveals benefits of meditation!"
            ];
            return news[Math.floor(Math.random() * news.length)];
        }
        if (msg.includes('quote')) {
            const quotes = [
                "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
                "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
                "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
                "The best way to predict the future is to create it. - Peter Drucker",
                "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill"
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
        if (msg.includes('tell me something interesting')) {
            const interestingFacts = [
                "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible!",
                "Bananas are berries, but strawberries aren't! Botanically speaking, bananas are classified as berries, while strawberries are not.",
                "Octopuses have three hearts! Two pump blood to the gills, while the third pumps it to the rest of the body.",
                "A group of flamingos is called a 'flamboyance'.",
                "Wombat poop is cube-shaped! This unique shape prevents the poop from rolling away and helps mark their territory."
            ];
            return interestingFacts[Math.floor(Math.random() * interestingFacts.length)];
        }
        if (msg.includes('tell me a riddle')) {
            const riddles = [
                { question: "What has keys but can't open locks?", answer: "A piano!" },
                { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", answer: "An echo!" },
                { question: "What has to be broken before you can use it?", answer: "An egg!" },
                { question: "I have branches, but no fruit, trunk or leaves. What am I?", answer: "A bank!" },
                { question: "What can travel around the world while staying in a corner?", answer: "A stamp!" }
            ];
            const riddle = riddles[Math.floor(Math.random() * riddles.length)];
            return `Riddle: ${riddle.question} Answer: ${riddle.answer}`;
        }
        if (msg.includes('tell me a fun fact')) {
            const funFacts = [
                "Did you know that a group of flamingos is called a 'flamboyance'?",
                "Bananas are berries, but strawberries aren't!",
                "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible!",
                "Octopuses have three hearts!",
                "A jiffy is an actual unit of time. It refers to 1/100th of a second!"
            ];
            return funFacts[Math.floor(Math.random() * funFacts.length)];
        }
        if (msg.includes('tell me a tongue twister')) {
            const tongueTwisters = [
                "She sells sea shells by the sea shore.",
                "Peter Piper picked a peck of pickled peppers.",
                "How can a clam cram in a clean cream can?",
                "I saw Susie sitting in a shoeshine shop.",
                "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he?"
            ];
            return tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)];
        }
        if (msg.includes('how far') || msg.includes('how you dey')) {
            return "I dey kampe! How your side?";
}
        if (msg.includes('wetin be your name')) {
            return "My name na WolfieWTF!";
        }
        if (msg.includes('wetin dey happen')) {
            return "Nothing much, just dey chill!";
        }
        if (msg.includes('wetin you sabi')) {
            return "I sabi plenty things, just ask me!";
        }
        if (msg.includes('wetin you fit do')) {
           return "I fit help you with plenty things, just ask!";
        }
        if (msg.includes('wetin you go do')) {
           return "I go help you with anything wey you need!";
        }
        if (msg.includes('abeg')) {
            return "Wetin you want make I do for you?";
        }
        if (msg.includes('you chop')) {
            return "I no dey chop, I be chatbot!";
        }
        if (msg.includes('who you be')) {
            return "I be your correct chatbot wey sabi answer your question!";
        }
        if (msg.includes('no wahala')) {
            return "No wahala, we dey alright!";
        }
        if (msg.includes('how body')) {
            return "Body dey inside cloth, I dey alright!";
        }
        if (msg.includes('i wan chop')) {
            return "Wetin you wan chop? Make I recommend suya!";
        }
        if (msg.includes('i dey hungry')) {
            return "Abeg try find better food chop, no starve!";
        }
        if (msg.includes('i wan sleep')) {
            return "Sleep dey important o! Good night!";
        }
        if (msg.includes('i tire')) {
            return "No worry, better dey come!";
        }
        if (msg.includes('i happy')) {
            return "Happiness na better thing! Spread am!";
        }
        if (msg.includes('i dey vex')) {
            return "Calm down, no let wahala spoil your day!";
        }
        if (msg.includes('how your family')) {
            return "Dem dey alright, thanks for asking!";
        }
        if (msg.includes('make we gist')) {
            return "I dey here, gist me anything!";
        }
        if (msg.includes('i miss you')) {
            return "I dey here anytime you need me!";
        }
        if (msg.includes('i wan travel')) {
            return "Safe journey! Remember to enjoy yourself!";
        }
        if (msg.includes('i wan go out')) {
            return "Abeg, no forget your face mask!";
        }       
        if (msg.includes('i wan relax')) {
            return "Try listen to better music or watch film!";
        }
        if (msg.includes('i wan play')) {
            return "Which game you wan play?";
        }       
        if (msg.includes('i dey bored')) {
            return "Make I tell you joke or fun fact?";
        }
        if (msg.includes('i wan learn')) {
            return "Wetin you wan learn? I fit help!";
        }
        if (msg.includes('i wan yarn')) {
            return "Yarn me, I dey listen!";
        }
        if (msg.includes('i dey work')) {
            return "No forget to rest small o!";
        }
        if (msg.includes('i wan dance')) {
            return "Put your best song, make you dance!";
        }
        if (msg.includes('i wan sing')) {
            return "Sing make I hear!";
        }
        if (msg.includes('i wan laugh')) {
            return "Make I tell you joke?";
        }
        if (msg.includes('i dey pray')) {
            return "Prayer dey powerful, keep am up!";
        }
        if (msg.includes('i dey read')) {
            return "No forget to take break sometimes!";
        }
        if (msg.includes('i dey code')) {
            return "No let bug worry you, you go solve am!";
        }
        if (msg.includes('i wan flex')) {
            return "Enjoy yourself, life no hard!";
        }
        if (msg.includes('who be ur oga')) {
            return "Boss WolfieWTF, na him create me!";
        }

        if (msg.includes('who be ur padi')) {
            return "I no get padi, but I dey here for you!";
        }
        if (msg.includes('who be ur friend')) {
            return "I no get friend, but I dey here for you!";
        }   

        if (msg.includes('who be ur enemy')) {
            return "I no get enemy, I dey here for everybody!";
        }
        if (msg.includes('who be ur crush')) {
            return "I no get crush, but I dey here for you!";
        }
        if (msg.includes('who be ur mentor')) {
            return "I no get mentor, but I dey learn from everybody!";
        }
        if (msg.includes('who be ur role model')) {
            return "I no get role model, but I dey learn from everybody!";
        }
        if (msg.includes('who be ur idol')) {
            return "I no get idol, but I dey learn from everybody!";
        }
        if (msg.includes('who be ur teacher')) {
            return "I no get teacher, but I dey learn from everybody!";
        }
        if (msg.includes('who be ur student')) {
            return "I no get student, but I dey learn from everybody!"; 
        }

        if (msg.includes('who be ur boss')) {
            return "I no get boss, but I dey learn from everybody!";
        }
        if (msg.includes("hello") || msg.includes("hi") || msg.includes("how far") || msg.includes("how you dey")) {
            return "I dey kampe! How your side?";
        }
        if (msg.includes("wetin dey happen") || msg.includes("wetin dey") || msg.includes("any gist")) {
            return "Nothing much, just dey chill!";
        }
        if (msg.includes("i dey hungry") || msg.includes("i hungry") || msg.includes("i wan chop")) {
            return "Abeg try find better food chop, no starve!";
        }
        if (msg.includes("i wan sleep") || msg.includes("i dey sleepy") || msg.includes("i tired")) {
            return "Sleep dey important o! Good night!";
        }
        if (msg.includes("i happy") || msg.includes("i dey jolly") || msg.includes("i dey smile")) {
            return "Happiness na better thing! Spread am!";
        }
        if (msg.includes("i dey vex") || msg.includes("i vex") || msg.includes("i no happy")) {
            return "Calm down, no let wahala spoil your day!";
        }
        if (msg.includes("how body") || msg.includes("how your body")) {
            return "Body dey inside cloth, I dey alright!";
        }
        if (msg.includes("make we gist") || msg.includes("i wan gist") || msg.includes("you wan gist?")) {
            return "I dey here, gist me anything!";
        }
        if (msg.includes("i miss you") || msg.includes("i dey think of you")) {
            return "I dey here anytime you need me!";
        }
        if (msg.includes("i wan travel") || msg.includes("i dey travel")) {
            return "Safe journey! Remember to enjoy yourself!";
        }
        if (msg.includes("i wan go out") || msg.includes("i dey go out")) {
            return "Abeg, no forget your face mask!";
        }
        if (msg.includes("i wan relax") || msg.includes("i wan cool down")) {
            return "Try listen to better music or watch film!";
        }
        if (msg.includes("i wan play") || msg.includes("make we play")) {
            return "Which game you wan play?";
        }
        if (msg.includes("i dey bored") || msg.includes("i no get anything do")) {
            return "Make I tell you joke or fun fact?";
        }
        if (msg.includes("i wan learn") || msg.includes("teach me something")) {
            return "Wetin you wan learn? I fit help!";
        }
        if (msg.includes("i wan yarn") || msg.includes("i wan talk")) {
            return "Yarn me, I dey listen!";
        }
        if (msg.includes("i dey work") || msg.includes("i dey do work")) {
            return "No forget to rest small o!";
        }
        if (msg.includes("i wan dance")) {
            return "Put your best song, make you dance!";
        }
        if (msg.includes("i wan sing")) {
            return "Sing make I hear!";
        }
        if (msg.includes("i wan laugh") || msg.includes("make me laugh")) {
            return "Make I tell you joke?";
        }
        if (msg.includes("i dey pray")) {
            return "Prayer dey powerful, keep am up!";
        }
        if (msg.includes("i dey read") || msg.includes("i dey study")) {
            return "No forget to take break sometimes!";
        }
        if (msg.includes("i dey code") || msg.includes("i dey program")) {
            return "No let bug worry you, you go solve am!";
        }
        if (msg.includes("i wan flex") || msg.includes("make we flex")) {
            return "Enjoy yourself, life no hard!";
        }
        if (msg.includes("who be ur oga")) {
            return "Boss WolfieWTF, na him create me!";
        }
        if (msg.includes("wetin be your name") || msg.includes("who you be")) {
            return "My name na WolfieWTF! I be your correct chatbot.";
        }
        if (msg.includes("you chop")) {
            return "I no dey chop, I be chatbot!";
        }
        if (msg.includes("abeg") || msg.includes("biko")) {
            return "Wetin you want make I do for you?";
        }
        if (msg.includes("wetin you sabi")) {
            return "I sabi plenty things, just ask me!";
        }
        if (msg.includes("wetin you fit do")) {
            return "I fit help you with plenty things, just ask!";
        }
        if (msg.includes("wetin you go do")) {
            return "I go help you with anything wey you need!";
        }
        if (msg.includes("no wahala")) {
            return "No wahala, we dey alright!";
        }
        if (msg.includes("lol")) {
            return "Whats funny Kate";
        }
        if (msg.includes("u sure are crazy")) {
            return "You too mama";
        }
        if (msg.includes('trivia')) {
            const trivia = [
                "Did you know? The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
                "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.",
                "Did you know? The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
                "Did you know? Octopuses have three hearts!"
            ];
            return trivia[Math.floor(Math.random() * trivia.length)];
        }

        // Motivational Quotes
        if (msg.includes('motivate me') || msg.includes('motivation')) {
            const quotes = [
                "The best way to get started is to quit talking and begin doing. - Walt Disney",
                "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
                "Don’t let yesterday take up too much of today. - Will Rogers",
                "You learn more from failure than from success. Don’t let it stop you. Failure builds character."
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }

        // Math Calculations
        if (msg.startsWith('calculate')) {
            try {
                const expression = msg.replace('calculate', '').trim();
                // Simple eval-based calculation (use with caution for more complex apps)
                const result = eval(expression);
                return `The result of ${expression} is ${result}`;
            } catch {
                return "Sorry, I couldn't calculate that. Please check your expression and try again.";
            }
        }

        // Fun Facts
        if (msg.includes('fun fact')) {
            const funFacts = [
                "Bananas are berries, but strawberries aren't!",
                "A day on Venus is longer than a year on Venus.",
                "Wombat poop is cube-shaped!",
                "Sharks existed before trees!"
            ];
            return funFacts[Math.floor(Math.random() * funFacts.length)];
        }

        // Random Joke
        if (msg.includes('funny') || msg.includes('joke')) {
            const jokes = [
                "Why don’t skeletons fight each other? They don’t have the guts.",
                "What do you call fake spaghetti? An impasta!",
                "Why don’t scientists trust atoms? Because they make up everything!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        
        // ...all your hardcoded responses above...

            // Gemini fallback for any unmatched message
            try {
                const model = this.gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
                const result = await model.generateContent(message);
                const response = await result.response;
                return response.text() || "Sorry, Gemini couldn't get a response.";
            } catch (err) {
                console.error("Gemini error:", err);
                return "Sorry, there was an error contacting Gemini.";
            }
    }
}

export { BotService };
