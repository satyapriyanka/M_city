import React from 'react';
import Featured from './Featured';
import MatchesHome from './Matches';
import MeetPlayers from './MeetPlayers';
import Promotion from './Promotions';

const Home = () => {
	return (
		<div className="bck_blue">
			<Featured />
			<MatchesHome />
			<MeetPlayers />
			<Promotion />
		</div>
	);
};

export default Home;
