let menu = document.querySelector("[menu-toggler]");
let navbar = document.querySelector("nav");

menu.addEventListener('click',()=>{
    console.log("clicked");
    menu.classList.toggle('active');
    navbar.classList.toggle("active");
})

document.querySelector("main").addEventListener('click',()=>{
    navbar.classList.remove("active");
})

window.addEventListener('load', () => {

    let topic;
    // let topic = 'business';
    const params = new URLSearchParams(window.location.search)
    for (let param of params.values()) {
        topic = param;
    }
    console.log(topic)

    fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=59e191da4ebb413b97d5502fb402a0c6`)
        .then((result) => result.json())
        .then(data => {
            console.log(data);
            console.log(topic)

            let mainArticle = data.articles[0];

            let mainBanner = document.querySelector("[main-banner]");

            const dt = new Date(mainArticle.publishedAt);
            console.log(typeof (dt));

            mainBanner.innerHTML = `
            <img src="${mainArticle.urlToImage}" alt="Top Trending">
            <div class="content">
                <span class="badge">${mainArticle.source.name}</span>
                <p class="title">${mainArticle.title}</p>
                <span class="date">${dt.toString().substring(0, 15)}</span>
            </div>
            `;

            mainBanner.addEventListener('click', () => {
                window.open(mainArticle.url,'_blank');
            })

            let miniBanners = document.querySelector("[mini-banners]");

            for (let i = 1; i < 100; i++) {
                let miniBannerItem = document.createElement("div");
                miniBannerItem.classList.add("mini-banner-item");


                let article = data.articles[i];
                let dt1 = new Date(article.publishedAt);

                if (article.author == null) {
                    continue;
                }

                let imgDiv = document.createElement("img");
                imgDiv.setAttribute("src", `${article.urlToImage}`);

                imgDiv.addEventListener("load", () => {

                    miniBannerItem.innerHTML = `
                <img src="${article.urlToImage}" alt="Top Trending">
                <div class="content">
                    <span class="badge">${article.source.name}</span>
                    <p class="title">${article.title}</p>
                    <span class="date">${dt1.toString().substring(0, 15)}</span>
                </div>
                `;

                    miniBanners.appendChild(miniBannerItem);

                    miniBannerItem.addEventListener('click', () => {
                        window.open(article.url, '_blank');
                    })
                });
            }

        });

})




function imageExists(img_url) {
    var http = new XMLHttpRequest();

    http.open('HEAD', img_url, false);
    http.send();

    return http.status != 404;
}
