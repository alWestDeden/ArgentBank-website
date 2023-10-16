import bankTree from "../assets/image/bank-tree.jpeg"
import "../style/banner.scss"

function Banner() {
	return (
		<div className='banner'>
			{/* generate a banner with text for the Home's banner (property === landscape_1) */}
			<img src={bankTree} alt='a sprout grows in a pot full of euro coins' />
			<div className='overlay'>
				<h2>No fees.</h2>
				<h2>No minimum deposit.</h2>
				<h2>High interest rates.</h2>
				<p>Open a savings account with Argent Bank today!</p>
			</div>
		</div>
	)
}

export default Banner
