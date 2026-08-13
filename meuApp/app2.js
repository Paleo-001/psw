const http = require('http');
http.get('http://example.com', (res) => {
    let data = '';
    res.on('data', (chunck) => {
        data += chunck;
    });
    res.on('end', () => {
        console.log(data);
    })
});