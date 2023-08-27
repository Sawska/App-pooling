function copyToClipboard() {
    const button = document.getElementById("copyBtn");
    const copyText = document.getElementById("text");

    copyText.select();
    document.execCommand("copy");

    button.style.backgroundColor = "#8A2BE2";
    button.innerHTML = "Copied";

    setTimeout(function() {
        button.style.backgroundColor = "#BA55D3";
        button.innerHTML = "Copy Link";
    }, 1000);
}