"use strict";
var isAlreadyLoaded = false;

function checks() {
    if (document.getElementsByClassName('yt-copy-link-renderer')[0]) { // gets the link
        return true;
    }
    return false;
}

class Code {
    constructor(options) {
        this.code = null;
        this.element = null;
        this.style = {
            padding: 5
        };
        this.options = {
            width: 100-this.style.padding,
            height: 100-this.style.padding
        }
        this.currentUrl = null
        this.newURL = true;

        this.wantedStyle = `display:block;padding: ${this.style.padding}px;background:white;`
    }
    /**
     *  Use to update to a new code
     *  @param {string} url - needed url to update code
     */
    update(url) {
        if (this.element == null) return new Error('no element');
        if (this.currentUrl != url) {
            this.code.makeCode(url);
            this.currentUrl = url;
            console.log("%c[Youtube-QR] Updated QR Code.", "color:green");
        }
    }
    /**
     *  Get the url from share box
     */
    findURL() {
        if (!document.getElementById('share-url')) {
            return null;
        }
        return document.getElementById('share-url').value;
    }

    createCode() {
        this.code = new QRCode(this.element, this.options);
        console.log("%c[Youtube-QR] First Load.", "color:green");
    }
    /**
     *  Get the url from share box
     * @param {string} element - html element
     */
    setElement(element) {
        this.element = element
        console.log("%c[Youtube-QR] Set parent element.", "color:green");
    }

    /**
     *  Sets the style for the QR Code
     */
    setStyle() {
        if (this.element == null) return new Error('you must set an element before calling setStyle');
        this.element.getElementsByTagName('img')[0].style = this.wantedStyle;
        console.log("%c[Youtube-QR] Set Style for QR Code.", "color:green");
    }
}

const client = new Code();

function main() {
    if (!checks()) return console.log("%c[Youtube-QR] Checks Failed.", "color:red");
    if (!isAlreadyLoaded) {
        client.setElement(document.getElementById('bar'))
        client.createCode();
        isAlreadyLoaded = true;
        client.update(client.findURL());
        client.setStyle()
    } else {
        client.update(client.findURL()); // findURL and attempt update
    }
}

document.addEventListener('keyup', () => { // if user manually edits the time code causing a change to the link running the code
    setTimeout(() => {
        main();
    }, 500);
});
document.addEventListener('mouseup', () => { // if user clicks buttons run the code
    setTimeout(() => {
        main();
    }, 500);
});