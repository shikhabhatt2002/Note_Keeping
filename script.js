const addButton = document.getElementById('add');

const updateLSData = ()=>{
    // bahut saare notes huye to? , uske liye
    const textAreaData = document.querySelectorAll('textarea');
    // this data will be storing in the form of array

    const notes = [];

    // console.log(textAreaData);
    // textAreaData this is an array
    // textAreaData.forEach(currele,index,array,this)
    // forEach best here
    textAreaData.forEach( (note)=>{
       // end me add karega
       if(note.value!="")
        return notes.push(note.value);
    });
    console.log(notes); 



    // LOCAL STORAGE
    // 1) setItem getItem remove clear , in the form of keys values
    // takes 2 parameter, key name = notes, data/value is ALWYAS STRING , but ye to array hai, if want to save array, USE JSON
    // localStorage.setItem('myCat', 'Tom');
    // const cat = localStorage.getItem('myCat');
    // localStorage.removeItem('myCat');
    // localStorage.clear();
    // var KeyName = window.localStorage.key(index);
    localStorage.setItem('notes', JSON.stringify(notes) );

    // gettign data back from local storage, ab ye data get karke vapis dakenge from 
    // code at the end above 
}





// text is important , taki local storage se copy karke yahan vapis daal skte hain
// text is IMPORTANT, hum bata payenge type karna hai ya kuch bhi nhi karna, save ya edit actual toggle working
// IMPORTANT METHODS TO LEARN
const addNewNote = ( text = '' )=>{

    // DIV Created class added though js

    // js ki help se div create krna hai
    const note = document.createElement('div'); // createElement
    // to add classes dynamically - classList / add() remove()
    note.classList.add('note');

    //Rest ko bhi aise karenge to time lagega , isliye
    // point is kab starting me div khule, kb starting me textarea,
    // already text present hai to , to div khulna chahiye, aur text present nhi hai to textarea khuna chaiye
    // and click "edit/save" me bas dono ko toggle krna hai

    const htmlData = `
    <div class="operation">
        <button class="edit" title="Save/Edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete" title="Delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    
    <div class="main ${text? "": "hidden"} ">${text}</div>
    <textarea id="textarea" class=" ${text ? "hidden" : ""}">${text}</textarea>`;


    // add this content inside div , check differeneces
    // insertAdjacentElement 
    // insertAdajacentHTML
    // pehle  innerText,innerHTML vo bhi shi hai but ye upar vale superfast hai
    
    // takes two PArameters, where and what, as need to html data
    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note); complete div with ote clas and all html data inside it vala


    // GETTING tHe Refrences
    // note. naki document. , as ye note ke andar hain
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('#textarea');


    // DELETING THE NODE
    deleteButton.addEventListener( "click", ()=>{
        note.remove();
        updateLSData();  // phirse call karege, agar dete karre to local se bhi delte aur phirse textAreaData ka array new banao
    })




    // TOGGLE USING EDIT BUTTON, save and writing me toggle
    // jab save to store it in local storage
    // ya to textarea chahiye ya to main , at a time, ek ko to hidden karna he padega
    
    // dono jagah same data rakhne ke liye
    // textarea.value = text;
    // mainDiv.innerHTML = text;

    // FLAW: Ki Empty vala bhi save hojayega, need to add if condition in class of main and textarea
    editButton.addEventListener( "click", ()=>{
        // toggle works by adding this class if not present, and removing it if present
        
        textarea.classList.toggle("hidden");
        mainDiv.classList.toggle("hidden");
        
   
    })


    // jo bhi user data likh raha hai, vo yahan bhi chahiye
    // event object is the parent object of all events
    // event.target, kuch bhi likhte hain to we can get kis button ke through kaunsa event fire hora hai, uska color, screen , value,text etc can get from event object
    textarea.addEventListener("change", (event)=>{ // input me har ek key me dikhega, isliye change use karre
        const value = event.target.value;
        console.log(value);
        mainDiv.innerHTML = value; // mainDiv.innerHTML = textarea.value;
        updateLSData();
    })


    // WORKING BUT DATA REFRESH KARNE PE CHALA JAYEGA< ISLIY ELOCAL STORAGE WILL USE
    // Local Storage: properties allow to save key/value pairs in a web browser. The 
    // LocalStorage object stores data with no expiration date. The Data will not be 
    // deleted when the browser is closed, and will be available the next day weak or year.




    // AppendChild/ prepandChild something
    // it appends a node as the last child of a node
    // body me isko as a child append karana hai
    document.body.appendChild(note);
}




// GETTING DATA BACK FROM LOCAL STORAGE, need to parse as vo json me hai i.e string, but humara data ya to array me tha ya object me tha
// var notes = JSON.parse(localStorage.getItem('notes')); // keyname
// if(notes)// notes me data present hai agar
// {
//     notes.forEach( (note)=> addNewNote(note) );
// }
var notes = JSON.parse(localStorage.getItem('notes'));
if(notes)
{
    notes.forEach( (note) => addNewNote(note));
}




// one statement no need of {}
// direclty writing the function
addButton.addEventListener("click", ()=> addNewNote() );

