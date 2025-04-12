document.addEventListener("DOMContentLoaded", () => {
    const code = `show "Welcome to my page!";
    \\*scroll down to see more*\\`;
    const codeArea = document.getElementById("typing");
    let index = 0;
    function formatCode(text) {
        return text
        .replace(/;/g, ``)
        .replace(/show/g, `<span style='color: #569CD6;'>show</span>`)
        .replace(/"[^"]*"/g, `<span style="color: #CE9178;">$&</span><span style="color:rgb(27, 218, 212);">;</span><br>`)
        .replace(/\\[^\\]*/g, `<span style='color:rgb(160, 224, 211);'>$&</span>`)
    }
    function typeCode() {
        if (index < code.length) {
        codeArea.innerHTML = formatCode(code.substring(0, index + 1));
        index++;
        setTimeout(typeCode, 50);
        }
    }
    typeCode();
});