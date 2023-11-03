import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import modifyUserName from "../../features/modifyUserName"
import "../../style/Profile.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import * as profileActions from "../../features/getProfile"

function Profile() {
	// define functions dispatch & navigate to use hook useDispatch & useNavigate in others levels
	const navigate = useNavigate()
	const dispatch = useDispatch()
	//get the token and the user from the store
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.profile.user)
	const [updatable, setUpdatable] = useState(true)
	// check email format
	function checkUserName(e) {
		// create a variable pointing to the alert element
		const alert = document.getElementById("login--alert")
		let regex = new RegExp("[^a-zA-Z0-9_-]+")
		let resultat = regex.test(e.target.value)
		console.log(resultat)
		if (resultat) {
			alert.innerText = "Only letters, numbers, - and _ characters allowed!"
			setUpdatable(false)
		} else {
			alert.innerText = ""
			setUpdatable(true)
		}
	}
	// submit form
	async function submitForm(e) {
		e.preventDefault()
		if (await updatable) {
			// get form inputs values
			const form = e.target
			const formData = new FormData(form)
			const formJson = Object.fromEntries(formData.entries())
			// create an user object with the inputs values
			const userName = { userName: formJson.userName }
			const code = await modifyUserName(userName, token)
			// create a variable pointing to the alert element
			const alert = document.getElementById("login--alert")
			// if user is authorized go to is account otherwise print an error
			switch (code) {
				// if user authorized, go to his account's page
				case 200:
					navigate("/user/signup")
					dispatch(profileActions.update(userName))
					break
				// if user unknown, print an error message
				case 400:
					alert.innerText = "Invalid fields !"
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
				// for others kind of errors, print an error message
				default:
					alert.innerText = "Connection refused !"
					setTimeout(() => {
						if (alert) {
							alert.innerText = ""
						}
					}, 1000)
			}
		}
	}
	// get the various user's infos (to pre-render fields) from user
	const { email, firstName, lastName, userName } = user
	return (
		<div className='profile-background'>
			<div className=' profile'>
				<Link to='/user/signup'>
					<FontAwesomeIcon icon={faArrowLeft} className='arrow-left' />
				</Link>
				<FontAwesomeIcon icon={faCircleUser} />
				<form onSubmit={submitForm}>
					<div className='input-wrapper'>
						<label>First Name</label>
						<input type='text' name='firstName' value={firstName} disabled></input>
					</div>
					<div className='input-wrapper'>
						<label>Last Name</label>
						<input type='text' name='lastName' value={lastName} disabled></input>
					</div>
					<div className='input-wrapper'>
						<label>email</label>
						<input type='text' name='email' value={email} disabled></input>
					</div>
					<div className='input-wrapper'>
						<label>Username</label>
						<input
							type='text'
							name='userName'
							defaultValue={userName}
							onChange={(e) => {
								checkUserName(e)
								// setUserName(e.target.value)
							}}></input>
					</div>
					<p id='login--alert'> </p>
					<button className={updatable ? "profile-button" : "profile-button greyed"}>Update Profile</button>
				</form>
			</div>
		</div>
	)
}

export default Profile
