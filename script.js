// 산림목재 웹사이트 JavaScript

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCopyAddress();
    initNavigationButtons();
    initSmoothScroll();
    initFooterInfo();
    initSearch();
    initSocialButtons();
    initKakaoMap();
});

// 네비게이션 스크롤 효과
function initNavigation() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // 나무무늬 배경은 유지하고 투명도만 조정
        if (currentScroll > 100) {
            header.style.opacity = '0.98';
        } else {
            header.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
    });
}

// 주소 복사 기능
function initCopyAddress() {
    const btnCopy = document.getElementById('btn-copy-address');
    
    if (btnCopy) {
        btnCopy.addEventListener('click', function() {
            const address = CONFIG.address.full;
            
            // 클립보드에 복사
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(address).then(function() {
                    showCopyMessage('주소가 복사되었습니다!');
                    btnCopy.textContent = '복사 완료!';
                    setTimeout(function() {
                        btnCopy.textContent = '주소 복사';
                    }, 2000);
                }).catch(function(err) {
                    fallbackCopyTextToClipboard(address);
                });
            } else {
                fallbackCopyTextToClipboard(address);
            }
        });
    }
}

// 클립보드 복사 폴백 함수
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyMessage('주소가 복사되었습니다!');
        } else {
            showCopyMessage('복사에 실패했습니다. 주소를 직접 복사해주세요.');
        }
    } catch (err) {
        showCopyMessage('복사에 실패했습니다. 주소를 직접 복사해주세요.');
    }
    
    document.body.removeChild(textArea);
}

// 복사 메시지 표시
function showCopyMessage(message) {
    // 기존 메시지 제거
    const existingMessage = document.querySelector('.copy-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 새 메시지 생성
    const messageDiv = document.createElement('div');
    messageDiv.className = 'copy-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #228B22;
        color: #fff;
        padding: 1.5rem 3rem;
        border-radius: 10px;
        font-size: 1.3rem;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(function() {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s';
        setTimeout(function() {
            messageDiv.remove();
        }, 300);
    }, 2000);
}

// 네비게이션 버튼 초기화 (카카오맵)
function initNavigationButtons() {
    // 카카오맵 버튼은 HTML에서 직접 링크로 처리
}

// 부드러운 스크롤
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 이미지 로드 에러 처리
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// 푸터 정보 초기화
function initFooterInfo() {
    // 회사 정보 설정
    const ceoName = document.getElementById('ceo-name');
    const businessNumber = document.getElementById('business-number');
    const footerAddress = document.getElementById('footer-address');
    
    if (ceoName && CONFIG.company.ceo) {
        ceoName.textContent = CONFIG.company.ceo;
    }
    
    if (businessNumber && CONFIG.company.businessNumber) {
        businessNumber.textContent = CONFIG.company.businessNumber;
    }
    
    if (footerAddress && CONFIG.address.full) {
        footerAddress.textContent = CONFIG.address.full;
    }
}

// 검색 기능 초기화
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const searchType = document.getElementById('search-type');
    
    if (searchBtn && searchInput) {
        // 검색 버튼 클릭
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        // 엔터키로 검색
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        const type = searchType ? searchType.value : 'all';
        
        if (!query) {
            alert('검색어를 입력해주세요.');
            return;
        }
        
        // 검색 기능 구현 (게시판으로 이동하거나 검색 결과 표시)
        // 현재는 게시판 페이지로 이동
        window.location.href = `board.html?search=${encodeURIComponent(query)}&type=${type}`;
    }
}

// 소셜 미디어 버튼 초기화
function initSocialButtons() {
    const btnYoutube = document.getElementById('btn-youtube');
    
    if (btnYoutube && CONFIG.social.youtube) {
        btnYoutube.href = CONFIG.social.youtube;
    }
}

// 카카오맵 초기화 (구글 맵 iframe 사용 - API 키 없이도 작동)
function initKakaoMap() {
    const mapContainer = document.getElementById('kakao-map');
    
    if (!mapContainer) return;
    
    // 주소: 경기도 화성시 팔탄면 시청로777
    const address = '경기도 화성시 팔탄면 시청로777';
    
    // 구글 맵 iframe 사용 (API 키 없이도 작동)
    // 주소를 URL 인코딩하여 구글 맵에 전달
    const encodedAddress = encodeURIComponent(address);
    
    // 구글 맵 iframe (API 키 없이도 기본 지도 표시 가능)
    mapContainer.innerHTML = `
        <iframe 
            src="https://www.google.com/maps?q=${encodedAddress}&output=embed" 
            width="100%" 
            height="400" 
            frameborder="0" 
            style="border:0; border-radius: 10px;"
            allowfullscreen
            loading="lazy">
        </iframe>
    `;
}

