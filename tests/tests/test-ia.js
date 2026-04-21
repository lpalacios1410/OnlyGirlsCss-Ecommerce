process.loadEnvFile();
import { test } from 'node:test';
import assert from 'node:assert'
import { Stagehand } from '@browserbasehq/stagehand';
import { google } from '@ai-sdk/google';

console.log(process.env.GEMINI_API_KEY, "GEMINI KEY")

// console.log(process.env.GEMINI_API_KEY)
test('Test Gemini API', async () => {
    const stagehand = new Stagehand({
        env: "LOCAL",
        apiKey: process.env.GEMINI_API_KEY,
        modelName: "gemini-1.5-flash",
        modelProvider: "google",
        llmClient: google("gemini-1.5-flash")
    })

    await stagehand.init();

    const [page] = stagehand.context.pages()

    await page.goto('http://localhost:5173/')

    await stagehand.act('Clicar en el boton de "Tienda"')

    await stagehand.close()
})