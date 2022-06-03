
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
    let removedCount = 0;
    let intervalID;
    intervalID = setInterval(function () {
        const mainElement = "col-md-4 col-sm-6 px-2 mb-4 border-bottom";
        var elements = document.getElementsByClassName(mainElement);
        for (let i = 0; i < elements.length; i++) {
            let answer = elements[i].hasAttribute("visited");
            if (answer) continue;
            const att = document.createAttribute("visited");
            elements[i].setAttributeNode(att);
            var remove = false;
            titleElement = elements[i].getElementsByClassName('ellipsis ellipsis-2 product-title font-size-sm');
            cleanText = titleElement[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
            let strippedWords = cleanText.split(" ");
            //God damn. Tried writing python syntax in here
            for (word of wordList) {
                if (strippedWords.includes(word)){
                    console.log(word);
                    remove = true;
                }
              }
            //Lets try to add something
            
            listChildren = elements[i].getElementsByClassName('product-meta d-block font-size-xs pb-1');
            if(listChildren.length == 0) {
                continue;
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
            // let adjustedRetail = (retailCost * 1.2305) + 2.14;
            // let rounded = adjustedRetail.toFixed(2);
            // listChildren[1].innerHTML += '<span style="color:red;">&nbsp;($' + String(rounded) + ')<span>';
            currBidElement = elements[i].getElementsByClassName('btn btn-primary btn-block btn-sm');
            str = currBidElement[0].innerHTML;
            let bidResult = str.match(reg);
            currBid = parseFloat(bidResult[0]);
            let adjustedBid = (currBid * 1.2305) + 2.14;
            let rounded = adjustedBid.toFixed(2);
            currBidElement[0].innerHTML += 
                "&nbsp;<span class='bg-light rounded'style='color:red; background-color:white;'>&nbsp;$" + String(rounded) + '&nbsp;<span>';
            value = currBid / retailCost
            if (value > percentage || remove) {
                div = elements[i];
                div.parentNode.removeChild(div);
                removedCount++;
            }
        }
        count += 1;
        console.log(count);
        if (count > 5) {
            console.log(removedCount + " items removed!");
            clearInterval(intervalID)
        };
    }, 1000);
}
 
words = ['baby', 'Baby', 'mirror', 'Mirror', 'Mirror,', 'mirror,', 'Purifier','dog','Dog,','Dog']
secondThing(20, words);