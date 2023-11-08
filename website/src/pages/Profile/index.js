import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as profileActions from "../../features/getProfile"
import modifyUserName from "../../features/modifyUserName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import "../../style/Profile.scss"

function Profile() {
	// define functions dispatch & navigate to use hook useDispatch & useNavigate in others levels
	const navigate = useNavigate()
	const dispatch = useDispatch()
	// get the token and the user from the store
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.user)
	// define an updatable state to change the color of the submit button
	const [updatable, setUpdatable] = useState(true)
	// check Username format
	function checkUserName(e) {
		const userNameInput = document.getElementById("userName")
		const alert = document.getElementById("login--alert")
		let regex = new RegExp("[^a-zA-Z0-9_-]+")
		let resultat = regex.test(e.target.value)
		// when the entry is wrong
		if (resultat) {
			// animate the input
			userNameInput.classList.add("animation")
			// print an alert message
			alert.innerText = "Only letters, numbers, - and _ characters allowed!"
			// can't update the Username with the current entry
			setUpdatable(false)
		} else {
			//stop the animation and the alert message
			userNameInput.classList.remove("animation")
			alert.innerText = ""
			// can update the Username with the current entry
			setUpdatable(true)
		}
	}
	// submit Username form
	async function submitForm(e) {
		e.preventDefault()
		// when the Username is updatable
		if (await updatable) {
			// get form inputs values
			const form = e.target
			const formData = new FormData(form)
			const formJson = Object.fromEntries(formData.entries())
			// create an user object with the inputs values
			const userName = { userName: formJson.userName }
			const code = await modifyUserName(userName, token)
			// if user is authorized go to is account otherwise print an error
			const alert = document.getElementById("login--alert")
			switch (code) {
				// user authorized, go to his account's page
				case 200:
					navigate("/user/signup")
					// update the store with the new Username
					dispatch(profileActions.update(formJson.userName))
					break
				// user unknown
				case 400:
					alert.innerText = "Invalid fields !"
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
				// others kind of errors
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
	// get the various user's infos to complete the fields
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
							id='userName'
							maxLength='16'
							defaultValue={userName}
							// check Username format
							onChange={(e) => {
								checkUserName(e)
							}}></input>
					</div>
					<p id='login--alert'> </p>
					{/* change the button regarding updatable state */}
					<button className={updatable ? "profile-button" : "profile-button greyed"}>Update Profile</button>
				</form>
			</div>
		</div>
	)
}
export default Profile
