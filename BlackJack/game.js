function game(){
	this.deck;
	this.players = [];
	this.round;
	this.autoplay_nbgames=200;
	this.futur_choices = [];
	this.displayed_choices = [];
	
	
	this.add_bot = function(){
		var new_player = new player(this.players.length);
		this.players.push(new_player);
	}
	this.add_player = function(){
		var new_player = new player(this.players.length);
		new_player.human = 1;
		this.players.push(new_player);
	}
	
	this.start = function(){
		this.deck = new deck();
		this.deck.fill(6);
		this.deck.shuffle();
		
		if (global_verbose)
			msg("============ GAME START ==============");
		this.new_round();
	}
	this.new_round = function(){
		if (this.deck.numcardsdrawn > this.deck.reshuffle){	// if end of deck end game
			this.close();
		}
		else{
			this.round = new round(this.deck, this.players);
			this.round.start();
			this.round.next_player();
			this.play_round();
		}
	}
	this.play_round = function(){
		var continue_round= 1;
		var pause_round= 0;
		
		while(continue_round){
			var player = this.round.player();
			
			while(player.hand().active && continue_round){
				// player.hand().value();
								
				var bot_choice = "";
				this.futur_choices = [];
				
				if(global_countcards == "hilo")
					bot_choice=smart_advise(this.round.dealer_hand, player.hand(), player.hands.length);
				else
					bot_choice=advise(this.round.dealer_hand, player.hand(), player.hands.length);
				
				//var bot_advice = bot_choice;
				//bot_choice= bot_choice.substring(0,5);
				
				if(player.human){
					this.futur_choices = possible_choices(this.round.dealer_hand, player.hand(), player.hands.length);
					if (this.futur_choices.length > 0){ // or ""?
						continue_round=0;
						pause_round = 1;
					}
					else{
						//bust
						player.play_hand("Stand", this.deck);
					}
				}
				else{
					player.play_hand(bot_choice, this.deck);
					if(global_verbose)
						msg("Player "+player.num+ " chose "+bot_choice);
				}
			}
			if (!pause_round && !this.round.next_player())
				continue_round = 0;
		}
		
		if (pause_round){
			display(this, bot_choice.substring(0,5));
		}
		else{ //end round
			this.round.resolve();
			
			if(global_autoplay){
				this.round.close();
				this.new_round();
			}
			else{
				this.futur_choices = ["New Round"];
				display(this);
			}
		}
	}
	this.close = function(){
	//to code 
		if (global_autoplay && this.autoplay_nbgames > 1){				
			this.autoplay_nbgames--;
			this.start();
		}
		else{
			this.futur_choices = ["New Game"];
			display(this);
		}
	}
	this.display_stats = function(){
		msg("<br>");
		for (var i=0; i<this.players.length; i++){
			var percentage = Math.round((this.players[i].totalwin - this.players[i].totalbet)*100000/this.players[i].totalbet)/1000;
			msg("Player "+i+" has a balance of "+Math.round(this.players[i].balance)+" and had "+percentage+"% winnings");
		}
	}
}
function player(_number){
	this.human = 0;
	this.balance = 1000;
	this.totalbet = 0;
	this.totalwin = 0;
	this.round_bet = 10;
	this.num = _number;
	this.hands = [];
	
	this.current_hand = 0; //number
	this.hand = function(){
		return this.hands[this.current_hand];
	}
	this.new_hand = function(_deck){
		var new_hand = new hand();
		this.bet(new_hand, _deck.hilo_true);
		new_hand.draw(_deck, false);
		new_hand.draw(_deck, false);
		this.hands.push(new_hand);
		this.current_hand=this.hands.length -1;
	}
	this.bet = function(_hand, _hilo_truecount){
		if(global_autoBetAmount == "hilo"){
			// Auto arrange bet amount
			
			if (_hilo_truecount<0)
				this.round_bet = -10*_hilo_truecount;
			else if(_hilo_truecount>0)
				this.round_bet = 10/_hilo_truecount;
			
			if (this.round_bet<2)
				this.round_bet = 2;
			else if (this.round_bet>20)
				this.round_bet = 20;
		}
		
		
		
		if (this.balance-this.round_bet >0){
			this.balance -= this.round_bet;
			this.totalbet += this.round_bet;
			_hand.stake += this.round_bet;
		}
		else{
			msg("player too poor");
			throw { name: 'FatalError', message: 'Player too poor to place a bet' };
		}
	}
	this.play_hand = function(_choice, _deck){
		if(_choice=="Surre"){
			this.hand().cards.push(0);
			this.hand().quickvalue = 0;
			this.hand().active = 0;
			this.hand().bust = 1;
			this.balance += this.round_bet/2;
			this.totalwin += this.round_bet/2;
		}
		else if(_choice=="Stand"){
			this.hand().active = 0;
		}
		else if(_choice=="Hit !"){
			this.hand().draw(_deck, true);
		}
		else if(_choice=="Doubl"){
			this.bet(this.hand(), _deck.hilo_true);
			this.hand().draw(_deck, true);
			this.hand().value();
			this.hand().active = 0;
		}
		else if(_choice=="Split"){
			var new_hand = new hand();
			new_hand.cards.push(this.hand().cards[1]); //if split, cards0 and 1 are the same
			new_hand.cards_colors.push(this.hand().cards_colors[1]);
			new_hand.draw(_deck, true);
			this.bet(new_hand, _deck.hilo_true);
			
			this.hand().cards.pop();
			this.hand().cards_colors.pop();
			this.hand().draw(_deck, true);
			
			// if (this.hand().cards[0] == 1){ //split Aces hard rule
				// if (global_verbose)
					// msg("Splitting Aces");
				// this.hand().active = 0;
				// new_hand.active = 0;
			// }
			
			this.hand().blackjack_allowed = 0;
			new_hand.blackjack_allowed = 0;
			
			this.hands.push(new_hand);
			
			if (this.hands.length > 4)
				msg(this.hands.length + "Hands. Not allowed in regular game");
				
		}
		else{ //not supposed to happen
			msg(_choice);
			throw { name: 'FatalError', message: 'Player choice not recognized: '+_choice };
		}
	}
	
	this.lose = function(){
		this.hand().active = 0;
		this.hand().last_result = "Lost";
	}
	this.push = function(){
		this.hand().active = 0;
		this.balance += this.hand().stake;
		this.totalwin += this.hand().stake;
		this.hand().last_result = "Push";
	}
	this.win = function(){
		this.hand().active = 0;
		this.balance += this.hand().stake * 2;
		this.totalwin += this.hand().stake * 2;
		this.hand().last_result = "Win";
		
	}
	this.blackjack = function(){
		this.hand().active = 0;
		this.balance += this.hand().stake * 3;
		this.totalwin += this.hand().stake * 3;
		this.hand().last_result = "Blackjack";
	}
	
	// this.draw = function(_canvas){
		// _canvas.
	// }
}
function round(_deck, _players){
	this.dealer_hand;
	this.players = _players;
	this.deck = _deck;
	// this.hands;
	// this.nb_players = players.length; //can theoretically change for each round
	
	this.current_player = -1;
	
	this.start = function(){		
		for (var num=0; num<this.players.length; num++){
			var player = this.players[num];
			player.new_hand(this.deck);
			if (player.hand().is_blackjack()){
				player.hand().active = 0
			}
		}
		
		this.dealer_hand = new hand();
		this.dealer_hand.active = 1;
		this.dealer_hand.draw(this.deck, false);
		this.deck.recount();
		this.dealer_hand.draw(this.deck, false);
		
		if (global_verbose){
			msg("The Hi lo true count is at "+this.deck.hilo_true);
		}
		if (this.dealer_hand.is_blackjack()){
			for (var i=0; i<this.players.length; i++){
				this.players[i].hand().active = 0;
			}
		}
	}
	this.player= function(){		
		return this.players[this.current_player];
	}
	this.next_player = function(){ 
		//returns false if can't find a new player
		var player = this.players[this.current_player];
		if (player!=undefined && player.current_hand < player.hands.length -1){
			player.current_hand++;
			return true;
		}
		else if( this.current_player <this.players.length -1){
			this.current_player++;
			return true;
		}
		else
			return false;
	}
	this.resolve = function(){
		this.dealer_hand.value();
		this.deck.add_count(this.dealer_hand.cards[1]); // this is the hole card revealed
		while(this.dealer_hand.quickvalue < 16){
			this.dealer_hand.draw(this.deck, true);
		}
		if (this.dealer_hand.quickvalue > 21){
			this.dealer_hand.bust = 1;
		}
		this.dealer_hand.active=0;
		if (global_verbose){
			var dealer_cards = "";
			
			for (var j=0; j<this.dealer_hand.cards.length; j++){
				dealer_cards+=this.dealer_hand.cards[j]+"  ";
			}
			msg("<b>Dealer got "+dealer_cards+"  :  "+this.dealer_hand.quickvalue+"</b>");
		}
		
		for (var num=0; num<this.players.length; num++){
			for (var hand_num=0; hand_num<this.players[num].hands.length; hand_num++){
				this.players[num].current_hand = hand_num;
				
				if (true){//this.players[num].hand().active){
					var player_value = this.players[num].hand().quickvalue;
					
					if(this.dealer_hand.is_blackjack()){
						if(this.players[num].hand().is_blackjack())
							this.players[num].push();
						else
							this.players[num].lose();
					}
					else if (this.players[num].hand().is_blackjack()){
						this.players[num].blackjack();
					}
					else if(this.players[num].hand().bust){
						this.players[num].lose();
					}
					else if(this.dealer_hand.bust){
						this.players[num].win();
					}
					else if(player_value > this.dealer_hand.quickvalue){
						this.players[num].win();
					}
					else if (player_value < this.dealer_hand.quickvalue){
						this.players[num].lose();
					}
					else if (player_value == this.dealer_hand.quickvalue){
						this.players[num].push();
					}
					
					if (global_verbose){
						var player_cards = "";
						
						for (var j=0; j<this.players[num].hand().cards.length; j++){
							var card_value = this.players[num].hand().cards[j];
							if	(card_value == 1)
								player_cards+="Ace "
							else if (is_face(card_value))
								player_cards+="10 "
							else
								player_cards+=card_value+" ";
						}
						msg("Player "+num+" got "+player_cards+"  :  "+player_value+" vs "+this.dealer_hand.quickvalue+" Balance : "+this.players[num].balance+ "</b>");
					}
				}
				else{
					//already dealt with?
					
				msg("ALERT hand not active : Player "+this.players[num].num+" got "+this.players[num].hand().cards[0]+" and "+this.players[num].hand().cards[1]+"  :  "+player_value+" Balance : "+this.players[num].balance);				
				}			
			}
		}
		
		if (global_verbose)
			msg("The Hi lo true count is at "+this.deck.hilo_true);
	}
	this.close=function(){
		//the players hands are cleaned
		for (var i=0; i<this.players.length; i++){
			this.players[i].hands = [];
			this.players[i].current_hand = 0; 
		}
	}
}
function hand(){
	this.cards = [];
	this.active = 1;
	this.bust = 0;
	this.stake = 0;
	
	this.quickvalue = 0;
	this.soft_hand = 0;
	this.last_result;
	
	this.blackjack_allowed = 1;	//Using the following after split Aces
	
	// this.player_num;
	// if (player != undefined)
		// this.player_num = player.num;
	
	this.split = 0; //split or non split hand... might not be used
	
	this.is_blackjack = function(){
		if (this.cards.length == 2 && ((this.cards[0] == 1 && is_face(this.cards[1])) || (this.cards[1] == 1 && is_face(this.cards[0]))) && this.blackjack_allowed){
			this.quickvalue = 21;
			return true
		}
		else
			return false
	}
	this.value = function(){	//return the value of the hand and nothing else. Blackjacks should be managed outside.
		this.quickvalue = 0;
		//Sort out descending (for Aces management)
		var cards_temp = [];
		for (var i=0; i<this.cards.length; i++){
			cards_temp.push(this.cards[i]);
		}
		cards_temp.sort(function(a, b){return b-a});
		var string_temp = "";
		for (var i=0; i<cards_temp.length; i++){
			string_temp+=cards_temp[i]+" ";
		}
		for (var i=0; i<cards_temp.length; i++){ //add all cards' values
			if(is_face(cards_temp[i])){
				this.quickvalue+=10;
			}
			else if (cards_temp[i] != 1){
				this.quickvalue+=cards_temp[i];
			}
			else{	//Aces
				if (i < cards_temp.length -1){
					//Can't have two 11 value Aces
					this.quickvalue+=1;
				}
				else{ // Last Ace
					if (this.quickvalue+11 > 21)
						this.quickvalue+=1;
					else{
						this.quickvalue+=11;
						this.soft_hand=1;
					}
				}
			}
		}
		if (this.quickvalue >21)
			this.bust = 1;
			
		return this.quickvalue; //useless
	}
	this.draw=function(_deck, _card_counting){ //if card counting = false the card is not counted
		var cardvalue = (_deck.give_card());
		
		if (_card_counting)
			_deck.add_count(cardvalue);
			
		this.cards.push(cardvalue);
		if(!global_autoplay){
			this.cards_colors.push(Math.floor((Math.random() * 4) + 1));
		}
		this.value();
	}
	
	//if display mode : hands have more parameters for display purposes
	if(!global_autoplay){
		this.X;
		this.Y;
		this.playernum;
		this.cards_colors = [];
		this.balance;
		
		this.display_card=function(card_number){
			var name;
			var value = this.cards[card_number];
			var color = this.cards_colors[card_number];
			if (value == 1)
				name = "ace";
			else if (value<=10)
				name = value;
			else if (value==11)
				name = "jack";
			else if (value==12)
				name = "queen";
			else if (value==13)
				name = "king";
			
			name+="_of_";
			
			if(color == undefined){
			}
			else if(color ==1)
				name+="clubs";
			else if (color ==2)
				name+="diamonds";
			else if (color ==3)
				name+="hearts";
			else if (color ==4)
				name+="spades";
			
			if(value>10 && value!=0)
				name+="2";
				
			if (value==0)
				name = "red_joker";
				
			return(name);
			
		}
		
		this.balance_text = function(){
			var _balance_text = "";
			//Round Balance to display only up to 2 decimal digits
			for (var i=0; i<(Math.round(this.balance*100)/100).toString().length; i++){
				_balance_text+=this.balance.toString().charAt(i);
				
				// if((this.balance.toString().length - i-1)%3 ==0){
					// balance_text+= " " ;
				// }
			}
			_balance_text+= " $" ;
			return (_balance_text);
		}
	}
	
}

function is_face(_card_value){
	if(_card_value == 10 || _card_value == 11 || _card_value == 12 || _card_value == 13)
		return true
	else
		return false
}

function deck(){ //the shoe
	this.nb_decks= 6;
	this.cards=[];
	this.numcardsdrawn = 0;
	
	this.reshuffle = 0;
	
	this.hilo_count=0;
	this.hilo_true=0;
	
	this.give_card = function(){
		this.numcardsdrawn++;
		if (this.cards[this.numcardsdrawn -1] == undefined)
			throw { name: 'FatalError', message: 'Drawing cards while no cards left in the deck' };
		
		return (this.cards[this.numcardsdrawn -1]);
	}
	this.recount=function(){
		this.hilo_count=0;
		for (var i=0; i<this.numcardsdrawn; i++){
			this.add_count(this.cards[i]);
		}
	}
	this.add_count=function(_new_card_value){
		if(_new_card_value>9 || _new_card_value==1)
			this.hilo_count++;
		else if(_new_card_value<7)
			this.hilo_count--;
		
		this.hilo_true=Math.round(this.hilo_count*52*10/(this.cards.length - this.numcardsdrawn))/10;
	}
	
	this.fill = function(_nb_decks){ //number of packs of 52 cards to fill the deck
		this.nb_decks=_nb_decks;
		this.cards = [];
		for (var deck=0; deck<this.nb_decks; deck++){
			for (var color=1; color<5; color++){
				for (var value=1; value<14; value++){
					this.cards.push(value);
				}
			}
		}
		this.reshuffle = this.cards.length * 3/4;
	}
	this.shuffle= function(){
		var neworder = [];
		var numberofcards = this.cards.length;
		for (var i=0; i<numberofcards; i++){
			random_card=Math.random()*(this.cards.length-1) | 0;			
			neworder.push(this.cards[random_card]);
			this.cards.splice(random_card, 1);
		}
		this.cards= neworder;
	}
	
}