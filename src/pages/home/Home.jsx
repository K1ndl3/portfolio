import NavBar from '../../components/navbar/NavBar'
import Header from '../../components/header/Header'
import PersonalStatement from '../../components/personal-statement/PersonalStatement'
import Showcase from '../../components/showcase/Showcase'
import './Home.css'

function Home() {
  return (
    <main className="home">
      <NavBar />
      <Header />
      <PersonalStatement />
      <Showcase />
    </main>
  )
}

export default Home
