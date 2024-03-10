import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });







const generate = async (prompt) => {
    
    const apiUrl = "https://api.openai.com/v1/chat/completions"; 
    try {
        const completionResponse = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt } 
            ],
            model: "gpt-3.5-turbo",
        });
        
        return completionResponse.choices[0]["message"]["content"];
    } catch (error) {
        console.log(error);
        return;
    }
};





import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

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
