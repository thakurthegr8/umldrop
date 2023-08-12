import { Redis } from "@upstash/redis";

const cache = new Redis({
  url: process.env.CACHE_URL,
  token: process.env.CACHE_ACCESS_TOKEN,
});

export default cache;