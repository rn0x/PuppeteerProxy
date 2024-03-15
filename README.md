# Puppeteer Proxy

![Puppeteer Proxy](https://raw.githubusercontent.com/rn0x/PuppeteerProxy/main/puppeteer-proxy.jpg)

Puppeteer Proxy is a lightweight web proxy built with Node.js and Puppeteer and Express, designed to return HTML content from web pages using a headless Chrome browser.

## Features

- Return HTML content of web pages..
- Measure response time for web pages.
- Easy to install and configure.

## Installation

Before running the application, make sure you have Node.js installed on your system. You also need to have Google Chrome or Chromium browser installed.

1. Clone the repository:

```bash
git clone https://github.com/rn0x/PuppeteerProxy.git
```

2. Navigate to the project directory:

```bash
cd PuppeteerProxy
```

3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm start
```

By default, the application runs on port 3000. You can customize the port and other configurations by editing the `config.json` file.

## Usage

To use Puppeteer Proxy, simply send a GET request to `http://localhost:3000/` with a `url` query parameter containing the URL of the web page you want to capture. For example:

```
http://localhost:3000/?url=https://example.com
```

## Support

For any issues or feature requests, please [open an issue](https://github.com/rn0x/PuppeteerProxy/issues) on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Author:** rn0x  
**License:** MIT  
**Repository:** [https://github.com/rn0x/PuppeteerProxy](https://github.com/rn0x/PuppeteerProxy)
