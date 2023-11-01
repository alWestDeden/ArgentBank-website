import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./utils/store"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import User from "./pages/User"

const domNode = document.getElementById("root")
const root = createRoot(domNode)

root.render(
	<React.StrictMode>
		<Router basename='/ArgentBank-website'>
			<Provider store={store}>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/user/login' element={<Login />} />
					<Route path='/user/signup' element={<User />} />
					{/* <Route path='/user/profile' element={<Profile />} />
					<Route path='*' element={<Error />} /> */}
				</Routes>
				<Footer />
			</Provider>
		</Router>
	</React.StrictMode>
)
