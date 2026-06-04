const UI = {
    // نقطة انطلاق تشغيل الواجهة
    init: function() {
        console.log("UI Initialized");
        
        this.setupCursor();          
        this.setupLoader();          
        this.setupEventListeners();  // تشغيل ربط الأسهم هنا
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

    // 3. ربط أسهم السلايدر بناءً على كلاسات موقعك الحالية
    setupEventListeners: function() {
        // تحديد الحاوية الكبيرة للكروت بناءً على موقعك
        const container = document.querySelector('.swiper-wrapper'); 
        // تحديد الأسهم السفلية بناءً على الكلاسات الموجودة في الـ HTML لديك
        const nextBtn = document.querySelector('.swiper-button-next');       
        const prevBtn = document.querySelector('.swiper-button-prev');        

        if (container && nextBtn && prevBtn) {
            
            // دالة تحسب عرض الكارت الواحد بدقة للانتقال خطوة واحدة
            const getScrollAmount = () => {
                const firstCard = container.querySelector('.swiper-slide'); 
                if (firstCard) {
                    const cardStyle = window.getComputedStyle(firstCard);
                    const cardWidth = firstCard.offsetWidth;
                    // حساب المسافات الجانبية (Gap / Margins)
                    const marginRight = parseFloat(cardStyle.marginRight) || 0;
                    const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
                    
                    return cardWidth + marginRight + marginLeft;
                }
                return 320; // قيمة افتراضية تقريبية لحجم الكارت في موقعك
            };

            // عند الضغط على سهم اليمين -> تحرك كارت واحد للأمام
            nextBtn.addEventListener('click', () => {
                const scrollAmount = getScrollAmount();
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // عند الضغط على سهم اليسار -> تحرك كارت واحد للخلف
            prevBtn.addEventListener('click', () => {
                const scrollAmount = getScrollAmount();
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    }
};

// تشغيل الكود بأمان بمجرد اكتمال تحميل عناصر الصفحة (DOM)
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
