// QR Code Generator
const qrType = document.getElementById('qr-type');
const qrContent = document.getElementById('qr-content');
const qrSize = document.getElementById('qr-size');
const qrSizeValue = document.getElementById('qr-size-value');
const qrColor = document.getElementById('qr-color');
const qrBgColor = document.getElementById('qr-bg-color');
const generateQrBtn = document.getElementById('generate-qr');
const qrResult = document.getElementById('qr-result');
const downloadQrBtn = document.getElementById('download-qr');

let qrcode = null;

// Update QR size display
qrSize.addEventListener('input', () => {
    qrSizeValue.textContent = `${qrSize.value}px`;
});

// Generate QR Code
generateQrBtn.addEventListener('click', () => {
    const content = qrContent.value.trim();
    
    if (!content) {
        showNotification('Please enter content for the QR code', 'error');
        return;
    }
    
    // Clear previous QR code
    qrResult.innerHTML = '';
    
    // Create new QR code
    qrcode = new QRCode(qrResult, {
        text: content,
        width: parseInt(qrSize.value),
        height: parseInt(qrSize.value),
        colorDark: qrColor.value,
        colorLight: qrBgColor.value,
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download button
    downloadQrBtn.style.display = 'block';
    
    showNotification('QR code generated successfully!', 'success');
});

// Download QR Code
downloadQrBtn.addEventListener('click', () => {
    const canvas = qrResult.querySelector('canvas');
    
    if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'qrcode.png';
        link.click();
        
        showNotification('QR code downloaded!', 'success');
    }
});

// Update QR code when settings change
qrSize.addEventListener('change', () => {
    if (qrcode) {
        generateQrBtn.click();
    }
});

qrColor.addEventListener('change', () => {
    if (qrcode) {
        generateQrBtn.click();
    }
});

qrBgColor.addEventListener('change', () => {
    if (qrcode) {
        generateQrBtn.click();
    }
});