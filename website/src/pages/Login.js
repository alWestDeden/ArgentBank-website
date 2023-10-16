import "../style/Login.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

function Login() {
	return (
		<div className='login-background'>
			<div className='login'>
				<FontAwesomeIcon icon={faCircleUser} />
				<h2>Sign In</h2>
				<form>
					<div className='input-wrapper'>
						<label for='username'>Username</label>
						<input type='text' id='username'></input>
					</div>
					<div className='input-wrapper'>
						<label for='password'>Password</label>
						<input type='text' id='password'></input>
					</div>
					<div className='remember-me'>
						<input type='checkbox' id='remember-me'></input>
						<label for='remember-me'>Remember me</label>
					</div>
					<button className='login-button'>Sign In</button>
				</form>
			</div>
		</div>
	)
}

export default Login
