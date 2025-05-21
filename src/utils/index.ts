

//判断是否是微信浏览器
export const isWechat = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return /micromessenger/i.test(ua);
}




// 判断是否是ios 还是安卓
export const isIOS = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
}



// 判断是否是pc
export const isPC = () => {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    return !isMobile;
};






