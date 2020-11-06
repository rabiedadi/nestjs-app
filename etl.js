/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

(async () => {
    try {
        const { data: { token } } = await axios.post(
            'http://localhost:3000/api/auth/login',
            { username: 'rabiedadi8', password: 'aaaaaaaa', seller: true }
        );
        const { data } = await axios.get('http://localhost:3000/auth', { headers: { authorization: `Bearer ${token}` } })
        console.log(data)
    } catch (err) {
        console.log(err.response.data)
    }
})();