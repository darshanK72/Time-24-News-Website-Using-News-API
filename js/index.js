
fetch('https://newsapi.org/v2/everything?q=business&apiKey=59e191da4ebb413b97d5502fb402a0c6')
    .then((result) => result.json())
    .then (data => {
        console.log(data);

        let mainArticle = data.articles[0];

        let mainBanner = document.querySelector("[main-banner]");

        const dt = new Date(mainArticle.publishedAt);
        console.log(typeof(dt));
 

        mainBanner.innerHTML = `
            <img src="${mainArticle.urlToImage}" alt="Top Trending">
            <div class="content">
                <span class="badge">${mainArticle.author}</span>
                <p class="title">${mainArticle.title}</p>
                <span class="date">${dt.toString().substring(0,15)}</span>
            </div>
        `;

        let miniBanners = document.querySelector("[mini-banners]");

        for(let i = 1; i < 100; i++)
        {
            let miniBannerItem = document.createElement("div");
            miniBannerItem.classList.add("mini-banner-item");

            let article = data.articles[i];
            let dt1 = new Date(article.publishedAt);

            miniBannerItem.innerHTML = `
            <img src="${article.urlToImage}" alt="Top Trending">
            <div class="content">
                <span class="badge">${article.author}</span>
                <p class="title">${article.title}</p>
                <span class="date">${dt1.toString().substring(0,15)}</span>
            </div>
            `;

            miniBanners.appendChild(miniBannerItem);

        }

    });

