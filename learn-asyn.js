/*
function test(){
  setTimeout(()=>console.log('1'),0)
  //console.log('1');
  console.log('2');
  console.log('3');
}
function httpGetAsync(theUrl,callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange= function(){
    if(xmlHttp.readyState==4 && xmlHttp.status==200) callback(xmlHttp);
  };
  xmlHttp.open("GET",theUrl,true);
  xmlHttp.send(null);
}
httpGetAsync('https://picsum.photos/200/300',(data)=>{
  console.log(data);
  document.getElementById('img-1').setAttribute('src',data.responseURL);
  httpGetAsync('https://picsum.photos/200/300',(data)=>{
    document.getElementById('img-2').setAttribute('src',data.responseURL);
    httpGetAsync('https://picsum.photos/200/300',(data)=>{
      document.getElementById('img-3').setAttribute('src',data.responseURL);
    })
  })
})
test();
*/
//
function httpGetAsync(theUrl,resolve){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange= function(){
    if(xmlHttp.readyState==4 && xmlHttp.status==200) resolve(xmlHttp);
  };
  xmlHttp.open("GET",theUrl,true);
  xmlHttp.send(null);
}
//

//

const currentPromise = new Promise((resolve,reject)=>{
  httpGetAsync('https://picsum.photos/200/300',resolve);
})
const promise2 = new Promise((resolve,reject)=>{
  httpGetAsync('https://picsum.photos/200/300',resolve);
})
const promise3 = new Promise((resolve,reject)=>{
  httpGetAsync('https://picsum.photos/200/300',resolve);
})

const executeAsync = async ()=>{
  try{
    const response= await currentPromise;
    document.getElementById('img-1').setAttribute('src',response.responseURL);
    const response2=await promise2;
    document.getElementById('img-2').setAttribute('src',response2.responseURL);
    const response3=await promise3;
    document.getElementById('img-3').setAttribute('src',response3.responseURL);
  }catch(error){
    console.log({error})
  }

}
executeAsync();
/*currentPromise
  .then((data)=>{
    console.log(data);
    document.getElementById('img-1').setAttribute('src',data.responseURL);
      return promise2;
  })
  .then((data)=>{
    console.log(data);
    document.getElementById('img-2').setAttribute('src',data.responseURL);
    return promise3;
  })
  .then((data)=>{
    console.log(data);
    document.getElementById('img-3').setAttribute('src',data.responseURL);
  })
  .catch(err=>{
  console.log(err);
})*/
