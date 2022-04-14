var apiKey = '9519cf41356470a94e21e9002ac5a5c2'

function start() {    
    getNews(renderNews);
};
//Function 

function getNews(callback) {
    var path = 'https://gnews.io/api/v4/top-headlines?&token='
    fetch(path + apiKey + "&lang=en")
    .then(function (response) {
        return response.json();
    })
    .then(callback);
}

function renderNews(news) {
    var listTopNews = document.querySelector('#top-headline');
    
    var htmls = news.articles.map(function(data) {
        return `
        <div class="row border">
        <div class="col-md-4">
        <img src="${data.image}" alt="img-news">
        </div>
        <div class="col-md-8">
        <a href="${data.url}"><h3 class="heading">${data.title}</h3></a>
        <em class="data">${data.publishedAt}</em><br>
        <p class="content">${data.content}</p>
        </div>
        </div>
        `;
    });
    
    listTopNews.innerHTML = htmls.join('');
    // ẩn phần loading
    $('.loading').hide();
}



//Jquery
/***
 * Xét điều kiện tìm kiếm 
 * 1. tìm bằng keyword
 * 3. tìm bằng keyword và từ ngày "From" đến "To"
 * 2. tìm bằng keyword và ngày(chỉ nhập ngày từ "From" hoặc "To")
*/
$(document).ready(function() {
    $('.submit').click(function() {
        var key = $('#input-key').val(); 
        var from = $('#from').val(); // có kiểu dữ liệu 2021-10-05T22:13
        var to = $('#to').val();
        
        if(key.length > 0 && from.length == 0 && to.length == 0) {
            fetch(`https://gnews.io/api/v4/search?q=${key}&token=${apiKey}&lang=en`)
            .then(function (response) {
                // chuyển chuỗi nhận được thành json
                return response.json();
            })
            .then(function(datas) {
                // chèn thông tin nhận được vào thẻ DIV
                var listSearch = document.querySelector('#top-headline');
                var htmls = datas.articles.map(function(data) {
                    return `
                    <div class="row border">
                    <div class="col-md-4">
                    <img src="${data.image}" alt="img-news">
                    </div>
                    <div class="col-md-8">
                    <a href="${data.url}"><h3 class="heading">${data.title}</h3></a>
                    <em class="data">${data.publishedAt}</em>
                    <p class="content">${data.content}</p>
                    </div>
                    </div>
                    `;
                });
                
                listSearch.innerHTML = htmls.join('');
                
            });
        } else if(key.length > 0 && (from.length > 0 || to.length > 0)) {
            if(from.length > 0) {
                // 2021-10-05T22:13:00.000Z
                var dateFrom = new Date(from).toISOString();
                
                // 2021-10-05T22:13:00Z
                dateFrom = dateFrom.substr(0, 19) + 'Z';
                //fetch(`https://gnews.io/api/v4/search?q=iphone
                //&token=e230f8baacfe102b7e20bf6972611a7c&lang=en
                //&from=2021-10-05T22:13:00Z`)
                fetch(`https://gnews.io/api/v4/search?q=${key}&token=${apiKey}&lang=en&from=${dateFrom}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function(datas) {
                    var listSearch = document.querySelector('#top-headline');
                    var htmls = datas.articles.map(function(data) {
                        return `
                        <div class="row border">
                        <div class="col-md-4">
                        <img src="${data.image}" alt="img-news">
                        </div>
                        <div class="col-md-8">
                        <a href="${data.url}"><h3 class="heading">${data.title}</h3></a>
                        <em class="data">${data.publishedAt}</em>
                        <p class="content">${data.content}</p>
                        </div>
                        </div>
                        `;
                    });
                    
                    listSearch.innerHTML = htmls.join('');
                    
                });
            }
            if(to.length > 0) {
                var dateTo = new Date(to).toISOString();
                
                dateTo = dateTo.substr(0, 19) + 'Z';
                //fetch(`https://gnews.io/api/v4/search?q=iphone
                //&token=e230f8baacfe102b7e20bf6972611a7c&lang=en
                //&from=2021-10-05T22:13:00Z`)
                fetch(`https://gnews.io/api/v4/search?q=${key}&token=${apiKey}&lang=en&to=${dateTo}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function(datas) {
                    var listSearch = document.querySelector('#top-headline');
                    var htmls = datas.articles.map(function(data) {
                        return `
                        <div class="row border">
                        <div class="col-md-4">
                        <img src="${data.image}" alt="img-news">
                        </div>
                        <div class="col-md-8">
                        <a href="${data.url}"><h3 class="heading">${data.title}</h3></a>
                        <em class="data">${data.publishedAt}</em>
                        <p class="content">${data.content}</p>
                        </div>
                        </div>
                        `;
                    });
                    
                    listSearch.innerHTML = htmls.join('');
                    
                });
            }
            
        } else {
            var dateFrom = new Date(from).toISOString();
            var dateTo = new Date(to).toISOString();
            
            dateFrom = dateFrom.substr(0, 19) + 'Z';
            dateTo = dateTo.substr(0, 19) + 'Z';
            //fetch(`https://gnews.io/api/v4/search?q=iphone
            //&token=e230f8baacfe102b7e20bf6972611a7c&lang=en
            //&from=2021-10-05T22:13:00Z&to=2021-10-05T22:13:00Z`)
            fetch(`https://gnews.io/api/v4/search?q=${key}&token=${apiKey}&lang=en&from=${dateFrom}&to=${dateTo}`)
            .then(function (response) {
                return response.json();
            })
            .then(function(datas) {
                var listSearch = document.querySelector('#top-headline');
                var htmls = datas.articles.map(function(data) {
                    return `
                    <div class="row border">
                    <div class="col-md-4">
                    <img src="${data.image}" alt="img-news">
                    </div>
                    <div class="col-md-8">
                    <a href="${data.url}"><h3 class="heading">${data.title}</h3></a>
                    <em class="data">${data.publishedAt}</em>
                    <p class="content">${data.content}</p>
                    </div>
                    </div>
                    `;
                });
                
                listSearch.innerHTML = htmls.join('');
                
            });
        }
        
        // xóa dữ liệu nhập
        $('#input-key').val('');
        $('#from').val('');
        $('#to').val('');
    });
});
