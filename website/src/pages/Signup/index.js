import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { selectProfile } from "../../utils/selectors"
import { getProfile } from "../../features/getProfile"

export default function Signup() {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.login.token)

	useEffect(() => {
		dispatch(getProfile(token))
	}, [dispatch, token])

	// const profile = useSelector(selectProfile(token))
}
