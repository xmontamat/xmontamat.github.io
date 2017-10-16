function advise(_dealer_card_hand, _player_hand, _nb_hands){ //no blackjacks here
	var player = _player_hand.quickvalue;
	var dealer_card = _dealer_card_hand.cards[0];
	
	if (player>21){
		_player_hand.bust = 1;
		return "Stand";
	}
	else if(player > 18){
		return "Stand";
	}
	//pairs (not tens & not fives)
	else if (_player_hand.cards.length == 2 && _player_hand.cards[0] == _player_hand.cards[1] && player != 10 && _nb_hands<4){ 
		if(_player_hand.cards[0] == 1 || _player_hand.cards[0] == 8)
			return "Split";
		else if(_player_hand.cards[0] == 9){
			if (dealer_card <10 && dealer_card !=7  && dealer_card !=1)
				return "Split";
			else
				return "Stand";
		}
		else if(dealer_card >7 || dealer_card == 1)
			return "Hit !";
		else if(_player_hand.cards[0] == 4){
			if (dealer_card!= 5 && dealer_card!= 6)
				return "Stand";
			else
				return "Split";
		}
		else if(dealer_card==7 && _player_hand.cards[0]==6) // One case
			return "Stand";
		else 
			return "Split";
	}
	else if (player < 9){
		return "Hit !";
	}
	//Soft hand below 19
	else if (_player_hand.soft_hand){
		if(player == 18){
			if (dealer_card>8 || dealer_card==1)
				return "Hit !";
			else if (dealer_card==2 || dealer_card==7 || dealer_card==8)
				return "Stand";
			else
				return "Doubl";
		}
		else if(dealer_card > 6 || dealer_card == 1 || dealer_card == 2)
			return "Hit !";
		else if(dealer_card == 5 || dealer_card == 6)
			return "Doubl";
		else if((dealer_card == 4 && player >14 )||(dealer_card ==3 && player == 17)) //dealer_card 3 or 4
			return "Doubl";
		else
			return "Hit !";
	}
	//regular hands
	else if (player >16)
		return "Stand";
	else if (_nb_hands == 1 && _player_hand.cards.length == 2 && (player ==16 && (dealer_card>8 ||dealer_card==1) || (player==15 && dealer_card>9)))
		return "Surre";
	else if (dealer_card == 1)
		return "Hit !";
	else if (dealer_card >6 && player>11)
		return "Hit !";
	else if (dealer_card < 7 && player>11){
		if (player == 12 && dealer_card < 4)
			return "Hit !";
		else
			return "Stand";
	}
	else if (player ==9 && (dealer_card == 2 || dealer_card >6))
		return "Hit !";
	else if (player == 10 && dealer_card >9)
		return "Hit !";
	else
		return "Doubl";
}

function smart_advise(_dealer_card_hand, _player_hand, _nb_hands, _hilo_true){ //no blackjacks here
	var player = _player_hand.quickvalue;
	var dealer_card = _dealer_card_hand.cards[0];
	
	// if( _hilo_true >2 ){
		// if ((player == 13 && dealer_card==3) || (player == 12 && dealer_card==5))
			// return "Hit !";
	// }
	// if( _hilo_true >1 ){
		// if ((player == 12 && dealer_card==6) || (player == 13 && dealer_card==2))
			// return "Hit !";
	// }
	// if( _hilo_true >0 ){
		// if ((player == 12 && dealer_card==4) || (player == 16 && dealer_card>9))
			// return "Hit !"; //else stand
		// if((player == 15 && dealer_card>9) || _nb_hands!=1 || _player_hand.cards.length > 2)
			// return "Hit !"; //else surrender
	// }
	// if( _hilo_true <-1 ){
		// if ((player == 11 && dealer_card==1) || (player == 9 && dealer_card==2))
			// return "Stand";
		// if(player == 15 && dealer_card==1 && nb_hands==1 && _player_hand.cards.length==2)
			// return "Surrender";
	// }
	// if( _hilo_true <-2 ){
		// if (player == 12 && dealer_card==3)
			// return "Stand";
		// if(player == 15 && dealer_card==9 && nb_hands==1 && _player_hand.cards.length==2)
			// return "Surrender";
	// }
	// if( _hilo_true <-3 ){
		// if (player == 12 && dealer_card==2)
			// return "Stand";
		// if (player == 9 && dealer_card==7)
			// return "Double";
		// if(player == 14 && dealer_card>9 && nb_hands==1 && _player_hand.cards.length==2)
			// return "Surrender";
	// }
	// if( _hilo_true <-4 ){
		// if (player == 15 && dealer_card>9)
			// return "Stand";
		// if ((player == 10 && dealer_card>9)|| (player == 10 && dealer_card==1))
			// return "Double";
		// if(_player_hand.cards.length==2 && _player_hand.cards[0] == _player_hand.cards[1] && _player_hand.cards[0] > 9 && dealer_card==6 && _nb_hands<4)
			// return "Split";
	// }
	// if( _hilo_true <-5 ){
		// if(_player_hand.cards.length==2 && _player_hand.cards[0] == _player_hand.cards[1] && _player_hand.cards[0] > 9 && dealer_card==5 && _nb_hands<4)
			// return "Split";
	// }
	
	return advise(_dealer_card_hand, _player_hand, _nb_hands);
}

function possible_choices(_dealer_card_hand, _player_hand, _nb_hands){ //no blackjacks here
	var player = _player_hand.quickvalue;
	var dealer_card = _dealer_card_hand.cards[0];
	
	var return_choices=[];
	
	if (player>21){ // was 20? why?
		_player_hand.bust = 1;
		//auto stand afterward
	}
	else{
		return_choices.push("Stand");
		return_choices.push("Hit !");
		if (_player_hand.cards.length == 2 ){
			return_choices.push("Doubl");
		}
		if (_player_hand.cards.length == 2 && _player_hand.cards[0] == _player_hand.cards[1] && _nb_hands<4){
			return_choices.push("Split");
		}
		if (_player_hand.cards.length == 2 && _nb_hands==1){
			return_choices.push("Surre");
		}
	}
	
	return (return_choices);
}