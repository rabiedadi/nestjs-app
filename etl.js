const axios = require('axios');

(async () => {
    try {
        const { data: { token } } = await axios.post('http://localhost:3000/auth/register', { username: 'rabiedadi4', password: 'aaaaaaaa' });
        console.log(token)
        const { data } = await axios.get('http://localhost:3000/auth', { headers: { authorization: `Bearer ${token}` } })
        console.log(data)
    } catch (err) {
        console.log(err.response.data)
    }
})();