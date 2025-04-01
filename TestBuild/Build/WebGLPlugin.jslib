mergeInto(LibraryManager.library, {
    SetZIndex: function(zIndex) {
        // 调用 JavaScript 函数来设置 iframe 的 z-index
        setIframeZIndex(zIndex);
    },

    CreateButtonJS: function(base64ImagePtr, width, height) {
        console.log("mergeInto createButton");

        var imageUrl = UTF8ToString(base64ImagePtr);

        console.log("CreateButtonJS: " + base64ImagePtr);
        console.log("CreateButtonJS: " + imageUrl);

        createButton(imageUrl, width, height);
    },

    JS_SaveImage: function(base64Data, filename = "image.png") {
        // 解析 Base64，去掉 `data:image/png;base64,` 開頭（如果有的話）
        console.log("JS_SaveImage: " + UTF8ToString(filename));

        var imageUrl = UTF8ToString(base64Data);
        const base64String = imageUrl.replace(/^data:image\/\w+;base64,/, "");

        // 將 Base64 轉換成二進制數據
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" }); // 假設是 PNG 格式
        const url = URL.createObjectURL(blob);

        // 建立下載連結
        const a = document.createElement("a");
        a.href = url;
        a.download = UTF8ToString(filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url); // 釋放 URL 物件
    },
    
    CheckMobilePlatform : function() {
return checkMobilePlatform();
    }
});
