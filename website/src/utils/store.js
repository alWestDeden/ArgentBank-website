import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "../features/verifyLogin"
import profileReducer from "../features/getProfile"

export default configureStore({
	reducer: {
		login: loginReducer,
		profile: profileReducer,
	},
})
