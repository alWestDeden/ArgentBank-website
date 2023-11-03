import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../../features/getProfile"
import Service from "../../components/Service"
import "../../style/User.scss"
import { useNavigate } from "react-router-dom"

export default function User() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// const navigate = useNavigate()
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.user)

	useEffect(() => {
		dispatch(getProfile(token))
	}, [dispatch, token])

	const services = [
		{
			type: "Checking (x8349)",
			balance: 2082.79,
			status: "Available",
		},
		{
			type: "Savings (x6712)",
			balance: 10928.42,
			status: "Available",
		},
		{
			type: "Checking (x8349)",
			balance: 184.3,
			status: "Current",
		},
	]
	if (user !== null) {
		const lastName = user.lastName
		const firstName = user.firstName

		// window.addEventListener("mousemove", (e) => {
		// 	const duration = 5000
		// 	setTimeout(() => {
		// 		dispatch(loginActions.reset())
		// 		dispatch(profileActions.reset())
		// 		navigate("/")
		// 	}, duration)
		// })

		return (
			<div className='user-page'>
				<div className='welcome'>
					<p>Welcome Back</p>
					<p>
						{firstName} {lastName}!
					</p>
				</div>
				<button className='edit-name' onClick={() => navigate("/user/profile")}>
					Edit Name
				</button>
				{services.map((service, index) => (
					<Service key={index} type={service.type} balance={service.balance} status={service.status} />
				))}
			</div>
		)
	}
}
