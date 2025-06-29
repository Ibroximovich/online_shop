const api = "https://fakestoreapi.com/products/"

const TOKEN ="7628902383:AAG4gCmE6gR5BbiOz8ENynVC_SSp45Gawbw"
const CHAT_ID = "-1002895398218"
const api_massage =`https://api.telegram.org/bot${TOKEN}/sendPhoto`
let elList = document.querySelector(".list")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elInput = document.querySelector(".search-Input")
let elSelect = document.querySelector(".select-part")
elList.innerHTML = "loading..."
function getUser(){
    axios(api).then(data => renderProduct(data.data,elList))
}

getUser()

// render Product start
function renderProduct(arr,list){
    list.innerHTML = null
    arr.forEach(item =>{
        let elItem = document.createElement("li")
        elItem.className =" w-[300px] p-4 rounded-md shadow-md p-3 bg-white"
        elItem.innerHTML =`
        <img class ="h-[200px] md:h-[250px] mx-auto mb-[5px]" src="${item.image}" alt="logo">
        <div class = "space-y-2">
            <h3 class="font-bold text-black text-[20px] line-clamp-1">${item.title}</h3>
            <p class=" text-black text-[17px] line-clamp-3">${item.description}</p>
            <strong class="font-bold text-black text-[17px]">${item.price} $</strong>
        </div>
        <button onclick = "HandleBtn(${item.id})" class="bg-green-700 text-[18px] fond-bold text-white w-full rounded-md p-2 mt-[5px] hover:scale-[1.03] duration-300 cursor-pointer">Order</button>
        `
        list.append(elItem)
    })
}
// render Product end

function HandleBtn(id){
    axios(`${api}/${id}`).then(res=>{
         elModalWrapper.classList.remove("scale-0")
         elModalInner.innerHTML =`
         <div class = "md:flex items-center gap-[20px] relative">
            <img class ="flex items-center md:items-start h-[200px] md:h-[400px] w-[200px] md:w-[300px]  mx-auto mb-[3px] md:mb-[5px]" src="${res.data.image}" alt="logo" width-"300" height="300">
            <div class = " space-y-1 md:space-y-2  md:w-[300px]">
                <h3 class="font-bold text-black text-[18px] md:text-[20px] line-clamp-1">${res.data.title}</h3>
                <p class=" text-black text-[17px] line-clamp-3">${res.data.description}</p>
                <strong class="font-bold text-black text-[17px]">${res.data.price} $</strong>
                <form autocomplete="off" class=" space-y-2 md:space-y-3  add-form">
                    <input required class="w-full p-2 md:p-3  border-[1px]  rounded-md shadow-md outline-none" type="text" name="text" placeholder="Enter your name">
                    <input required class="w-full p-2 md:p-3 border-[1px]  rounded-md shadow-md outline-none"  type="tel" name="phone" placeholder="Enter your phone">
                    <input required class="w-full p-2 md:p-3  border-[1px] rounded-md shadow-md outline-none"  type="text" name="adress" placeholder="Enter your adress">
                    <button type="submit" class="w-full bg-green-700 text-white p-2 rounded-md">Order</button>
                </form>
                <button onclick ="ClousModal()" class="  md:hidden w-[50px] height =[50px] absolute right-0 top-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
         </div>
        `
        let elForm = document.querySelector(".add-form")
        elForm.addEventListener("submit",function(e){
            e.preventDefault()
            console.log("salom");
            let message = `<b>Title:${res.data.title}</b>\n`
             message += `<b>Description:${res.data.description}</b>\n`
             message += `<b>Description:${res.data.price}</b>\n\n`
             
             message += `<b>Name:${e.target.text.value}</b>\n`
            message += `<b>Phone:${e.target.phone.value}</b>\n`
            message += `<b>Adress:${e.target.adress.value}</b>\n`
             let data = {
                photo:res.data.image,
                parse_mode:"html",
                caption:message,
                chat_id:CHAT_ID
             }
             axios.post(api_massage,data).then(res =>{
                elModalWrapper.classList.add("scale-0")
             })
        })
        
    
        
    })
   
}

// search start
  elInput.addEventListener("input",function(e){
    axios(api).then(data=>{
       let arr = data.data.filter(item =>item.title.toLowerCase().includes(elInput.value.toLowerCase())
);
       renderProduct(arr,elList);
       
        
    })
  })
// search end

// select part start

elSelect.addEventListener("change",function(e){
     axios(api).then(data =>{
        if(e.target.value == "0"){
            renderProduct(data.data,elList)
        }
        else if(e.target.value == "1"){
         let arr = data.data.sort((a,b) => a.title.localeCompare((b.title)))
         renderProduct(arr,elList)
        }
        else{
             let arr = data.data.sort((a,b) => a.price - b.price)
              renderProduct(arr,elList)
        }
       })
        
     })
// select part end

function ClousModal(){
elModalWrapper.classList.add("scale-0")
}

elModalWrapper.addEventListener("click",(e)=> e.target.id == "wrapper" ? elModalWrapper.classList.add("scale-0"):"")