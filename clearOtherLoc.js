
// 
let count = 0;
let intervalID;
intervalID = setInterval(function(){ 
    const name1 = 'badge badge-dark d-block'
    var elements = document.getElementsByClassName(name1);
    var div;
    for (let i = 0; i < elements.length; i++) {
        text = elements[i].innerHTML
        console.log(typeof(text));
        if(text != "Pittsburgh Mills " && text != "Mckees Rocks"){
            div = elements[i].parentNode;
            div.parentNode.removeChild(div);
        }
    }
    count += 1;
    if(count >  5){
        clearInterval(intervalID)
    };
}, 1000);



//New function removes all items where the percentage of the retail price made up by the current bid is less than
//the percentage in the argument or if it contains one of the keywords
function secondThing(num, wordList) {
    console.log(wordList)
    const percentage = num / 100;
    let count = 0;
    let intervalID;
    intervalID = setInterval(function () {
        const mainElement = "col-md-4 col-sm-6 px-2 mb-4 border-bottom";
        var elements = document.getElementsByClassName(mainElement);
        for (let i = 0; i < elements.length; i++) {
            var remove = false;
            titleElement = elements[i].getElementsByClassName('ellipsis ellipsis-2 product-title font-size-sm');
            cleanText = titleElement[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
            let strippedWords = cleanText.split(" ")
            for (word of wordList) {
                if (strippedWords.includes(word)){
                    console.log('SHITTTTTTTT');
                    console.log(word);
                    // console.log(strippedWords);
                    remove = true;
                }
              }
            listChildren = elements[i].getElementsByClassName('product-meta d-block font-size-xs pb-1');
            if(listChildren.length == 0) {
                console.log('something')
            }
            
            let str = listChildren[1].innerHTML;
            let reg = /\d+/g;
            let result = str.match(reg);
            if (result.length > 1) {
                textResult = result[0] + '.' + result[1];
                retailCost = parseFloat(textResult);
            } else {
                retailCost = parseFloat(result[0]);
            }
            currBidElement = elements[i].getElementsByClassName('btn btn-primary btn-block btn-sm');
            str = currBidElement[0].innerHTML;
            let bidResult = str.match(reg);
            currBid = parseFloat(bidResult[0]);
            value = currBid / retailCost
            if (value > percentage || remove) {
                div = elements[i];
                div.parentNode.removeChild(div);
            }
        }
        count += 1;
        console.log(count)
        if (count > 70) {
            clearInterval(intervalID)
        };
    }, 1000);
}

words = ['baby', 'Baby', 'mirror', 'Mirror', 'Mirror,', 'mirror,']
secondThing(20, words);

//function to do something similar on a page for a finished auction
