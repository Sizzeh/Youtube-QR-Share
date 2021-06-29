var qrCount = 0;
var qrCode
var firstCode = true
var lastUrl;

function generateQR() {
    if (document.getElementById('share-url')) {
        var url = document.getElementById('share-url').value
    }
        if (url && document.getElementsByClassName('yt-copy-link-renderer')[0]) {
            if (firstCode == true) {
                qrCode = new QRCode(document.getElementById('bar'), {
                    width: 100,
                    height: 100
                })
                qrCode.makeCode(url)
                firstCode = false;
            }
            else {
                if (lastUrl != url) {
                    lastUrl = url;
                    console.log(`[Youtube QR Share] Updating QR CODE`);
                    qrCode.makeCode(url)
                }
            }
        }
}

setTimeout(() => {
    generateQR()
    //console.log(document.getElementsByClassName("ytd-button-renderer"))
    //document.getElementsByClassName("ytd-button-renderer")
    let btnList = document.getElementsByClassName("ytd-button-renderer")
    for (let i = 0; i < btnList.length; i++) {
        //btnList[i].onclick = function() { generateQR(); }
    }
    setInterval(() => {
        generateQR()
    }, 1000);
}, 1500);
