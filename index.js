import { recipes } from "./recipes.js";
var tabRecActu=recipes;
/*----------------------------------------------------------------------entête------------------------------------------------------------------------------ */  
function enTete(){
    const element=document.createElement("header");
    element.innerHTML=`
    <a href="index.html"><img src="logo.png" aria-label="lien vers accueil" id="logo"/></a>
    `;
    document
        .getElementById('app')
        .appendChild(element)
    
}
enTete();
/*------------------------------------------------------------------------------main--------------------------------------------------------------------------*/
function main(){
    const element= document.createElement("main");
    element.innerHTML=`
    <form name="search" role="search" method="get" action="" id="form" onsubmit="return validate();">
        <div id="boxGrandInput">
            <label for="recherche"></label>
            <input type="text" id="recherche" name="recherche" placeholder="Rechercher un ingrédient, appareil, ustensiles ou recette ">
                <i class="fas fa-search loupe"></i>
            </input>
            
        </div>
        <div id="boxTagsActifs">
        
        </div>
        <section id="boxZoneDesInputs">

            <label for="ingredients" ></label>
            <input type="text" class="Ing" id="ingredients" name="ingredients" placeholder="Ingredients">
                <i class="fas fa-chevron-up fa-chevron-upIng" id="fa-chevron-upIng"></i>
                <ul id="listeIng" class="listeTagsChoix"></ul>
            </input>
            
            <label for="appareil" ></label>
            <input type="text" class="App" id="appareil" name="appareil" placeholder="Appareil">
                <i class="fas fa-chevron-up fa-chevron-upApp" id="fa-chevron-upApp"></i>
                <ul id="listeApp" class="listeTagsChoix"></ul>
            </input>
            
            <label for="ustensiles" ></label>
            <input type="text" class="Ust" id="ustensiles" name="ustensiles" placeholder="Ustensiles">
                <i class="fas fa-chevron-up fa-chevron-upUst" id="fa-chevron-upUst"></i>  
                <ul id="listeUst" class="listeTagsChoix"></ul>
            </input>
              
        </section>
    </form>
    <section id="listeRecette">
        <div id="boxRecette">
        </div>
    </section>
    `;
    document
        .getElementById("app")
        .appendChild(element)
    
}
main()

document.getElementById('recherche').addEventListener("input",displayVignetteRech)
function displayVignetteRech(e){
    let evt=e.target.value
    const regex=new RegExp('[a-zA-Z]{3,}')
    if(regex.test(evt)){
        
        if(evt){

        }
    } 

}
/*--------------------------------------------------------fonction création liste suggestion --------------------------------------------------------------- */
function displayTags(arraySort,cible,type){
    document.getElementById(cible).innerHTML=``;
    arraySort.forEach(element=>{
        let elt=document.createElement('li')
        elt.setAttribute('class','elementListe')
        elt.classList.add("elementListe"+type)
        elt.innerHTML=`<p>${element}</p>`;
        document.getElementById(cible).appendChild(elt)
    
    })
}
/* ----------------------fonction création la liste complete d'ingredients (start) sans valeur dans input---------------------*/
var tabIng=[];
var NewtabIng=[];
function displayTagsStartsIng(array){
    document.getElementById('listeIng').innerHTML=` `;
    array.forEach(ings=>{
        ings.ingredients.forEach(ing=>{
            let elt=ing.ingredient
            elt=elt.toLowerCase()
            tabIng.push(elt)
        })
    })
    NewtabIng= new Set(tabIng);
    displayTags(NewtabIng,'listeIng',"Ing")
}
displayTagsStartsIng(tabRecActu)
/*------------------------la saisie avec sugestion--------------------------- */


let choix = document.getElementsByClassName("elementListeIng");

for(var i=0; i<choix.length;){
    let index= choix[i].innerHTML
    index=index.slice(3,-4)
    choix[i].addEventListener('click',()=>new vignetteChoix(index,"Ing"));
    i++
}


var chaineTab=[];
function controlSaisie(array){
    var saisie=document.getElementById("ingredients").value ;var nbCar=saisie.length
    var chaine=array;var nbMotSaisie;
    let dernierFrappe=saisie.substring(nbCar-1)
    
    if(dernierFrappe != ' '){
        chaineTab=[];
        
        nbMotSaisie=saisie.split(' ').length;

        if(nbMotSaisie>1){
            chaine.forEach(ing=>{
                if(saisie==ing.substring(0,nbCar)){
                    chaineTab.push(ing)
                }
                
            })
        }else{
            if(nbCar>0){
                chaine.forEach(ing=>{
                    let chaineMots=ing.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisie==ingg.substring(0,nbCar)){
                        chaineTab.push(ing)
                        }
                    })
                })
            }
        }
        chaineTab=[new Set(chaineTab)]
        displayTags(chaineTab[0],'listeIng',"Ing")
        if(saisie==""){
            displayTagsStartsIng(tabRecActu)
        }

    }
    let choix = document.getElementsByClassName("elementListe");

    for(var i=0; i<choix.length;){
        let index= choix[i].innerHTML
        index=index.slice(3,-4)
        choix[i].addEventListener('click',()=>new vignetteChoix(index,"Ing"));
        i++
    }
}
/*------------------le focus sur input---------------- */
function focusinIng(liste){
    document.getElementById(liste).style.display='flex';
    document.getElementById("ingredients").style.width='33rem';
    document.getElementById("ingredients").style.borderRadius='0.3rem 0.3rem 0 0 ';
    document.getElementById("fa-chevron-upIng").style.marginLeft='30rem';
    document.getElementById("fa-chevron-upApp").style.marginLeft='47rem';
    document.getElementById("fa-chevron-upUst").style.marginLeft='64rem';
    document.getElementById("fa-chevron-upIng").style.transform='rotate(0deg)';
}
function focusoutIng(liste){
    window.setTimeout(()=>{
        document.getElementById(liste).style.display='none';
        document.getElementById("ingredients").style.width='218px';
        document.getElementById("ingredients").style.borderRadius='0.3rem ';
        document.getElementById("fa-chevron-upIng").style.marginLeft='12rem';
        document.getElementById("fa-chevron-upApp").style.marginLeft='28rem';
        document.getElementById("fa-chevron-upUst").style.marginLeft='45rem';
        document.getElementById("fa-chevron-upIng").style.transform='rotate(180deg)';
    },2000)
}
/*----------------------------------les Events ingrédients--------------- */
document.getElementById("ingredients").addEventListener("focusin",()=>focusinIng("listeIng"))
document.getElementById("ingredients").addEventListener("focusout",()=>focusoutIng("listeIng"))
document.getElementById("ingredients").addEventListener("input",()=>controlSaisie(NewtabIng))


/* ----------------------fonction création la liste complete d'Appareil (start) sans valeur dans input---------------------*/

var tabApp=[];
var NewtabApp=[];
function displayTagsStartsApp(array){
    document.getElementById('listeApp').innerHTML=` `;
    array.forEach(elt=>{
        let eltt=elt.appliance
        eltt=eltt.toLowerCase()
        tabApp.push(eltt)
    })
    NewtabApp= new Set(tabApp);
    displayTags(NewtabApp,'listeApp',"App")
}
displayTagsStartsApp(tabRecActu)

let choixApp = document.getElementsByClassName("elementListeApp");

for(var i=0; i<choixApp.length;){
    let index= choixApp[i].innerHTML
    index=index.slice(3,-4)
    choixApp[i].addEventListener('click',()=>new vignetteChoix(index,"App"));
    i++
}

/*------------------------la saisie avec sugestion--------------------------- */

var chaineTabApp=[];
function controlSaisieApp(array){
    var saisie=document.getElementById("appareil").value ;var nbCar=saisie.length
    var chaine=array;var nbMotSaisie;
    let dernierFrappe=saisie.substring(nbCar-1)
    
    if(dernierFrappe != ' '){
        chaineTabApp=[];
        
        nbMotSaisie=saisie.split(' ').length;

        if(nbMotSaisie>1){
            chaine.forEach(ing=>{
                if(saisie==ing.substring(0,nbCar)){
                    chaineTabApp.push(ing)
                }
                
            })
        }else{
            if(nbCar>0){
                chaine.forEach(ing=>{
                    let chaineMots=ing.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisie==ingg.substring(0,nbCar)){
                        chaineTabApp.push(ing)
                        }
                    })
                })
            }
        }
        chaineTabApp=[new Set(chaineTabApp)]
        displayTags(chaineTabApp[0],'listeApp',"App")
        if(saisie==""){
            displayTagsStartsIng(tabRecActu)
        }

    }
    let choixApp = document.getElementsByClassName("elementListeApp");

    for(var i=0; i<choixApp.length;){
        let index= choixApp[i].innerHTML
        index=index.slice(3,-4)
        choixApp[i].addEventListener('click',()=>new vignetteChoix(index,"App"));
        i++
    }
}
/*------------------le focus sur input---------------- */


document.getElementById("appareil").addEventListener("focusout",()=>focusoutApp("listeApp"))
document.getElementById("appareil").addEventListener("focusin",()=>focusinApp("listeApp"))
document.getElementById("appareil").addEventListener("input",()=>controlSaisieApp(NewtabApp))

function focusinApp(liste){
    document.getElementById(liste).style.display='flex';
    document.getElementById("appareil").style.borderRadius='0.3rem 0.3rem 0 0 ';
    document.getElementById("fa-chevron-upApp").style.transform='rotate(0deg)';
}

function focusoutApp(liste){
    window.setTimeout(()=>{
        document.getElementById(liste).style.display='none';
        document.getElementById("appareil").style.width='218px';
        document.getElementById("appareil").style.borderRadius='0.3rem ';
        document.getElementById("fa-chevron-upIng").style.marginLeft='12rem';
        document.getElementById("fa-chevron-upApp").style.marginLeft='28rem';
        document.getElementById("fa-chevron-upUst").style.marginLeft='45rem';
        document.getElementById("fa-chevron-upApp").style.transform='rotate(180deg)';
    },2000)
}

/* ----------------------fonction création la liste complete d'Ustensil (start) sans valeur dans input---------------------*/

var tabUst=[];
var NewtabUst=[];
function displayTagsStartsUst(array){
    document.getElementById('listeUst').innerHTML=` `;
    array.forEach(ings=>{
        ings.ustensils.forEach(ing=>{
            let elt=ing
            elt=elt.toLowerCase()
            tabUst.push(elt)
        })
    })
    NewtabUst= new Set(tabUst);
    displayTags(NewtabUst,'listeUst',"Ust")
}
displayTagsStartsUst(tabRecActu)

let choixUst = document.getElementsByClassName("elementListeUst");

for(var i=0; i<choixUst.length;){
    let index= choixUst[i].innerHTML
    index=index.slice(3,-4)
    choixUst[i].addEventListener('click',()=>new vignetteChoix(index,"Ust"));
    i++
}

/*------------------------la saisie avec sugestion--------------------------- */

var chaineTabUst=[];
function controlSaisieUst(array){
    var saisie=document.getElementById("ustensiles").value ;var nbCar=saisie.length
    var chaine=array;var nbMotSaisie;
    let dernierFrappe=saisie.substring(nbCar-1)
    
    if(dernierFrappe != ' '){
        chaineTabUst=[];
        
        nbMotSaisie=saisie.split(' ').length;

        if(nbMotSaisie>1){
            chaine.forEach(ing=>{
                if(saisie==ing.substring(0,nbCar)){
                    chaineTabUst.push(ing)
                }
                
            })
        }else{
            if(nbCar>0){
                chaine.forEach(ing=>{
                    let chaineMots=ing.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisie==ingg.substring(0,nbCar)){
                        chaineTabUst.push(ing)
                        }
                    })
                })
            }
        }
        chaineTabUst=[new Set(chaineTabUst)]
        displayTags(chaineTabUst[0],'listeUst',"Ust")
        if(saisie==""){
            displayTagsStartsUst(tabRecActu)
        }

    }
    let choixUst = document.getElementsByClassName("elementListeUst");

    for(var i=0; i<choixUst.length;){
        let index= choixUst[i].innerHTML
        index=index.slice(3,-4)
        choixUst[i].addEventListener('click',()=>new vignetteChoix(index,"Ust"));
        i++
    }
}
/*------------------le focus sur input---------------- */

document.getElementById("ustensiles").addEventListener("focusin",()=>focusinUst("listeUst"))
document.getElementById("ustensiles").addEventListener("input",()=>controlSaisieUst(chaineTabUst))
document.getElementById("ustensiles").addEventListener("focusout",()=>focusoutUst("listeUst"))
function focusinUst(liste){
    document.getElementById(liste).style.display='flex';
    document.getElementById("ustensiles").style.width='30rem';
    document.getElementById("ustensiles").style.borderRadius='0.3rem 0.3rem 0 0 ';
    document.getElementById("fa-chevron-upUst").style.marginLeft='61rem';
    document.getElementById("fa-chevron-upUst").style.transform='rotate(0deg)';
}

function focusoutUst(liste){
    window.setTimeout(()=>{
        document.getElementById(liste).style.display='none';
        document.getElementById("ustensiles").style.width='218px';
        document.getElementById("ustensiles").style.borderRadius='0.3rem ';
        document.getElementById("fa-chevron-upIng").style.marginLeft='12rem';
        document.getElementById("fa-chevron-upApp").style.marginLeft='28rem';
        document.getElementById("fa-chevron-upUst").style.marginLeft='45rem';
        document.getElementById("fa-chevron-upUst").style.transform='rotate(180deg)';
    },2000)
}

/*----------------------------------------------------------------création des vignette tags---------------------------------------------------------------- */

class vignetteChoix{

    constructor(nom,type){
       
        let Nom=nom.replace(/ /g,"")
        this.element=this.displayVignette(nom,Nom,type)

        document.getElementById("boxTagsActifs").appendChild(this.element)
        document.querySelector('#'+Nom+' .croix').addEventListener('click',()=>this.removeVignette(Nom)) 
    }
removeVignette(nom){
    let vignetteCibleRemove=document.getElementById(nom)
    document.getElementById("boxTagsActifs").removeChild(vignetteCibleRemove) 
}
displayVignette(nom,Nom,type){
    let elt=document.createElement("div");
    elt.setAttribute("class","etiquette")
    elt.setAttribute("id",Nom)
    switch(type){
        case"Ing":
            elt.classList.add("Ing")
            break;
        case"App":
            elt.classList.add("App")
            break;
        case"Ust":
            elt.classList.add("Ust")
    }

    elt.setAttribute("aria-label","étiquette filtre actif")
    elt.innerHTML=`
        <p>${nom}</p>
        <i class="far fa-times-circle croix"></i>
    `;
    return elt;
}

}
 /*---------------------------------------------------------création des vignettes recettes ----------------------------------------------------------------- */   
class recette{
    constructor(element){
        this.element=this.displayRecette(element)
        this.elementIng=this.displayIng(element)
        this.append=document.getElementById("boxRecette").appendChild(this.element)  
        this.append.querySelector(this.element+".recette__Ingredients").appendChild(this.elementIng) 
    }
    displayIng(element){
        let box= document.createElement("div")
        let ingg ; 
        element.ingredients.forEach(ing=>{
            
            ingg = document.createElement("p")
            if(ing.ingredient && ing.quantity &&ing.unit){
                ingg.innerHTML=  `${ing.ingredient+": "+ing.quantity+" "+ing.unit}`;
                
            }else if(ing.ingredient && ing.quantity){
                ingg.innerHTML=  `${ing.ingredient+": "+ing.quantity}`;
            }else if(ing.ingredient){
                ingg.innerHTML=`${ing.ingredient}`;
            }  
            box.appendChild(ingg)
        })
        return box;
    }
    displayRecette(element){
        let elt=document.createElement('a')
        elt.setAttribute('class','recette')
        elt.innerHTML=`
        <div class="recette__Vide"></div>
        <div class="recette__Info">
            <div class="recette__TitreTemps">
                <p class="recette__Titre">${element.name}</p>
                <div class="recette__BoxTemps">
                    <i class="far fa-clock recette__clock"></i>
                    <p class="recette__Temps">${element.time}min</p>
                </div>
            </div>
            <div class="recette__IngProces">
                <div class="recette__Ingredients">
                    
                </div>
                <div class="recette__Proces">
                    <p class="recette__descrip">${element.description}</p>
                </div>
            </div>
        </div>    
        `;
        
        return elt;
    }
}
tabRecActu.forEach(element=>{new recette(element)})   
