export default async function modifyUserName(userName, token) {
	// fetch API
	try {
		const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userName),
		})
		const data = await response.json()
		// wait a resolved (code 200) answer before creating a token variable
		const code = data.status
		return code
	} catch (error) {
		// dispatch error
		return error
	}
}
