// import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// import { getProfile } from "../../features/getProfile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import argentBankLogo from "../../assets/image/argentBankLogo.png"
import "../../style/header.scss"
import * as loginActions from "../../features/verifyLogin"
import * as profileActions from "../../features/getProfile"

function Header() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	// useEffect(() => {
	// 	dispatch(profileActions.resolved(user))
	// }, [dispatch, user])

	function logOut() {
		dispatch(loginActions.reset())
		dispatch(profileActions.reset())
	}

	if (user.userName !== null) {
		const userName = user.userName
		return (
			<nav className='header'>
				{/* link to the Home's URL */}
				<div>
					<Link to='/'>
						<img src={argentBankLogo} alt='ArgentBank logo' />
					</Link>
				</div>
				<div>
					<Link to='/user/signup' className='user'>
						<FontAwesomeIcon icon={faRightFromBracket} />
						{userName}
					</Link>
					<Link to='/' onClick={() => logOut()}>
						<FontAwesomeIcon icon={faCircleUser} />
						Sign Out
					</Link>
				</div>
			</nav>
		)
	} else {
		return (
			<nav className='header'>
				{/* link to the Home's URL */}
				<div>
					<Link to='/'>
						<img src={argentBankLogo} alt='ArgentBank logo' />
					</Link>
				</div>
				<div>
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
