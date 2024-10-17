function categorizeTheTable(){

    let scriptExecuted = false;

    let massAge = [0, 0, 0, 0];
    const table = document.querySelector(".table");
      const rows = table.getElementsByTagName("tr");
      for (let i = 1; i < rows.length; i++)
      {
        const cols = rows[i].getElementsByTagName("td");
        const element = Number(cols[cols.length-1].innerText);
        if (element < 18 && element >= 0){
            rows[i].classList.add("child");
            massAge[0]++;
        }
        else if (element < 35 && element >= 18){
          rows[i].classList.add("young");
          massAge[1]++;
        }
        else if (element < 60 && element >= 35){
          rows[i].classList.add("adult");
          massAge[2]++;
        }
        else if (element < 120 && element >= 60){
          rows[i].classList.add("elderly");      
          massAge[3]++;
        }
      }


      const cols = document.querySelectorAll(".row > .col-xxl-2 > h4");
      console.log(cols);
      for (let i = 0; i < massAge.length; i++){
        if (massAge[i] > 0){
            const badge = document.createElement("span");
            badge.classList.add("badge" , "ms-2");
            switch(i){
                case 0:
                    badge.classList.add("text-bg-primary")
                    badge.innerText = massAge[0];
                    cols[0].appendChild(badge);
                    scriptExecuted = true;
                    break; 
                case 1:     
                    badge.classList.add("text-bg-primary")
                    badge.innerText = massAge[1];
                    cols[1].appendChild(badge);
                    scriptExecuted = true;
                    break;  
                case 2:     
                    badge.classList.add("text-bg-primary")
                    badge.innerText = massAge[2];
                    cols[2].appendChild(badge);
                    scriptExecuted = true;
                    break;  
                case 3:     
                    badge.classList.add("text-bg-primary")
                    badge.innerText = massAge[3];
                    cols[3].appendChild(badge);
                    scriptExecuted = true;
                    break;         
            }
        }
      }
}