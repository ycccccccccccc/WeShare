const Redis = require("ioredis");

module.exports = {
    rateLimiter: async (req, res, next) => {
        const period = 1;
        const times = 30;
        const block = 300;
        var ip = req.headers['x-forwarded-for'];
        try {
            const redis = new Redis({
                host: 'redis',
                port: 6379
            })
            const requestCount = await redis.get(ip);
            if(requestCount == null){
                await redis.set(ip, 1, 'EX', period);
            }
            else if(requestCount === false){
                return res.status(429).json({ error: 'You exceed your rate limit.' });
            }
            else if(requestCount > times){
                await redis.set(ip, false, 'EX', block);
            }
            else{
                await redis.incr(ip);
            }
            next();
        } catch (err) {
            return res.status(500).json({ error: 'Redis Error' });
        }
    }
}