import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "../features/verifyLogin"
import userReducer from "../features/getProfile"

export default configureStore({
	reducer: {
		login: loginReducer,
		user: userReducer,
	},
})
