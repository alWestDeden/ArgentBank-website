import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	userName: null,
}
// get user's profile
export function getProfile() {
	return async (dispatch, getState) => {
		// get the token from the store
		const token = getState().login.token
		try {
			const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()
			// define an user object from response
			const user = {
				email: data.body.email,
				firstName: data.body.firstName,
				lastName: data.body.lastName,
				userName: data.body.userName,
			}
			// store the user's infos
			dispatch(actions.resolved(user))
		} catch (error) {
			dispatch(actions.rejected(error))
		}
	}
}
// Get user profile's actions and reducer
const { actions, reducer } = createSlice({
	name: "user",
	initialState,
	reducers: {
		resolved: {
			// store the user's infos
			reducer: (draft, action) => {
				draft.email = action.payload.firstName
				draft.firstName = action.payload.firstName
				draft.lastName = action.payload.lastName
				draft.userName = action.payload.userName
				return
			},
		},
		rejected: {
			// reinitialize user's infos
			reducer: (draft) => {
				draft = initialState
				return
			},
		},
		update: {
			// update the userName
			reducer: (draft, action) => {
				draft.userName = action.payload
				return
			},
		},
		reset: {
			// reinitialize all
			reducer: () => initialState,
		},
	},
})
// export resolved, update and reset actions
export const { resolved, update, reset } = actions
// export the reducer
export default reducer
