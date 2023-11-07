import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyLogin } from "../../features/verifyLogin"
import * as profileActions from "../../features/getProfile"
import * as loginActions from "../../features/verifyLogin"
import "../../style/Login.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

function Login() {
	// check email format
	function checkEmail(e) {
		const userNameInput = document.getElementById("email")
		const regex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
		let resultat = regex.test(e.target.value)
		if (!resultat) {
			userNameInput.classList.add("animation")
			// create a variable pointing to the alert element
			const alert = document.getElementById("login--alert")
			alert.innerText = "Format de l'email invalide !"
			setTimeout(() => {
				userNameInput.classList.remove("animation")
				alert.innerText = ""
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
		const login = { email: formJson.email, password: formJson.password }
		const remember = formJson.rememberMe
		if (!remember) {
			setTimeout(() => {
				dispatch(profileActions.reset())
				dispatch(loginActions.reset())
				navigate("/")
			}, 180000)
		}
		//verify user login
		dispatch(verifyLogin(login, remember))
	}
	// define function navigate to use hook useNavigate in others levels
	const navigate = useNavigate()
	// check the code returned by user authentification
	const returned = useSelector((state) => state.login.returned)
	// update store when user change !!!!!!!!!???????
	useEffect(() => {
		if (returned !== null) {
			// create a variable pointing to the alert element
			const alert = document.getElementById("login--alert")
			// if user is authorized go to is account otherwise print an error
			switch (returned) {
				// if user authorized, go to his account's page
				case 200:
					navigate("/user/signup")
					break
				// if user unknown, print an error message
				case 400:
					alert.innerText = "User unknown !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// if server not working, print an error message
				case 500:
					alert.innerText = "Internal Server Error !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// if server not working, print an error message
				case "Failed to fetch":
					alert.innerText = "Failed to fetch !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// for others kind of errors, print an error message
				default:
					alert.innerText = "Error uknown !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
			}
		}
	}, [dispatch, navigate, returned])
	return (
		<div className='login-background'>
			<div className='login'>
				<FontAwesomeIcon icon={faCircleUser} />
				<h2>Sign In</h2>
				<p id='login--alert'></p>
				<form onSubmit={submitForm}>
					<div className='input-wrapper'>
						<label>Username</label>
						<input
							type='text'
							name='email'
							id='email'
							maxLength='32'
							minLength='3'
							placeholder='email'
							autoComplete='on'
							required
							onBlur={(e) => checkEmail(e)}></input>
					</div>
					<div className='input-wrapper'>
						<label>Password</label>
						<input
							type='password'
							name='password'
							maxLength='24'
							minLength='3'
							placeholder='password'
							autoComplete='on'
							required></input>
					</div>
					<div className='remember-me'>
						<input
							type='checkbox'
							name='rememberMe'
							title='Not select: logged for 3 min !&#013;Selected: logged for ever !'></input>
						<label>Remember me</label>
					</div>
					<button className='login-button'>Sign In</button>
				</form>
			</div>
		</div>
	)
}

export default Login
