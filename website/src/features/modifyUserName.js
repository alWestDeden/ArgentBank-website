// update the Username
export default async function modifyUserName(userName, token) {
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
		// return the code to print an alert if necessary
		const code = data.status
		return code
	} catch (error) {
		// return an error to print an alert
		return error
	}
}
