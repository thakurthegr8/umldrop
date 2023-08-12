import cache from "@/services/cache";
import puppeteer from "puppeteer";

const questions = async (req, res) => {
  try {
    const cacheRes = await cache.get(req.url);
    if (cacheRes) {
      return res.status(200).json(cacheRes);
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = "https://datalemur.com/questions";
    await page.goto(url);

    const jsonScriptHandle = await page.$("#__NEXT_DATA__");
    const jsonText = await page.evaluate(
      (script) => script.textContent,
      jsonScriptHandle
    );
    const jsonData = JSON.parse(jsonText);

    await browser.close();
    const result = jsonData?.props?.pageProps?.questions;
    await cache.set(req.url, result, { ex: 60000 });
    return res.status(200).json(jsonData?.props?.pageProps?.questions);
  } catch (error) {
    return res.status(400).json("error");
  }
};

export default questions;
