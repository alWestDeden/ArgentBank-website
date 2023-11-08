import "../../style/feature.scss"

function Feature({ icon, iconAlt, title, text }) {
	return (
		<div className='feature'>
			<img src={icon} alt={iconAlt} />
			<h3>{title}</h3>
			<p>{text}</p>
		</div>
	)
}
export default Feature
