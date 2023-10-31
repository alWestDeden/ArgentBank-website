import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyLogin } from "../../features/verifyLogin"
import "../../style/Login.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

function Login() {
	const [user, setUser] = useState()
	// check email format
	function checkEmail(e) {
		let regex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
		let resultat = regex.test(e.target.value)
		if (!resultat) {
			document.getElementById("login--alert").innerText = "Format de l'email invalide !"
			setTimeout(() => {
				document.getElementById("login--alert").innerText = ""
			}, 2000)
		}
	}
	// define functions dispatch to use hook useDispatch in others levels
	const dispatch = useDispatch()
	// submit form
	async function submitForm(e) {
		e.preventDefault()
		// get form inputs values
		const form = e.target
		const formData = new FormData(form)
		const formJson = Object.fromEntries(formData.entries())
		// create an user object with the inputs values
		const userInfo = { email: formJson.email, password: formJson.password }
		setUser(userInfo)
	}
	// define function navigate to use hook useNavigate in others levels
	const navigate = useNavigate()
	// check the code returned by user authentification
	const code = useSelector((state) => state.login.code)
	// update store when user change !!!!!!!!!???????
	useEffect(() => {
		if (user) {
			//verify user login
			dispatch(verifyLogin(user))
			// create a variable pointing to the alert element
			const alert = document.getElementById("login--alert")
			// if user is authorized go to is account otherwise print an error
			switch (code) {
				// if user authorized, go to his account's page
				case 200:
					navigate("/user/signup")
					break
				// if user unknown, print an error message
				case 400:
					alert.innerText = "Utilisateur non autorisé !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// if server not working, print an error message
				case 500:
					alert.innerText = "Erreur interne au serveur !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// for others kind of errors, print an error message
				default:
					alert.innerText = "Pas de réponse du serveur !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
			}
		}
	}, [dispatch, navigate, user, code])
	return (
		<div className='login-background'>
			<div className='login'>
				<FontAwesomeIcon icon={faCircleUser} />
				<h2>Sign In</h2>
				<p id='login--alert'></p>
				<form onSubmit={submitForm}>
					<div className='input-wrapper'>
						<label>User's email</label>
						<input type='text' name='email' onBlur={(e) => checkEmail(e)}></input>
					</div>
					<div className='input-wrapper'>
						<label>Password</label>
						<input type='password' name='password'></input>
					</div>
					<div className='remember-me'>
						<input type='checkbox' name='rememberMe'></input>
						<label>Remember me</label>
					</div>
					<button className='login-button'>Sign In</button>
				</form>
			</div>
		</div>
	)
}

export default Login
