# Toastx - نوتیفیکیشن ساده و زیبا

Toastx یک ابزار ساده برای نمایش toast message در صفحات وب است — فقط با یک فایل CSS و JS!

## استفاده سریع (CDN)

فقط این تکه‌کد را در فایل HTML خود قرار دهید:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/farzadameri/toastx@main/dist/toastx.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/farzadameri/toastx@main/dist/toastx.min.js"></script>

<!-- استفاده -->
<script>
  toastx({
    message: 'عملیات با موفقیت انجام شد!',
    toastType: 'success', // یا 'error'، 'warning'
    direction: 'top',     // یا 'bottom'
    duration: 2200        // مدت نمایش (میلی‌ثانیه - اختیاری)
  });
</script>
