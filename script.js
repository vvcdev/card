const card = document.getElementById('card')
const remaining = document.getElementById('remaining')

const updateRemaining = async () => {
  try {
    const res = await fetch('/')
    const text = await res.text()
    localStorage.setItem('remaining', text)
    remaining.innerText = text
  } catch(error) {
    console.error(error)
    remaining.innerText = localStorage.getItem('remaining') || '?'
  }
}

const registerSw = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js')
    console.log('Service worker registered')
  }
}

card.addEventListener('click', () => card.classList.toggle('flipped'))
setInterval(updateRemaining, 5000)

updateRemaining()
registerSw()

const spawnHeart = () => {
  const heart = document.createElement('div')
  const delay = Math.random() * 2
  heart.textContent = '💖'
  heart.style.setProperty('color', '#ffffff')
  heart.style.setProperty('font-size', (24 + Math.ceil(Math.random() * 20)) + 'px')
  heart.style.setProperty('position', 'fixed')
  heart.style.setProperty('transform', 'scale(0)')
  heart.style.setProperty('animation', 'heart 0.8s')
  heart.style.setProperty('animation-delay', delay + 's')
  heart.style.setProperty('top', Math.floor(Math.random() * innerHeight) + 'px')
  heart.style.setProperty('left', Math.floor(Math.random() * innerWidth) + 'px')
  document.body.appendChild(heart)
  setTimeout(() => heart.remove(), delay * 1000 + 800)
}
for (let i = 0; i < 80; i++) {
  spawnHeart()
}
