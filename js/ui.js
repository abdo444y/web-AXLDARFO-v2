const UI = {
    // نقطة انطلاق تشغيل الواجهة
    init: function() {
        console.log("UI Initialized");
        
        this.setupCursor();          
        this.setupLoader();          
        this.setupEventListeners();  // تفعيل السلايدر والأسهم من هنا
    },

    // 1. التحكم في شكل وحركة الماوس
    setupCursor: function() {
        document.body.style.cursor = 'default';
        const allElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
        allElements.forEach(el => el.style.cursor = 'pointer');

        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        
        if (dot && ring) {
            document.addEventListener('mousemove', (e) => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
                ring.style.left = e.clientX + 'px';
                ring.style.top = e.clientY + 'px';
                dot.style.opacity = '1';
                ring.style.opacity = '1';
            });
        }
    },

    // 2. التحكم في شاشة التحميل (Loader)
    setupLoader: function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('exit'); 
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.style.overflow = 'visible'; 
                }, 500);
            }, 3000); 
        }
    },

    // 3. تفعيل السلايدر والتحكم بالأسهم بمقدار كارت واحد
    setupEventListeners: function() {
        // نتحقق أولاً إذا كانت حاوية السلايدر موجودة في الصفحة
        if (document.querySelector('.swiper')) {
            
            // تشغيل السلايدر رسمياً برمجياً
            const swiper = new Swiper('.swiper', {
                slidesPerView: 1,       // الوضع الافتراضي للشاشات الصغيرة (كارت واحد)
                spaceBetween: 20,       // المسافة بين الكروت
                loop: false,            // هل تريد التمرير اللانهائي؟ (اجعلها true إذا أردت)
                
                // ربط الأسهم السفلية بالكاروسيل تلقائياً
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
                // لكي يتغير عدد الكروت المعروضة تلقائياً حسب حجم الشاشة (Responsive)
                breakpoints: {
                    768: {
                        slidesPerView: 2, // كارتين في الشاشات المتوسطة
                    },
                    1024: {
                        slidesPerView: 4, // 4 كروت في شاشات الكمبيوتر مثل تصميمك تماماً
                    }
                }
            });
            
        }
    }
};

// تشغيل الكود بأمان بمجرد اكتمال تحميل عناصر الصفحة (DOM)
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
