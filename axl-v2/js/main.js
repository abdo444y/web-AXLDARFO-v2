document.addEventListener('DOMContentLoaded', () => {
    
    // 1. إظهار الماوس الطبيعي
    document.body.style.cursor = 'default';
    const allElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    allElements.forEach(el => el.style.cursor = 'pointer');

    // 2. التحكم في شاشة التحميل (اللودر)
    const loader = document.querySelector('.loader');
    if (loader) {
        // تم تغيير الوقت هنا إلى 3000 ملي ثانية (أي 3 ثوانٍ)
        setTimeout(() => {
            loader.classList.add('exit'); // تشغيل أنميشن الاختفاء
            
            // انتظر نصف ثانية إضافية (500ms) حتى ينتهي أنميشن الاختفاء تماماً ثم احذف العنصر وفعل السكرول
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible'; // تفعيل تحريك الصفحة (Scroll)
            }, 500);
            
        }, 3000); // 3000ms = 3 ثوانٍ
    }

    // 3. تحريك الماوس المخصص (إذا كان مدعوماً في تصميمك)
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if(dot && ring) {
        document.addEventListener('mousemove', (e) => {
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        });
    }
});