import './Header.css'

function Header() {
  return (
    <header className="header-container">
      <span className="introduction">
        <h1>
          Nice to meet you, I&apos;m{' '}
          <span className="glitch">
            <span aria-hidden="true">Huy</span>
            <span aria-hidden="true">Huy</span>
            <span>Huy</span>
          </span>
        </h1>
      </span>
    </header>
  )
}

export default Header
