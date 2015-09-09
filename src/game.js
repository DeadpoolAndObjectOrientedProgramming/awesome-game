
/**
* The core AwesomeGame game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 600
}

var game = new Kiwi.Game('content', 'AwesomeGame', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(AwesomeGame.Loading);
game.states.addState(AwesomeGame.Intro);
game.states.addState(AwesomeGame.Play);

game.states.switchState("Loading");