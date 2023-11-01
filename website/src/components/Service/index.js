import "../../style/service.scss"

export default function Service({ type, balance, status }) {
	const amount = balance.toLocaleString("en-GB")
	return (
		<div className='service'>
			<div className='services'>
				<p>Argent Bank {type}</p>
				<h4>${amount}</h4>
				<p>{status} Balance</p>
			</div>
			<div className='transactions'>
				<button className='transaction-button'>View transactions</button>
			</div>
		</div>
	)
}
