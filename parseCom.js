var fs = require('fs');
var path = require('path');
var commandsFile = './commands.txt'


module.exports = {
    
    buffer: [],
    cList: {},
    score: 0,
    
    
    init: function(){
        
        var cString;
        var fileLocation = path.join(__dirname, 'commands.txt');
        
        
        try{
            cString = fs.readFileSync(fileLocation, 'ascii');
        }catch(e){
            console.log('Error',e.stack);
        }
        
        cArray = cString.split("\n");
        
        var tempList = {}
        
        cArray.forEach(function(elem, index){
            tempList[elem] = false;
        });
        this.cList = Object.assign({}, tempList);
        
        console.log("Initialized commands object of " + Object.keys(this.cList).length + " commands");
    },
    
    
    addChar: function (char){
        
        this.buffer.push(char);
        this.checkBuffer();
    },
    
    printBuffer: function(){
        console.log(this.buffer);
    },
    
    checkBuffer: function(){
        
        if(this.buffer.indexOf("\r") >= 0){
            // if we have an endline kind of tokenize buffer array eg ['l','s',' ','\r']   ->   'ls \r'   ->   ['ls',' ','\r']
            var tempBuffer = this.buffer.slice(0,this.buffer.length-1);
            
            var split = tempBuffer.join("").split(" ");
            console.log(tempBuffer.join());
            console.log("Got endline and tokenized to " + split);
            
            split.forEach(elem => {
                if(elem in this.cList){
                    console.log("Found valid command "+ elem);
                    this.score++;
                    console.log("Score "+ this.score);
                }   
            });
            
            this.buffer = [];
            
        }
        
    }
    
    
};


