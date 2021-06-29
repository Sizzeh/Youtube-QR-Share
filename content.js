var qrCount = 0,
    qrCode,
    firstCode = true,
    lastUrl,
    url;
function generateQR() {
    if (document.getElementById('share-url')) url = document.getElementById('share-url').value; // grab share url
        if (url && document.getElementsByClassName('yt-copy-link-renderer')[0]) {
            if (firstCode == true) { // generate qr code placeholder
                qrCode = new QRCode(document.getElementById('bar'), {
                    width: 100,
                    height: 100
                });
                qrCode.makeCode(url);
                firstCode = false;
            }
            else {
                if (lastUrl != url) { // only update if the share url changes
                    lastUrl = url;
                    console.log(`[Youtube QR Share] Updating QR CODE`);
                    qrCode.makeCode(url);
                }
            }
        }
}
setTimeout(() => {
    setInterval(() => {
        generateQR();
    }, 1000);
}, 1500);
