import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as loginActions from "../../features/verifyLogin"
import * as profileActions from "../../features/getProfile"
import argentBankLogo from "../../assets/image/argentBankLogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import "../../style/header.scss"

function Header() {
	// define functions dispatch to use hook useDispatch in others levels
	const dispatch = useDispatch()
	// get the user from the store
	const user = useSelector((state) => state.user)
	// when loging out restore all store value to initial
	function logOut() {
		dispatch(loginActions.reset())
		dispatch(profileActions.reset())
	}
	// when logged print the Username
	if (user.userName !== null) {
		const userName = user.userName
		return (
			<nav className='header'>
				<div>
					<Link to='/'>
						<img src={argentBankLogo} alt='ArgentBank logo' />
					</Link>
				</div>
				<div className='right-header'>
					{/* Username */}
					<Link to='/user/signup' className='user'>
						<FontAwesomeIcon icon={faRightFromBracket} />
						{userName}
					</Link>
					{/* Sign Out */}
					<Link to='/' onClick={() => logOut()}>
						<FontAwesomeIcon icon={faCircleUser} />
						Sign Out
					</Link>
				</div>
			</nav>
		)
		// when not logged, no Username
	} else {
		return (
			<nav className='header'>
				<div>
					<Link to='/'>
						<img src={argentBankLogo} alt='ArgentBank logo' />
					</Link>
				</div>
				<div>
					{/* Sign In */}
					<Link to='/user/login'>
						<FontAwesomeIcon icon={faCircleUser} />
						Sign In
					</Link>
				</div>
			</nav>
		)
	}
}
export default Header
