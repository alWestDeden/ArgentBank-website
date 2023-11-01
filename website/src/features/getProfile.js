import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	status: "void",
	user: null,
	error: null,
	logged: false,
}

export function getProfile() {
	return async (dispatch, getState) => {
		const token = getState().login.token
		const status = getState().profile.status
		if (status === "pending" || status === "updating") {
			return
		}
		dispatch(actions.fetching(token))
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
	name: "profile",
	initialState,
	reducers: {
		fetching: {
			// la fonction de reducer
			reducer: (draft, action) => {
				if (draft.status === "void") {
					draft.status = "pending"
					return
				}
				if (draft.status === "rejected") {
					draft.error = null
					draft.status = "pending"
					return
				}
				if (draft.status === "resolved") {
					draft.status = "updating"
					return
				}
			},
		},
		resolved: {
			// la fonction de reducer
			reducer: (draft, action) => {
				// const { email, firstName, lastName, userName } = action.payload.profile
				// console.log(email, firstName, lastName, userName)
				if (draft.status === "pending" || draft.status === "updating") {
					draft.user = action.payload
					draft.logged = true
					draft.status = "resolved"
					return
				}
				return
			},
		},
		rejected: {
			// la fonction de reducer
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.error = action.payload.error
					draft.user = null
					draft.logged = false
					draft.status = "rejected"
					return
				}
				return
			},
		},
		reset: {
			reducer: () => initialState,
		},
	},
})

export const { resolved, reset } = actions

export default reducer
