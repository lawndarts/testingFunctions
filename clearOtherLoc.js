
//New function removes all items where the percentage of the retail price made up by the current bid is less than
//the percentage in the argument or if it contains one of the keywords
//adds real price
//removes ended listings
function loadAllProducts() {
    let lastIndex = 0;
    let intervalID2;
    intervalID2 = setInterval(function () {
        
            something = document.getElementsByClassName("col-md-4 col-sm-6 px-2 mb-4 border-bottom");
            if (lastIndex == something.length - 1) {
                clearInterval(intervalID2)
                console.log('done');
            };
            lastIndex = something.length - 1;
            something[lastIndex].scrollIntoView({behavior: 'smooth'});
            // window.scrollBy(0,10);
    }, 1300);
}
loadAllProducts()

setTimeout(function () {
    function snipeTool(num, wordList) {
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
          };
        console.log(wordList)
        const percentage = num / 100;
        let count = 0;
        let removedCount = 0;
        let intervalID;
        // intervalID = setInterval(function () {
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
                for (word of wordList) {
                    if (strippedWords.includes(word)){
                        console.log(word);
                        remove = true;
                    }
                  }
                var t1 = elements[i].querySelector('.product-price');
                var t2 = t1.querySelector('.font-size-xs');
                const spl = t2.innerHTML.split(' ');
                // console.log(spl);
                day = spl[3];
                month = spl[2];
                dateStr = spl[5];
                dateStrs = dateStr.split(":");
                var date = new Date();
                date.setHours(parseInt(dateStrs[0]) + 12, parseInt(dateStrs[1]));
                // date.setDate(day);
                // date.setMonth(months[month]);
                // console.log(date);
                newDate = new Date();
                if (newDate > date){
                    remove = true;
                    console.log('Removed ended listing');
                }
                //
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
        // }, 1000);
    }
     
    words = ['baby', 'Baby', 'mirror', 'Mirror', 'Mirror,', 'mirror,', 'Purifier','dog','Dog,','Dog']
    snipeTool(20, words);
    snipeTool(20, words);
    snipeTool(20, words);
    window.scrollTo(0, 0);
    //is this really better?
}, 42000);