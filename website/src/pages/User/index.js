import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Service from "../../components/Service"
import { getProfile } from "../../features/getProfile"
import "../../style/User.scss"

export default function User() {
	// define function dispatch and navigate to use hook useDispatch and useNavigate in others levels
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// get the token and the user from the store
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.user)
	// get the user when rendering the Page
	useEffect(() => {
		dispatch(getProfile(token))
	}, [dispatch, token])
	// declare an array of objects containing the various account's infos
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
	// get the last and first names from the store
	const lastName = user.lastName
	const firstName = user.firstName
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
			{/* render all accounts from the array above */}
			{services.map((service, index) => (
				<Service key={index} type={service.type} balance={service.balance} status={service.status} />
			))}
		</div>
	)
}
