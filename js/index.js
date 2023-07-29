fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=59e191da4ebb413b97d5502fb402a0c6')
    .then((result) => result.json())
    .then (data => console.log(data));