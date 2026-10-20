import './style.css'
import { phases, loadArticle } from './syllabus.js'
import { escapeHTML, renderArticle } from './article.js'

const topicCount = phases.reduce((count, phase) => count + phase.topics.length, 0)
const topics = phases.flatMap(phase => phase.topics.map(topic => ({ ...topic, phase })))
const progressKey = 'devops-completed-topics-v1'
let completedTopics = new Set()
try {
  const saved = JSON.parse(localStorage.getItem(progressKey) || '[]')
  if (Array.isArray(saved)) completedTopics = new Set(saved.filter(url => topics.some(topic => topic.url === url)))
} catch { /* Progress still works for this visit when storage is unavailable. */ }
let progressSaved = true
let returnFocus
let articleRequest = 0
const phaseColor = phase => phase.level.includes('ADVANCED') ? 'var(--advanced)' : 'var(--accent)'
const homeSteps = [
  { title: 'DevOps Foundations', level: 'EASY', target: 1 },
  { title: 'Linux & Networking', level: 'EASY TO INTERMEDIATE', target: 2 },
  { title: 'Git & CI/CD', level: 'INTERMEDIATE', target: 5 },
  { title: 'Containers & Cloud', level: 'INTERMEDIATE', target: 8 },
  { title: 'Operate & Monitor', level: 'ADVANCED', target: 11 },
]
const themeButton = '<button class="theme-toggle" type="button" aria-label="Switch to light mode"></button>'
const contentCredit = `<section class="content-credit" aria-label="Content credit and special thanks"><h2>Special thanks to GeeksforGeeks</h2><p>All learning content is credited to <a href="https://www.geeksforgeeks.org/devops/devops-tutorial/" target="_blank" rel="noopener noreferrer">GeeksforGeeks and its contributors &nearr;</a>. Thank you for making DevOps knowledge accessible to learners.</p></section>`

function syncThemeButtons() {
  const isDark = document.documentElement.dataset.theme === 'dark'
  const icon = isDark
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>'
    : '<path d="M20.7 13.1A8.8 8.8 0 0 1 10.9 3.3a8.8 8.8 0 1 0 9.8 9.8Z"/>'
  document.querySelectorAll('.theme-toggle').forEach(button => {
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`)
    button.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>`
  })
}

document.querySelector('#app').innerHTML = `
<header class="header">
  <a class="brand" href="#home" aria-label="DevOps Journey home"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 24" fill="none"><path d="M3 12C3 3 10 3 16 12S29 21 29 12 22 3 16 12 3 21 3 12Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></span><span>DEVOPS <span class="brand-light">/ JOURNEY</span></span></a>
  <nav aria-label="Main navigation"><a class="syllabus-link" href="#journey">Explore syllabus <span aria-hidden="true">&nearr;</span></a><span class="edition">BUILD. SHIP. OPERATE.</span>${themeButton}</nav>
</header>
<main>
  <section id="home" class="landing" aria-labelledby="hero-title">
    <div class="eyebrow"><span class="status-dot"></span> FROM YOUR FIRST COMMIT TO PRODUCTION</div>
    <h1 id="hero-title">Start your<br><span>DevOps</span><br>journey</h1>
    <p class="hero-copy">Your DevOps journey starts here.<br>From Linux and Git to automated delivery and reliable operations.</p>
    <a class="primary-button" href="#journey">Start your journey <span aria-hidden="true">&rarr;</span></a>
    <div class="hero-connector" aria-hidden="true"></div>
    <div class="hero-meta"><span>${String(phases.length).padStart(2, '0')} PHASES</span><i></i><span>${topicCount} TOPICS</span><i></i><span>YOUR OWN PACE</span></div>
    <nav class="home-phase-strip" aria-label="Learning path overview"><ol>${homeSteps.map((step, index) => `<li style="--phase:var(--${step.level.includes('ADVANCED') ? 'advanced' : 'accent'})"><a href="#phase-${step.target}"><span class="step-badge">${index + 1}</span><span class="step-title">${step.title}</span><span class="step-level">${step.level}</span></a></li>`).join('')}</ol></nav>
    ${contentCredit}
    <div class="landing-foot"><span>BUILD CONFIDENTLY. SHIP RELIABLY.</span><a href="#journey">Discover the path &darr;</a><span>BUILT FOR THE CURIOUS.</span></div>
  </section>
  <section id="journey" class="journey" aria-labelledby="journey-title" hidden>
    <div class="journey-intro"><div class="eyebrow"><span class="status-dot"></span> THE LEARNING PATH</div><h1 id="journey-title">Every stage.<br><span>Connected.</span></h1><p>Build your foundation. Automate your workflow.<br>Explore every stage of the DevOps lifecycle.</p><div class="journey-meta"><span>${phases.length} phases</span><span>${topicCount} topics</span><span>Easy &rarr; Advanced</span></div></div>
    <div class="topic-search"><label for="topic-search">Find a topic</label><input id="topic-search" type="search" placeholder="Search Linux, Git, Docker, Kubernetes..." autocomplete="off"><div class="topic-filters"><label for="completion-filter">Show topics<select id="completion-filter"><option value="all">All topics</option><option value="pending">Not completed</option><option value="completed">Completed</option></select></label><p id="progress-count" role="status"></p></div><span id="search-count" role="status">${topicCount} topics</span></div>
    <div class="roadmap-layout">
      <aside class="phase-navigation" aria-label="Jump to phase"><span class="nav-caption">YOUR ROADMAP</span>${phases.map(phase => `<a href="#phase-${phase.id}" style="--phase:${phaseColor(phase)}"><span class="phase-index">${String(phase.id).padStart(2, '0')}</span><span>${phase.title}</span><i></i></a>`).join('')}<p>There's no rush.<br>One concept at a time.</p></aside>
      <div class="roadmap"><div class="path-start"><span class="status-dot"></span> YOUR JOURNEY STARTS HERE</div>${phases.map(phase => `
        <section class="phase" id="phase-${phase.id}" style="--phase:${phaseColor(phase)}" aria-labelledby="phase-title-${phase.id}">
          <div class="phase-heading"><span class="phase-number">${String(phase.id).padStart(2, '0')}</span><div><span class="phase-level">PHASE ${phase.id} &middot; ${phase.level}</span><h2 id="phase-title-${phase.id}">${phase.title}</h2></div><span class="phase-topic-count">${String(phase.topics.length).padStart(2, '0')} TOPICS</span></div>
          <div class="topic-branches">${phase.topics.map((topic, index) => `<div class="topic-branch ${index % 2 ? 'branch-right' : ''}"><span class="branch-point"></span><button class="topic-card" data-topic="${topic.id}" aria-haspopup="dialog"><span class="topic-code">TOPIC ${topic.id}<span aria-hidden="true">&nearr;</span></span><h3>${escapeHTML(topic.title)}</h3><span class="completion-badge" hidden>✓ Completed</span><p>${escapeHTML(topic.summary)}</p><span class="topic-action">Explore topic <span aria-hidden="true">&rarr;</span></span></button></div>`).join('')}</div>
        </section>`).join('')}<div class="path-end"><span aria-hidden="true">&#10035;</span><h2>From development.<br>Into production.</h2><p>Build, deliver, and operate with confidence.</p><a href="#home">Back to the beginning &nearr;</a></div></div>
    </div>
    ${contentCredit}
    <footer><a href="#home">DEVOPS / JOURNEY</a><span>One concept at a time.</span><a href="#journey">Back to top &uarr;</a></footer>
  </section>
</main>
<dialog class="topic-dialog" aria-labelledby="topic-title"><div class="panel-resize-handle" role="separator" aria-label="Resize topic sidebar" aria-orientation="vertical" aria-controls="topic-panel" tabindex="0"></div><div class="topic-panel" id="topic-panel"></div></dialog>`

const dialog = document.querySelector('.topic-dialog')
const panel = document.querySelector('.topic-panel')
const resizeHandle = document.querySelector('.panel-resize-handle')
const desktopPanel = matchMedia('(min-width: 761px)')
let sidebarWidth = window.innerWidth / 2
let sidebarManuallyResized = false
let resizeDrag = null

function updateSidebarWidth(width = sidebarManuallyResized ? sidebarWidth : window.innerWidth / 2) {
  if (!desktopPanel.matches) return
  const maximum = window.innerWidth - 48
  sidebarWidth = Math.round(Math.min(maximum, Math.max(360, width)))
  dialog.style.setProperty('--sidebar-width', `${sidebarWidth}px`)
  resizeHandle.setAttribute('aria-valuemin', '360')
  resizeHandle.setAttribute('aria-valuemax', String(maximum))
  resizeHandle.setAttribute('aria-valuenow', String(sidebarWidth))
  resizeHandle.setAttribute('aria-valuetext', `${sidebarWidth} pixels wide`)
}

function stopSidebarResize() {
  const pointerId = resizeDrag?.pointerId
  resizeDrag = null
  document.body.classList.remove('sidebar-resizing')
  if (pointerId !== undefined && resizeHandle.hasPointerCapture(pointerId)) {
    resizeHandle.releasePointerCapture(pointerId)
  }
}

resizeHandle.addEventListener('pointerdown', event => {
  if (!desktopPanel.matches || event.button !== 0 || !event.isPrimary) return
  event.preventDefault()
  resizeDrag = { pointerId: event.pointerId, startX: event.clientX, startWidth: dialog.getBoundingClientRect().width }
  resizeHandle.setPointerCapture(event.pointerId)
  resizeHandle.focus({ preventScroll: true })
  document.body.classList.add('sidebar-resizing')
})
resizeHandle.addEventListener('pointermove', event => {
  if (resizeDrag?.pointerId !== event.pointerId) return
  sidebarManuallyResized = true
  updateSidebarWidth(resizeDrag.startWidth + resizeDrag.startX - event.clientX)
})
for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  resizeHandle.addEventListener(eventName, stopSidebarResize)
}
resizeHandle.addEventListener('keydown', event => {
  if (!desktopPanel.matches) return
  const step = event.shiftKey ? 50 : 20
  const widths = { ArrowLeft: sidebarWidth + step, ArrowRight: sidebarWidth - step, Home: 360, End: window.innerWidth - 48 }
  if (!(event.key in widths)) return
  event.preventDefault()
  sidebarManuallyResized = true
  updateSidebarWidth(widths[event.key])
})
window.addEventListener('resize', () => {
  stopSidebarResize()
  updateSidebarWidth()
})
updateSidebarWidth()

async function showTopic(id) {
  const index = topics.findIndex(topic => topic.id === id)
  if (index < 0) return
  const topic = topics[index]
  const previous = topics[index - 1]
  const next = topics[index + 1]
  const request = ++articleRequest
  panel.style.setProperty('--phase', phaseColor(topic.phase))
  panel.innerHTML = `
    <div class="panel-header"><span class="panel-breadcrumb">PHASE ${topic.phase.id} / ${topic.phase.title}</span><div class="panel-tools">${themeButton}<button class="close-button" aria-label="Close topic">&times;</button></div></div>
    <div class="panel-scroll"><span class="panel-topic-code">TOPIC ${topic.id} &middot; ${topic.phase.level}</span><h2 id="topic-title">${escapeHTML(topic.title)}</h2>
      <div class="article-meta"><a href="${escapeHTML(topic.url)}" target="_blank" rel="noopener noreferrer">Content credit: GeeksforGeeks &nearr;</a><span>${topic.minutes} min read</span></div>
      <article class="article-body" aria-labelledby="topic-title" aria-busy="true"><p role="status">Loading article...</p></article>
    </div>
    <div class="panel-progress"><button class="completion-toggle" type="button" data-completion="${escapeHTML(topic.id)}" aria-pressed="${completedTopics.has(topic.url)}">${completedTopics.has(topic.url) ? '✓ Completed — mark not completed' : 'Mark as completed'}</button></div>
    <div class="panel-footer"><button ${previous ? `data-topic="${previous.id}"` : 'disabled'}><span>&larr; PREVIOUS</span><strong>${escapeHTML(previous?.title || 'The beginning')}</strong></button><button class="next-topic" ${next ? `data-topic="${next.id}"` : 'disabled'}><span>NEXT &rarr;</span><strong>${escapeHTML(next?.title || 'End of roadmap')}</strong></button></div>`
  document.querySelectorAll('.topic-card').forEach(card => card.classList.toggle('selected', card.dataset.topic === id))
  if (!dialog.open) {
    returnFocus = document.activeElement
    dialog.showModal()
    document.body.classList.add('panel-open')
  }
  syncThemeButtons()
  panel.querySelector('.close-button').focus()
  try {
    const markdown = await loadArticle(topic)
    if (request !== articleRequest || !dialog.open) return
    const article = panel.querySelector('.article-body')
    article.innerHTML = renderArticle(markdown)
    article.setAttribute('aria-busy', 'false')
    article.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), topic.url)
      if (!['https:', 'http:'].includes(url.protocol)) {
        link.removeAttribute('href')
        return
      }
      link.href = url.href
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
    })
    panel.querySelector('.panel-scroll').scrollTop = 0
  } catch {
    if (request !== articleRequest || !dialog.open) return
    const article = panel.querySelector('.article-body')
    article.setAttribute('aria-busy', 'false')
    article.innerHTML = `<p role="alert">This article could not be loaded.</p><button class="article-retry" data-topic="${topic.id}">Try again</button>`
  }
}

function filterTopics() {
  const query = document.querySelector('#topic-search').value.trim().toLowerCase()
  const filter = document.querySelector('#completion-filter').value
  let count = 0
  document.querySelectorAll('.phase').forEach(section => {
    let phaseCount = 0
    section.querySelectorAll('.topic-card').forEach(card => {
      const topic = topics.find(topic => topic.id === card.dataset.topic)
      const completed = completedTopics.has(topic.url)
      const matchesSearch = `${topic.title} ${topic.summary} ${topic.phase.title}`.toLowerCase().includes(query)
      const matchesStatus = filter === 'all' || (filter === 'completed' ? completed : !completed)
      const matches = matchesSearch && matchesStatus
      card.closest('.topic-branch').hidden = !matches
      card.classList.toggle('completed', completed)
      card.querySelector('.completion-badge').hidden = !completed
      if (matches) phaseCount++
    })
    section.hidden = phaseCount === 0
    count += phaseCount
  })
  document.querySelector('#search-count').textContent = count ? `${count} of ${topicCount} topics shown` : 'No matching topics. Try another search or filter.'
  document.querySelector('#progress-count').textContent = `${completedTopics.size} of ${topicCount} completed${progressSaved ? '' : ' · Progress could not be saved on this device.'}`
  document.querySelectorAll('.phase-navigation a').forEach(link => {
    link.hidden = document.querySelector(link.getAttribute('href')).hidden
  })
}

document.querySelector('#topic-search').addEventListener('input', filterTopics)
document.querySelector('#completion-filter').addEventListener('change', filterTopics)
filterTopics()

document.addEventListener('click', event => {
  const completionButton = event.target.closest('[data-completion]')
  if (completionButton) {
    const topic = topics.find(topic => topic.id === completionButton.dataset.completion)
    if (!topic) return
    if (completedTopics.has(topic.url)) completedTopics.delete(topic.url)
    else completedTopics.add(topic.url)
    try {
      localStorage.setItem(progressKey, JSON.stringify([...completedTopics]))
      progressSaved = true
    } catch { progressSaved = false }
    const completed = completedTopics.has(topic.url)
    completionButton.setAttribute('aria-pressed', String(completed))
    completionButton.textContent = completed ? '✓ Completed — mark not completed' : 'Mark as completed'
    filterTopics()
  }
  if (event.target.closest('.theme-toggle')) {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#F3F6FC' : '#0B1220'
    try { localStorage.setItem('theme', theme) } catch { /* The toggle still works without storage. */ }
    syncThemeButtons()
  }
  const button = event.target.closest('[data-topic]')
  if (button) showTopic(button.dataset.topic)
  if (event.target.closest('.close-button') || event.target === dialog) dialog.close()
})
dialog.addEventListener('close', () => {
  // A queued close event can arrive after another topic has already reopened.
  if (dialog.open) return
  articleRequest++
  stopSidebarResize()
  document.body.classList.remove('panel-open')
  document.querySelectorAll('.topic-card.selected').forEach(card => card.classList.remove('selected'))
  const focusTarget = returnFocus?.closest('[hidden]') ? document.querySelector('#completion-filter') : returnFocus
  focusTarget?.focus({ preventScroll: true })
})
function renderRoute() {
  const isJourney = location.hash === '#journey' || location.hash.startsWith('#phase-')
  document.querySelector('#home').hidden = isJourney
  document.querySelector('#journey').hidden = !isJourney
  document.querySelector('.syllabus-link').classList.toggle('active', isJourney)
  if (dialog.open) dialog.close()
  if (location.hash.startsWith('#phase-')) {
    document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  } else window.scrollTo(0, 0)
}
window.addEventListener('hashchange', renderRoute)
renderRoute()
syncThemeButtons()
