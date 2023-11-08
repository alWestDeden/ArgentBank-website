import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "../features/verifyLogin"
import userReducer from "../features/getProfile"

// create a store with two reducers
export default configureStore({
	reducer: {
		login: loginReducer,
		user: userReducer,
	},
})
