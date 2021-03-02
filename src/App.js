import {Suspense, lazy} from 'react'
import './App.css'
import 'antd/dist/antd.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {Switch, Route} from 'react-router-dom'
import Loading from './components/Loading'
import Login from './pages/Login'
import Register from './pages/Register'
// import Home from './pages/Home'
// import History from './pages/History'
// import About from './pages/About'
const Home = lazy(() => import('./pages/Home'))
const History = lazy(() => import('./pages/History'))
const About = lazy(() => import('./pages/About'))

function App() {
	return (
		<>
			<Header/>
			<main>
				<Suspense fallback = {<Loading/>}>
					<Switch>
						<Route path = "/" exact component = {Home}/>
						<Route path = "/history" component = {History}/>
						<Route path = "/about" component = {About}/>
						<Route path = "/Login" component = {Login}/>
						<Route path = "/Register" component = {Register}/>
					</Switch>
				</Suspense>
			</main>
			<Footer/>
		</>
	)
}

export default App
