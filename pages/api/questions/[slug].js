import axios from 'axios';
import cheerio from 'cheerio';

export default async (req, res) => {
  try {
    const response = await axios.get(`https://datalemur.com/questions/${req.query.slug}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const jsonScript = $('#__NEXT_DATA__').html();
    const jsonData = JSON.parse(jsonScript);

    res.status(200).json(jsonData?.props?.pageProps?.question);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
