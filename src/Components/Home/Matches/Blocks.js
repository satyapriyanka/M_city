import React, { Component } from 'react';
import { firebaseMatches } from '../../../firebase';

import { firebaseLooper, reverseArray } from '../../ui/misc';
import MatchesBlock from '../../ui/Matches_block';
class Blocks extends Component {
	state = {
		matches: []
	};

	componentDidMount() {
		firebaseMatches.limitToLast(6).once('value').then((snapshot) => {
			const matches = firebaseLooper(snapshot);
			this.setState({
				matches: reverseArray(matches)
			});
		});
	}

	showMatches = (matches) => {
		if (!matches || matches.length === 0) return null;

		return matches.map((match) => {
			return (
				<div className="item" key={match.id}>
					<div className="wrapper">
						<MatchesBlock match={match} />
					</div>
				</div>
			);
		});
	};

	render() {
		return <div className="home_matches">{this.showMatches(this.state.matches)}</div>;
	}
}

export default Blocks;
