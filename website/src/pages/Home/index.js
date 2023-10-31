import "../../style/Home.scss"
import "../../style/global.scss"
import Banner from "../../components/Banner"
import Feature from "../../components/Feature"
import Chat from "../../assets/image/icon-chat.png"
import Money from "../../assets/image/icon-money.png"
import Security from "../../assets/image/icon-security.png"

function Home() {
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
				{/* render all apartment's cards from the JSON file */}
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
