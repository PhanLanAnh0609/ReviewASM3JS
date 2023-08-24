'use strict'

// khai báo phần tử nội dung tin tức
const newsContainer = document.getElementById('news-container');

// khai báo thành phần của phân trang
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

// kiểm tra người dùng chưa đăng nhập
if(!currentUser) {
    alert(`Vui lòng đăng nhập!`);
    // chuyển hướng đến trang đăng nhập
    window.location.href = '../pages/login.html';
}

// khai báo các yếu tố
let pageSize = currentUser.pageSize,
    currentPage = 1,
    category = currentUser.category,
    totalResults,
    country = 'us';

// hàm lấy dữ liệu từ API
async function getNewsData() {
    try {
        // lấy ra dữ liệu
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${currentPage}&apiKey=2b32d36ed64f428db8d902abee85a6de`);
        // đưa dữ liệu về định dạng json
        const data = await res.json();
        // tổng số lượng bài viết trong API phù hợp
        totalResults = data.totalResults;
        // xóa giao diện tin tức trước đó
        newsContainer.innerHTML ='';
        // kiểm tra dữ liệu bài tin tức
        if(!data || data.status !== 'ok') {
            // đưa ra thông tin để hiểu rằng dữ liệu không tồn tại 
            newsContainer.innerHTML =`Load dữ liệu tin tức không thành công`;
            return;
        };
        // khai báo danh sách các bài tin tức
        const articles = data.articles;

        // hiển thị bài tin tức trong danh sách bài tin tức theo giao diện 
        for(const article of articles) {
            // thiết lập giao diện hiển thị cho từng bài viết
            newsContainer.innerHTML += `
            <div class="card border-light flex-row flex-wrap">
                <div class="card mb-3" style="">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src=${article.urlToImage !== null ? article.urlToImage : '../img/no-img.jpg'} class="card-img" alt="no-image"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description !== null ? article.description : ''}</p>
                                <a href="${article.url}" class="btn btn-primary"> View </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        };

        // hiển thị trang hiện tại
        pageNum.innerText = currentPage;
        // thiết lập kiểu của nút prev trong phân trang
        btnPrev.style.display = currentPage === 1 ? 'none' : 'block';
        // khai báo số trang tối đa
        const maxPage = Math.ceil(totalResults/pageSize);
        // thiết lập kiểu của nút next trong phân trang
        btnNext.style.display = currentPage === maxPage || totalResults === 0 ? 'none' : 'block';
    } catch(err) {
        console.error(err);
    }

};

// load tin tức và hiển thị ra màn hình
window.onload = async function() {
    await getNewsData();
};

// tạo sự kiện khi nhấn vào nút Prev
btnPrev.addEventListener('click', async function() {
    if(currentPage > 1) {
        currentPage--;
        await getNewsData();
    };
});

// tạo sự kiện khi nhấn vào nút Next
btnNext.addEventListener('click', async function() {
    const maxPage = Math.ceil(totalResults/pageSize);
    if(currentPage < maxPage) {
        currentPage++;
        await getNewsData();
    };
});
