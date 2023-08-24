'use strict';
// khai báo phần search
const queryInput = document.getElementById('input-query');
const btnSearch = document.getElementById('btn-submit');
// khai báo phần hiển thị tin tức
const newsContainer = document.getElementById('news-container');
// khai báo phân trang
const navPageNum = document.getElementById('nav-page-num');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
// kiểm tra đăng nhập
if(!currentUser) {
    alert(`Vui lòng đăng nhập`);
    // chuyển hướng đến trang đăng nhập
    window.location.href = '../pages/login.html';
}
// khai báo các yếu tố
let keyWord,
    pageSize = currentUser.pageSize,
    currentPage = 1,
    totalResults;
// ẩn phân trang khi chưa search
navPageNum.style.display = 'none';

// hàm lấy dữ liệu từ API
async function getSearchNewsData(keyWord) {
    try {
        // lấy ra dữ liệu
        const res = await fetch(`https://newsapi.org/v2/everything?q=${keyWord}&pageSize=${pageSize}&page=${currentPage}&apiKey=2b32d36ed64f428db8d902abee85a6de`);
        // đưa về định dạng json
        const data = await res.json();
        // tổng số tin tức phù hợp trong API
        totalResults = data.totalResults;
        // xóa giao diện tin tức trước đó
        newsContainer.innerHTML = '';
        // kiểm tra dữ liệu
        if(!data || data.status !== 'ok') {
            // hiển thị kết quả tìm kiếm
            newsContainer.innerHTML = `Không có kết quả phù hợp`;
            return;
        }
        // khai báo danh sách tin tức phù hợp
        const articles = data.articles;
        // hiển thị từng tin tức
        for(const article of articles) {
            newsContainer.innerHTML += `
            <div class="card flex-row flex-wrap">
                <div class="card mb-3" style="">
                <div class="row no-gutters">
                    <div class="col-md-4">
                    <img
                        src=${article.urlToImage !== null ? article.urlToImage : '../img/no-img.jpg'}
                        class="card-img"
                        alt="no image"
                    />
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">
                        ${article.title}
                        </h5>
                        <p class="card-text">
                        ${article.description !== null ? article.description : ''}
                        </p>
                        <a
                        href="${article.url}"
                        class="btn btn-primary"
                        >View</a
                        >
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `;
        };
        // hiển thị số trang hiện tại
        pageNum.innerText = currentPage;
        // thiết lập giao diện nút Prev
        btnPrev.style.display = currentPage === 1 ? 'none' : 'block';
        // khai báo tổng số trang
        const maxPage = Math.ceil(totalResults/pageSize);
        // thiết lập giao diện nút Next
        btnNext.style.display = currentPage === maxPage || totalResults === 0 ? 'none' : 'block';
    } catch(err) {
        console.error(err);
    };
}
// tạo sự kiện cho nút Search
btnSearch.addEventListener('click', async function() {
    // lấy từ khóa vừa nhập
    keyWord = queryInput.value.trim();
    // kiểm tra từ khóa
    if(keyWord === ''){
        alert(`Hãy nhập từ khóa để tìm kiếm`);
        throw new Error();
    } else {
        // hiển thị ra tin tức phù hợp
        await getSearchNewsData(keyWord);
        // hiển thị phân trang
        navPageNum.style.display = '';
    }
})
// tạo sự kiện cho nút Prev
btnPrev.addEventListener('click', async function() {
    if(currentPage > 1) {
        currentPage--;
        await getSearchNewsData(keyWord);
    };
});
// tạo sự kiện cho nút Next
btnNext.addEventListener('click', async function() {
    const maxPage = Math.ceil(totalResults/pageSize);
    if(currentPage < maxPage) {
        currentPage++;
        await getSearchNewsData(keyWord);
    };
});