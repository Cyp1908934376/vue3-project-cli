export function setTheme(name: 'light' | 'dark') {
  if (name === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  }
}

export function initTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') return setTheme('dark')

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark')
  }
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  if (current === 'dark') setTheme('light')
  else setTheme('dark')
}
