import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	status: "void",
	token: null,
	returned: null,
}
// Verify log in
export function verifyLogin(login) {
	// use a asynchronous thunk
	return async (dispatch, getState) => {
		// check if any request allready pending
		const status = getState().login.status
		if (status === "pending" || status === "updating") {
			return
		}
		// fetch API
		dispatch(actions.fetching(login))
		try {
			const response = await fetch(`http://localhost:3001/api/v1/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(login),
			})
			const data = await response.json()
			// wait a resolved answer (code 200) before saving the token in the store
			const code = data.status
			if (code === 200) {
				const token = data.body.token
				// dispatch token
				dispatch(actions.resolved(token))
			} else {
				// dispatch code to print an error message
				dispatch(actions.returned(code))
			}
		} catch (error) {
			// dispatch error to print an error message
			dispatch(actions.returned(error.message))
		}
	}
}
// Verify log in's actions and reducer
const { actions, reducer } = createSlice({
	name: "login",
	initialState,
	reducers: {
		fetching: {
			// change status regarding previous state
			reducer: (draft) => {
				if (draft.status === "void") {
					draft.status = "pending"
					return
				}
				if (draft.status === "rejected") {
					draft.returned = null
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
			// store the token, define the code as 200 (success) and the status to resolved
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.token = action.payload
					draft.returned = 200
					draft.status = "resolved"
					return
				}
				return
			},
		},
		returned: {
			// store the error message, reinitialize the token, pass the status to rejected
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.returned = action.payload
					draft.token = null
					draft.status = "rejected"
					return
				}
				return
			},
		},
		reset: {
			// reinitialize all
			reducer: () => initialState,
		},
	},
})
// export reset action
export const { reset } = actions
// export reducer
export default reducer
