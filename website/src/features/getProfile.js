import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	userName: null,
}

export function getProfile() {
	return async (dispatch, getState) => {
		const token = getState().login.token
		try {
			const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()
			const user = {
				email: data.body.email,
				firstName: data.body.firstName,
				lastName: data.body.lastName,
				userName: data.body.userName,
			}
			dispatch(actions.resolved(user))
		} catch (error) {
			dispatch(actions.rejected(error))
		}
	}
}

const { actions, reducer } = createSlice({
	name: "user",
	initialState,
	reducers: {
		resolved: {
			// la fonction de reducer
			reducer: (draft, action) => {
				draft.email = action.payload.firstName
				draft.firstName = action.payload.firstName
				draft.lastName = action.payload.lastName
				draft.userName = action.payload.userName
				return
			},
		},
		rejected: {
			// la fonction de reducer
			reducer: (draft, action) => {
				draft.error = action.payload.error
				draft = initialState
				return
			},
		},
		update: {
			// la fonction de reducer
			reducer: (draft, action) => {
				draft.userName = action.payload
				return
			},
		},
		reset: {
			reducer: () => initialState,
		},
	},
})

export const { resolved, update, reset } = actions

export default reducer
