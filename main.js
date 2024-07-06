// Letters
const letters="abcdefghijklmnopqrstuvwxyz+#.";

let lettersArray=Array.from(letters);

//select letters container
let letterContainer=document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter=>
    {
        //create span
        let span=document.createElement("span");
        span.appendChild(document.createTextNode(letter));
        span.className='letter-box';
        //add to parent
        letterContainer.appendChild(span);
    }
)

// object of word
const words={
    programing:["c++","c#","c","php",".NET","javascript","sql","python"],
    movies:["inception","interstellar","memento","coco","parasite","prestige","menu","up"],
    people:["Albert Einstein","Hitchcock","Alexander","Salah Elden","Mahatma Ghamdi"],
    countries:["Egypt","Syria","Palastine","Yemen","Bahrain","Qatar"]
};

//Get random property Name Value

let allKeys=Object.keys(words);
let randompropNumber=Math.floor(Math.random()*allKeys.length);
let randomPropName=allKeys[randompropNumber];
let randomPropValue=words[randomPropName];

let randomValueNumber=Math.floor(Math.random()*randomPropValue.length);
let randomValueWord=randomPropValue[randomValueNumber].toLowerCase();

// set category info
document.querySelector(".game-info .category span").innerHTML=randomPropName

// Select letter guess element
let lettersGuessContainer=document.querySelector(".letters-guess");

//covert chosen word to array
let letterAndSpace=Array.from(randomValueWord);

letterAndSpace.forEach(letter=>{
    //create span
    let emptySpan=document.createElement("span");
    //if letter is space
    if(letter===' ')
        {
            emptySpan.className="with-space";
        }
    // append to letter guess container    
    lettersGuessContainer.appendChild(emptySpan);
})
//select guess span
let guessSpans=document.querySelectorAll(".letters-guess span");

// wrongAttempts
let wrongAttempts=0;

//select the drow element
let theDrow=document.querySelector(".hangman-drow");


let winner=false;

//Handle Clicking on letters 
document.addEventListener("click",(e)=>
{
    // set the chose status
    let theStatus=false;
    let correctword="";
    if(e.target.className === 'letter-box')
        {
            e.target.classList.add("clicked")
            
            let theLettter=e.target.innerHTML.toLowerCase();
            letterAndSpace.forEach((wordletter,wordindex)=>
            {
                if(theLettter == wordletter)
                    {
                        theStatus=true;
                        guessSpans.forEach((span,spanindex)=>
                        {
                            if(wordindex == spanindex)
                                {
                                    span.innerHTML = theLettter;
                                }
                        });
                    }
            })
            //if letter is wrong
        if(theStatus!==true )
            {
                wrongAttempts++;
                theDrow.classList.add(`wrong-${wrongAttempts}`);
                //play sound doucument.getElmentById("fail").play()
                if(wrongAttempts==8)
                    {
                    endgame(`GAME OVER, The Word is [${randomValueWord.toUpperCase()}]`);
                    letterContainer.classList.add("finished");
                    }
            }
            else
            {  //play sound doucument.getElmentById("success").play()

            }
        }
        //check if winner   
        if(!winner)
            {
                let children=Array.from(lettersGuessContainer.children);
                children.forEach((child)=>
                    {
                        if(child.className==="with-space")
                            {
                                correctword+=" ";
                            }
                        else
                        {
                            correctword+=child.innerHTML;
                        }
                    }
                );
                if((correctword.toLowerCase()) === (randomValueWord.toLowerCase()))
                    {
                        winner=true;
                        endgame(`Congratulations!! You Get Only ${wrongAttempts} Mistakes`)
                        letterContainer.classList.add("finished");
                    }
            }
        
});

function endgame(message)
{
    let div=document.createElement("div");
    div.appendChild(document.createTextNode(message));
    div.className="popup";
    document.body.appendChild(div);
    let buttom=document.createElement("button");
    buttom.appendChild(document.createTextNode("Play Agine"));
    buttom.className="play"
    document.body.appendChild(buttom);
}
//start game agine
document.addEventListener("click",(e)=>{
    if(e.target.className === "play")
    window.location.reload();
})