import { selectLogin } from "../utils/selectors"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	status: "void",
	token: "",
	error: null,
	code: null,
}

export function verifyLogin(user) {
	// use a asynchronous thunk
	return async (dispatch, getState) => {
		// check if any request allready pending
		const selectLoginByUser = selectLogin(user)
		const status = selectLoginByUser(getState()).status
		if (status === "pending" || status === "updating") {
			return
		}
		// wait untill user is defined before calling the API (at first render use is undefined)
		if (user !== undefined) {
			// fetch API
			dispatch(actions.fetching(user))
			try {
				const response = await fetch(`http://localhost:3001/api/v1/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				})
				const data = await response.json()
				// wait a resolved (code 200) answer before creating a token variable
				const code = data.status
				if (code === 200) {
					const token = data.body.token
					// dispatch token
					dispatch(actions.resolved(token))
				} else {
					// dispatch code to print an error message
					dispatch(actions.code(code))
				}
			} catch (error) {
				// dispatch error
				dispatch(actions.rejected(error))
			}
		}
	}
}

const { actions, reducer } = createSlice({
	name: "login",
	initialState,
	reducers: {
		fetching: {
			// change state status regarding previous state
			reducer: (draft) => {
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
			// store the token, define the code as 200 (success) and the status to resolved
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.token = action.payload
					draft.code = 200
					draft.status = "resolved"
					return
				}
				return
			},
		},
		rejected: {
			// store the error message, pass the status to rejected and reinitialize the orthers states
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.error = action.payload.message
					draft.token = null
					draft.status = "rejected"
					return
				}
				return
			},
		},
		code: {
			// store the error code returned, pass the status to rejected and reinitialize the others states
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.code = action.payload
					draft.token = null
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

export const { reset } = actions

export default reducer
