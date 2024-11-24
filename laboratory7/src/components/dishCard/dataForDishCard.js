


function getDataForCard(jsonData){
    Object.getOwnPropertyNames(jsonData.hits[0].recipe).forEach(element => {
      
      
        const dishCardCreated = document.createElement(<dishCard/>);
        th.innerText = element;
        theadRow.appendChild(th);  
    });
  
    console.log('1');
}

export default getDataForCard;