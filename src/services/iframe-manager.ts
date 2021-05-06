export const IframeManager = {
    src: `${process.env.REACT_APP_IFRAME_ROOT}/#/pages/index/index`,
    iframe: { postMessage: (message: any, orign: string) => {} },
    callback: (message: any) => {},
    setIframe(iframe: any) {
        this.iframe = iframe;
    },
    postMessage(message: any) {
        this.iframe && this.iframe.postMessage(message,'*');
    },
    subscrib(callback: (message: any) => void) {
        this.callback = callback;
        window.addEventListener("message", callback, false);
    },
    unSubscrib() {
        window.removeEventListener("message", this.callback);
    }
}