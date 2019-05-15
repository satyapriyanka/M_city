import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import PlayerCard from '../../ui/PlayerCard';

class HomeCards extends Component {
	state = {
		cards: [
			{ left: 300, bottom: 100 },
			{ left: 200, bottom: 60 },
			{ left: 100, bottom: 30 },
			{ left: 0, bottom: 0 }
		]
	};

	renderCards = () => {
		return this.state.cards.map((card, index) => {
			return (
				<Animate
					key={index}
					show={this.props.show}
					start={{
						left: 0,
						bottom: 0
					}}
					enter={{
						left: [ card.left ],
						bottom: [ card.bottom ],
						timing: {
							duration: 500,
							ease: easePolyOut
						}
					}}
				>
					{({ left, bottom }) => {
						return (
							<div
								style={{
									position: 'absolute',
									left,
									bottom
								}}
							>
								<PlayerCard number="30" name="Nicolas Otamendi" bck={Otamendi} />
							</div>
						);
					}}
				</Animate>
			);
		});
	};

	render() {
		return this.renderCards();
	}
}

export default HomeCards;
