window.onload = function() {
    var banner = document.getElementById('banner'),
        switches = document.getElementsByClassName('switch'),
        banners = document.getElementsByClassName('banners')[0],
        indicators = document.querySelectorAll('.indicator i'),
        current = document.getElementsByClassName('current');

    var num = 0,
        i,
        offset = parseInt(computedStyle(banner, ['width'])),  // 点击一次按钮图片移动的距离
        timer;

    // 设置轮播图自动切换
    var autoplay = function() {
        num++;
        banners.style.left = num * offset * (-1) + 'px';
        if (num === 4) {
            num = 0;
        }

        current[0].className = '';
        indicators[num].className = 'current';
    };

    timer = setInterval(autoplay, 2000);

    // 鼠标悬停在轮播图上时，停止自动切换
    banner.onmouseover = function() {
        clearInterval(timer);
    };

    banner.onmouseout = function() {
        timer = setInterval(autoplay, 2000);
    };

    // 轮播图左边按钮，点击切换图片
    switches[0].onclick = function() {
        num++;
        banners.style.left = num * offset * (-1) + 'px';
        if (num === 4) {
            num = 0;
        }

        current[0].className = '';
        indicators[num].className = 'current';
    };
    // 轮播图右边按钮，点击切换图片
    switches[1].onclick = function() {
        if (num === 0) {
            num = 4;
        }
        num--;
        banners.style.left = num * offset * (-1) + 'px';

        current[0].className = '';
        indicators[num].className = 'current';
    };

    // 鼠标移动到指示的小圆点上时，切换到对应的图片
    for (i = 0; i < indicators.length; i++) {
        indicators[i].index = i;

        indicators[i].onmouseover = function() {
            current[0].className = '';
            this.classList.add('current');
            banners.style.left = this.index * offset * (-1) + 'px';
        };
    }

    var singleImgs = document.querySelectorAll('.single-img img');
    var placeholder = singleImgs[0];
    var singleInfos = document.querySelectorAll('.single-info li');

    // 鼠标hover在专辑名与专辑封面之间的交互
    for (i = 1; i < singleImgs.length; i++) {
        singleImgs[i].index = i;
        singleInfos[i].index = i;
        singleImgs[i].onmouseover = function() {
            placeholder.src = this.src.replace(/small/, 'big');
            singleInfos[this.index].classList.add('current');
        };
        singleImgs[i].onmouseout = function() {
            singleInfos[this.index].classList.remove('current');
        };
        singleInfos[i].onmouseover = function() {
            placeholder.src = singleImgs[this.index].src.replace(/small/, 'big');
        };
    }
};

// 获取外部样式表中元素的样式
function computedStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return window.getComputedStyle(ele, null)[attr];
    }
}