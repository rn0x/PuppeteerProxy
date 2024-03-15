/*
Author: rn0x
License: MIT
Repository: https://github.com/rn0x/PuppeteerProxy
*/


import express from 'express'
import puppeteer from 'puppeteer'
import replace from 'absolutify'
import compression from 'compression';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const __dirname = path.resolve();
const configPath = path.join(__dirname, 'config.json');
const config = await fs.readJson(configPath).catch(() => ({}));
const port = config?.PORT ? config?.PORT : 3000;
const puppeteerConfig = {
    headless: "new",
    args: [
        '--no-sandbox',// Avoid booting problems on Linux
        '--disable-setuid-sandbox', // Avoid booting problems on Linux
        '--disable-dev-shm-usage', // Avoid booting problems on Linux
        '--disable-gpu',
    ],
    executablePath: config?.CHROMIUM_PATH // '/snap/bin/chromium'
}

// Use compress to compress all responses
app.use(compression({
    level: 6,// compression level (1-9)
    threshold: 1000, // The size of the response required to perform compression (bytes)
    memLevel: 8, // Memory level used for compression (1-9)
}));

app.disable('x-powered-by');  // Information about the web server. It was used because it could be used in simple attacks.
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

console.log("Puppeteer Proxy has started successfully.");
console.log(`The application is now running on port ${port}.`);
console.log("To use the application, visit the following URL:");
console.log(`http://localhost:${port}/?url=INSERT_YOUR_URL_HERE`);
console.log(`For example: http://localhost:${port}/?url=https://example.com`);

app.get('/', async (req, res) => {
    const { url } = req?.query

    if (!url) {
        return res.json({
            url: url,
            error: "Not url provided"
        });
    } else {
        const start = Date.now(); // Record the time when central processing starts
        let browser, page;
        try {
            browser = await puppeteer.launch(puppeteerConfig)
                .catch(e => console.log('Error: browser is not launch ', e));
            page = await browser.newPage();
            await page.goto(`${url}`, { waitUntil: 'networkidle0', timeout: 600000 });

            let document = await page.evaluate(() => document.documentElement.outerHTML)
            document = replace(document, `/?url=${url.split('/')[0]}`);
            await page.setCacheEnabled(true);

            const end = Date.now(); // Record the time after the operations are completed
            const responseTime = end - start; // Calculate the time difference

            return res.json({
                url: url,
                responseTime: responseTime,
                contents: document,
                content_length: document?.length || 0,
            })
        } catch (err) {
            console.log(err)
            return res.json({
                url: url,
                responseTime: responseTime,
                error: err
            });
        } finally {
            if (page) {
                await page.close();
            }
            if (browser) {
                await browser.close();
            }
        }
    }
})


app.listen(port);