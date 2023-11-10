import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyLogin } from "../../features/verifyLogin"
import * as profileActions from "../../features/getProfile"
import * as loginActions from "../../features/verifyLogin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import "../../style/Login.scss"

function Login() {
	// check email format
	function checkEmail(e) {
		const userNameInput = document.getElementById("email")
		const regex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
		let resultat = regex.test(e.target.value)
		// when the entry is wrong...
		if (!resultat) {
			// animate the input (shaking)...
			userNameInput.classList.add("animation")
			// and print an alert.
			const alert = document.getElementById("login--alert")
			alert.innerText = "Format de l'email invalide !"
			setTimeout(() => {
				// after 2s stop the input's shaking and the alert's print
				userNameInput.classList.remove("animation")
				alert.innerText = ""
			}, 2000)
		}
	}
	// define function dispatch and navigate to use hook useDispatch and useNavigate in others levels
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// submit login form
	async function submitForm(e) {
		e.preventDefault()
		// get form's inputs values
		const form = e.target
		const formData = new FormData(form)
		const formJson = Object.fromEntries(formData.entries())
		// create an user object with the inputs values
		const login = { email: formJson.email, password: formJson.password }
		const remember = formJson.rememberMe
		// if "Remember Me" is not checked: remove all elemnents from the store and return to Home Page after 3min
		if (!remember) {
			setTimeout(() => {
				dispatch(profileActions.reset())
				dispatch(loginActions.reset())
				navigate("/")
			}, 180000)
		}
		// verify user login
		dispatch(verifyLogin(login))
	}
	// check the code returned by user authentification
	const returned = useSelector((state) => state.login.returned)
	// update Page when code returned change
	useEffect(() => {
		// prevent error when first rendering the Page
		if (returned !== null) {
			// if user is authorized go to is account otherwise print an error
			const alert = document.getElementById("login--alert")
			switch (returned) {
				// user authorized
				case 200:
					navigate("/user/signup")
					break
				// user unknown
				case 400:
					alert.innerText = "User unknown !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// server not working
				case 500:
					alert.innerText = "Internal Server Error !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// server not working
				case "Failed to fetch":
					alert.innerText = "Failed to fetch !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
					break
				// others kind of errors
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
							// check email format
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
							// show a tooltip to explain the use of the checkbox "Remember me"
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
