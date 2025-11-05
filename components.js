async function loadComponent(id, file, jsFiles = []) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    const container = document.getElementById(id);
    container.innerHTML = html;

    // если передана строка — делаем массив из одного файла
    if (!Array.isArray(jsFiles)) jsFiles = [jsFiles];

    // загружаем все JS-файлы
    for (const file of jsFiles) {
      const script = document.createElement("script");
      script.src = file;
      // Firebase требует модульный тип
      script.type = file.includes("firebase") ? "module" : "text/javascript";
      document.body.appendChild(script);
    }

  } catch (err) {
    console.error(`Ошибка загрузки ${file}:`, err);
  }
}


// Пример использования:
loadComponent("nav-placeholder", "components.html", [
  "firebase.js",
  "default.js"
]);



