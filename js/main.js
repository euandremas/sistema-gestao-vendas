const themeToggle = document.getElementById("themeToggle");
const themeText = document.getElementById("themeText");

const DARK_THEME_CLASS = "darkTheme";
const THEME_STORAGE_KEY = "clicSellTheme";

function updateThemeControls(isDarkTheme) {
  themeToggle.checked = isDarkTheme;
  themeText.textContent = isDarkTheme ? "Modo claro" : "Modo escuro";
}

function applyTheme(theme) {
  const isDarkTheme = theme === "dark";

  document.body.classList.toggle(DARK_THEME_CLASS, isDarkTheme);

  updateThemeControls(isDarkTheme);
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDarkTheme ? "dark" : "light";
}

themeToggle.addEventListener("change", () => {
  const selectedTheme = themeToggle.checked ? "dark" : "light";

  localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);

  applyTheme(selectedTheme);
});

applyTheme(getInitialTheme());