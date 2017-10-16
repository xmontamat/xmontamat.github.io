function init_canvas(){
	
}
function display(_game, bot_advice){
	_game.displayed_choices = [];
	for (var i=0; i<_game.futur_choices.length; i++){
		var display_choice = new choice();
		display_choice.type=_game.futur_choices[i];
		display_choice.init();
		_game.displayed_choices.push(display_choice);
	}
	
	main_canvas.width=1861*ratio();
	main_canvas.height=950*ratio();
	main_canvas.addEventListener("mousedown", getPosition, false);
	var main= main_canvas.getContext("2d");
	var font_size = 18*ratio();
	main.font=Math.round(font_size)+"px Georgia";
	main.shadowColor = "grey";
	
	//---------DEALER--------
	var _dealer_hand = _game.round.dealer_hand;
	_dealer_hand.X = (1861/2)*ratio();
	_dealer_hand.Y =  80*ratio();
	_dealer_hand.playernum="dealer";
	
	//---------PLAYERS--------		
	for (var i=0; i<_game.players.length; i++){
		for (var j=0; j<_game.players[i].hands.length; j++){
			var _player_hand = _game.players[i].hands[j];
			_player_hand.X = (1800-(i+(((j+1)/(_game.players[i].hands.length+1))))*1800/_game.players.length)*ratio();
			_player_hand.Y =  330*ratio();
			_player_hand.playernum=i;			
			_player_hand.balance=_game.players[i].balance;	
		}
	}
	
	main.clearRect(0,0,main_canvas.width, main_canvas.height);
	//---------DEALER--------
	var image = document.getElementById(_dealer_hand.display_card(0));
	draw_card(main, image, _dealer_hand.X, _dealer_hand.Y);
	if(_dealer_hand.active){
		image = document.getElementById("card_back");
		var dealer_text= "Dealer"; 
	}
	else{
		image = document.getElementById(_dealer_hand.display_card(1));
		var dealer_text= "Dealer ("+_dealer_hand.quickvalue+")"; 
	}
	main.fillText(dealer_text, _dealer_hand.X, _dealer_hand.Y-34*ratio());
		
	draw_card(main, image, _dealer_hand.X+30, _dealer_hand.Y+30);
	
	//display cards after 3
	for (var card=2; card<_dealer_hand.cards.length; card++){
		image = document.getElementById(_dealer_hand.display_card(card));
		draw_card(main, image, _dealer_hand.X+card*30, _dealer_hand.Y+card*30);
	}
	if(_dealer_hand.is_blackjack()){
		main.fillText("! Blackjack !",  _dealer_hand.X, _dealer_hand.Y - 6*ratio());
	}
	else if(_dealer_hand.bust){
		main.fillText("-- Bust --",  _dealer_hand.X, _dealer_hand.Y - 6*ratio());
	}
	//---------PLAYERS--------
	for (var i=0; i<_game.players.length; i++){
		for (var j=0; j<_game.players[i].hands.length; j++){
			var _player_hand = _game.players[i].hands[j];
			for (var card=0; card<_player_hand.cards.length; card++){
				
				image = document.getElementById(_player_hand.display_card(card));
				
				if(_player_hand.active == 0)
					main.globalAlpha = 0.6;
				
				
				draw_card(main, image, _player_hand.X+card*30, _player_hand.Y+card*30);
				main.globalAlpha = 1;
				
			}
			//blackjack
			if(_player_hand.is_blackjack()){
				main.fillText("-- Blackjack --",   _player_hand.X, _player_hand.Y - 6*ratio());
			}
			if(_player_hand.bust){
				main.fillText("-- Bust --",  _player_hand.X, _player_hand.Y - 6*ratio());
			}
				
				
			if (_game.players[i].human){
				text1 = "Player"//+"  ("+_player_hand.quickvalue+")";
				main.fillStyle ='#880000';
			}
			else{
				var text1 = "Bot "+_game.players[i].num+"  ("+_player_hand.quickvalue+")";
				main.fillStyle ='#000000';
			}
				
				
				
			var text2 = _player_hand.balance_text();
			//player number
			main.fillText(text1, _player_hand.X, _player_hand.Y+275*ratio());
			//balance
			main.drawImage(balance, _player_hand.X, _player_hand.Y+285*ratio(), 33*ratio(), 33*ratio());
			main.fillText(text2, _player_hand.X+40*ratio(), _player_hand.Y+305*ratio());
			
			
			//VALUE of the hand
			main.fillText("Score : "+_player_hand.quickvalue, _player_hand.X, _player_hand.Y+345*ratio());
			//Last win/lose result
			if(_player_hand.last_result != undefined)
				main.fillText("-- "+_player_hand.last_result+" --", _player_hand.X, _player_hand.Y - 25*ratio());
			
		}
	}
	
	//Display Decks :
	image = document.getElementById("card_back");
	var nb_cards_left = _game.deck.cards.length - _game.deck.numcardsdrawn;
	for (var i=0; i<nb_cards_left; i++){
		if (i%5==0)
			draw_card(main, image, 1550*ratio(), 50*ratio()+i/10);
	}
	main.fillText("Cards left : "+nb_cards_left, 1550*ratio(), 40*ratio());
	
	//bot advice
	if (bot_advice !=undefined){
		main.fillText("Best choice : "+bot_advice, 150*ratio(), 900*ratio());
	}
	
	//Hilo count
	if (global_countcards =="hilo"){
		main.fillText("HiLo count : "+_game.deck.hilo_count, 150*ratio(), 100*ratio());
		main.fillText("HiLo true count : "+_game.deck.hilo_true, 150*ratio(), 150*ratio());
	}
	
	//Display Choices
	for (var i=0; i<_game.displayed_choices.length; i++){
		draw_button(main, _game.displayed_choices[i].text, "#ffffff", _game.displayed_choices[i].X, _game.displayed_choices[i].Y, font_size);
		// main.fillText(_game.displayed_choices[i].text, _game.displayed_choices[i].X, _game.displayed_choices[i].Y);
		// main.rect(_game.displayed_choices[i].X, _game.displayed_choices[i].Y,60,30);
		// main.stroke();
	}
}
function draw_button(_canvas, _text, _color, _X, _Y, _font_size){
	var circ_rad = 40*ratio();
	_canvas.beginPath();
	_canvas.arc(_X, _Y, circ_rad, 0, 2 * Math.PI, false);
	_canvas.lineWidth = 1;
	
	var btn_image;
	
	if (_text=="Hit"){
		// _color = "#ddffdd"
		btn_image = window.document.getElementById("hit");
	}
	else if (_text=="Stand"){
		// _color = "#ffdddd"
		btn_image = window.document.getElementById("stand");
	}
	else if (_text=="Surrender"){
		// _color = "#999999"
		btn_image = window.document.getElementById("surrender");
	}
	else if (_text=="Double"){
		// _color = "#BBEEBB"
		btn_image = window.document.getElementById("double");
	}
	else if (_text=="New Round"){
		// _color = "#BBBBFF"
		btn_image = window.document.getElementById("new");
	}
	else if (_text=="New Game"){
		// _color = "#FFEEFF"	
		btn_image = window.document.getElementById("new");
	}
	else if (_text=="Split"){
		// _color = "#FFEEFF"	
		btn_image = window.document.getElementById("split");
	}
		
	_canvas.fillStyle = _color;
	_canvas.fill();
	_canvas.strokeStyle ='#222222';
	_canvas.stroke();
	_canvas.fillStyle ='#000000';
	_canvas.fillText(_text, _X+circ_rad, _Y+circ_rad);
	if(btn_image != undefined){
		if (btn_image != double)
			_canvas.drawImage(btn_image, _X-28*ratio(), _Y-28*ratio(), 56*ratio(), 56*ratio());
		else{
			_canvas.drawImage(btn_image, _X-30*ratio(), _Y-25*ratio(), 40*ratio(), 40*ratio());
			_canvas.drawImage(btn_image, _X-10*ratio(), _Y-20*ratio(), 40*ratio(), 40*ratio());
		}
	}

}
function button_clicked(displayed_choices){
	var circ_rad = 40*ratio();
	for (var i=0; i<displayed_choices.length; i++){
		var distanceCenter = Math.sqrt(Math.pow(clicX - displayed_choices[i].X, 2) + Math.pow(clicY - displayed_choices[i].Y, 2));
		if ( distanceCenter <= circ_rad) {
			return (i+1); //return the number of the choice clicked+1
		}
	}
	return false
}
function draw_card(main, _image, _X, _Y){
	if(main.globalAlpha==1){
		main.shadowOffsetX = 2;
		main.shadowOffsetY = 1;
		main.shadowBlur = 4;
	}
	main.drawImage(_image, _X, _Y, 125*0.5*ratio(), 181*0.5*ratio());
	main.shadowOffsetX = 0;
	main.shadowOffsetY = 0;
	main.shadowBlur = 0;
	
}

function ratio(){
	return (window.innerWidth - 20)/1861;
}

function getPosition(event){
	if (FF){
		clicX = ((window.event) ? window.event.pageX : event.clientX) + document.documentElement.scrollLeft;
		clicY = ((window.event) ? window.event.pageY : event.clientY) + document.documentElement.scrollTop;
	}
	else {
		clicX = event.x +document.body.scrollLeft;
		clicY = event.y +document.body.scrollTop;
	}
	
	//only part that actualy uses (mygame)
	var choice_clicked = button_clicked(mygame.displayed_choices);
	if (choice_clicked){
		var choice = mygame.displayed_choices[choice_clicked-1].type;
		if (choice == "New Round"){
			mygame.round.close();
			mygame.new_round();
		}
		else if (choice == "New Game"){
			mygame.start();
		}
		else if (choice == "Surre" || choice == "Split" || choice == "Doubl" || choice == "Stand" || choice == "Hit !"){
			mygame.round.player().play_hand(choice, mygame.deck);
			mygame.play_round();
		}
	}
}
function load_cards_imgs(){
	var name = "";
	for (var value=1; value<=13; value++){
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
		
		var color_code;
		for (var color=1; color<5; color++){
			if(color ==1)
				color_code="clubs";
			else if (color ==2)
				color_code="diamonds";
			else if (color ==3)
				color_code="hearts";
			else if (color ==4)
				color_code="spades";
			
			if(value>10)
				color_code+="2";
			document.getElementsByTagName('head').item(0).innerHTML+='<img id="'+name+color_code+'" class="undisplayed" src="PNG-cards/'+name+color_code+'.png"/>';
		}
	}
	document.getElementsByTagName('head').item(0).innerHTML+='<img id="red_joker" class="undisplayed" src="PNG-cards/red_joker.png"/>';
	document.getElementsByTagName('head').item(0).innerHTML+='<img id="card_back" class="undisplayed" src="PNG-cards/card_back.png"/>';
	
}
function choice(){
	this.X;
	this.Y;
	this.type;
	this.text;
	var Yreference = 800;
	this.init = function(){
		if (this.type == "Hit !"){
			this.X = 840*ratio();
			this.Y = Yreference*ratio();
			this.text = "Hit";
		}
		else if (this.type == "Stand"){
			this.X = 1040*ratio();
			this.Y = Yreference*ratio();
			this.text = "Stand";
		}
		else if (this.type == "Doubl"){
			this.X = 940*ratio();
			this.Y = (Yreference+75)*ratio();
			this.text = "Double";
		}
		else if (this.type == "Split"){
			this.X = 740*ratio();
			this.Y = (Yreference+75)*ratio();
			this.text = "Split";
		}
		else if (this.type == "Surre"){
			this.X = 1300*ratio();
			this.Y = (Yreference+40)*ratio();
			this.text = "Surrender";
		}
		else if (this.type == "New Round"){
			this.X = 930*ratio();
			this.Y = (Yreference-50)*ratio();
			this.text = "New Round";
		}
		else if (this.type == "New Game"){
			this.X = 930*ratio();
			this.Y = (Yreference-50)*ratio();
			this.text = "New Game";
		}
	}

}