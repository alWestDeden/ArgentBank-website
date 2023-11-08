import Banner from "../../components/Banner"
import Feature from "../../components/Feature"
import Chat from "../../assets/image/icon-chat.png"
import Money from "../../assets/image/icon-money.png"
import Security from "../../assets/image/icon-security.png"
import "../../style/global.scss"
import "../../style/Home.scss"

function Home() {
	// declare an array of objects containing the various commitment of Argent Bank
	const features = [
		{
			icon: Chat,
			iconAlt: "Chat",
			title: "You are our #1 priority",
			text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
		},
		{
			icon: Money,
			iconAlt: "Money",
			title: "More savings means higher rates",
			text: "The more you save with us, the higher your interest rate will be!",
		},
		{
			icon: Security,
			iconAlt: "Security",
			title: "Security you can trust",
			text: "We use top of the line encryption to make sure your data and money is always safe.",
		},
	]
	return (
		<div className='home'>
			<Banner />
			<section className='features'>
				{/* render all commitment's cards from the array above */}
				{features.map((feature) => (
					<Feature
						key={feature.iconAlt}
						icon={feature.icon}
						iconAlt={feature.iconAlt}
						title={feature.title}
						text={feature.text}
					/>
				))}
			</section>
		</div>
	)
}
export default Home
