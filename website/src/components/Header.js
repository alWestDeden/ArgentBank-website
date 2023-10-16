import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
// import { faRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import argentBankLogo from "../assets/image/argentBankLogo.png"
import "../style/header.scss"

function Header() {
	return (
		<nav className='header'>
			{/* link to the Home's URL */}
			<Link to='/'>
				<img src={argentBankLogo} alt='ArgentBank logo' />
			</Link>
			<div>
				{/* link to the User's Profile URL */}
				{/* <Link to='/user/profile'>
					<FontAwesomeIcon icon={faCircleUser} />
					{userName}
				</Link> */}
				{/* link to the Home's URL */}
				<Link to='/'>
					<FontAwesomeIcon icon={faRightFromBracket} />
					Sign Out
				</Link>
			</div>
		</nav>
	)
}

export default Header
