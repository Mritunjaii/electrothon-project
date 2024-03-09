import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });







const generate = async (prompt) => {
    // Get your API key from storage
    // const key = await getKey();

    
    const apiUrl = "https://api.openai.com/v1/chat/completions"; // Replace with the appropriate API endpoint for GPT-3.5 Turbo

    // Call completions endpoint
    try {
        const completionResponse = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt } 
            ],
            model: "gpt-3.5-turbo",
        });
        // Select the top choice and send back
        
        return completionResponse.choices[0]["message"]["content"];
    } catch (error) {
        console.log(error);
        return;
    }
};






// ... (existing code)

// Export functions for use in other scripts

// Attach the event listener to the button after the document is loaded

// server.mjs
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());
app.use(express.json());


app.post('/',async (req, res) => {
    
    const aa= await generate(req.body.data);
    const responseData ={
        message:`${aa}`
    };

    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(responseData));
    
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
