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

document.getElementById('recherche').addEventListener("input",()=>displayVignetteRech(tabRecActu))
//fonction pour actualiser les liste de sugestion des 3 inputs optionnels
function actualisationStartSug(){
    displayTagsStartsIng(tabR)
    displayTagsStartsUst(tabR)
    displayTagsStartsApp(tabR)
}
//fonction de recherche par mot clé
var tabR=tabRecActu;
function displayVignetteRech(array){
    var saisieR=document.getElementById("recherche").value
    saisieR=saisieR.toLowerCase()            
    var nbCarR=saisieR.length
    var chaine=array ;var nbMotSaisieR;
    let dernierFrappeR=saisieR.substring(nbCarR-1) 

    if(dernierFrappeR != ' '){
        tabR=[];    
        nbMotSaisieR=saisieR.split(' ').length;
        var elt;
        var chaineMots
        //recherche quand il y a plus de 1 mot
        if(nbMotSaisieR>1){
            //recherche dans les ingredients
            chaine.forEach(ing=>{
                ing.ingredients.forEach(ingg=>{
                    elt=ingg.ingredient
                    elt=elt.toLowerCase()
                    if(saisieR==elt.substring(0,nbCarR)){
                        tabR.push(ing)
                    }
                })
                //recherche dans les titres
                elt=ing.name.toLowerCase()
                if(saisieR==elt.substring(0,nbCarR)){
                    tabR.push(ing)
                }
            })            
        }else{//recherche quand il n'y a qu'un mot
            if(nbCarR>0){//verifie que le champs n'est pas vide
                chaine.forEach(ing=>{//recherche dans les ingredients
                    ing.ingredients.forEach(ingg=>{
                        chaineMots=ingg.ingredient.split(' ')
                        chaineMots.forEach(inggg=>{
                            elt=inggg.toLowerCase()
                            if(saisieR==elt.substring(0,nbCarR)){
                                tabR.push(ing)
                            }
                        })
                    })
                    //recherche dans les titres
                    chaineMots=ing.name.split(" ")
                    chaineMots.forEach(ingg=>{
                        elt=ingg.toLowerCase()
                        if(saisieR==elt.substring(0,nbCarR)){
                            tabR.push(ing)
                        }
                    })
                    //erecherche dans les descriptions
                    chaineMots= ing.description
                    chaineMots=chaineMots.toLowerCase()
                    chaineMots=chaineMots.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisieR==ingg.substring(0,nbCarR)){
                            saisieR
                            tabR.push(ing)
                        }
                    })
                })
            }
        }
        //supprime les doublons
        tabR=[new Set(tabR)]
        tabR=tabR[0]
    }  
    //demarre l'affichage lorsqu'il y a plus de 3 lettres
    const regex=new RegExp('[a-zA-Z]{3,}')
    if(regex.test(saisieR)){
        let container= document.getElementById("listeRecette")
        //si le tableau de resultat est modifier
        if(tabR.size>1 || tabR.size==1){
            new recetteDisplay(tabR,tabRecActu)
            actualisationStartSug()
        }else if(tabR.size==0){// si il est vide donc aucune recette retrouvé
            container.innerHTML=``;
            let boxEmpty=document.createElement("div")
            boxEmpty.setAttribute('id',"recetteVide")
            boxEmpty.innerHTML=`<p>Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc.</p>`;
            container.appendChild(boxEmpty)
        }
    }else{
            //actualiser quand le champs de recherche est vide
            let elt=document.createElement("div")
            elt.setAttribute('id','boxRecette')
            let eltt=document.getElementById("listeRecette")
            eltt.innerHTML=``;
            eltt.appendChild(elt)
            new recetteDisplay(array,tabRecActu)
            actualisationStartSug()
    }
    
}
/*--------------------------------------------------------fonction display suggestion --------------------------------------------------------------- */
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
function displayTagsStartsIng(array){
    tabIng=[]
    document.getElementById('listeIng').innerHTML=` `;

    array.forEach(ings=>{
        ings.ingredients.forEach(ing=>{
            let elt=ing.ingredient
            elt=elt.toLowerCase()
            tabIng.push(elt)
        })
    })
    tabIng= new Set(tabIng);
    displayTags(tabIng,'listeIng',"Ing")
    clickChoix('Ing',array)
}
displayTagsStartsIng(tabRecActu)
/*------------------------la saisie avec sugestion--------------------------- */

function clickChoix(type){
    let choix = document.getElementsByClassName("elementListe"+type);
    //ecoute des evenements des mots dans la liste de sugestion
    for(var i=0; i<choix.length;){
        let index= choix[i].innerHTML
        index=index.slice(3,-4)
        choix[i].addEventListener('click',()=>callbackClickIng(index,type));
        i++
    }
    function callbackClickIng(index,type){
        new vignetteChoix(index,type)
        rechIngt(index)
    }
    var tabIngs=[]
    function rechIngt(nom){
        tabR.forEach(ing=>{
            ing.ingredients.forEach(ingg=>{
                let inggg=ingg.ingredient
                inggg=inggg.toLowerCase()
                if(inggg==nom){
                    tabIngs.push(ing) 
                }
                
            })
        })
        tabR=tabIngs
        new recetteDisplay(tabR,tabRecActu)
        
        actualisationStartSug()
    }
}
//fonction pour la saisie manuel dans l'input optionnel des Ingredients
var chaineTab=[];
function controlSaisieIng(array){
    var saisie=document.getElementById("ingredients").value ;var nbCar=saisie.length
    saisie=saisie.toLowerCase()
    var chaine=array;var nbMotSaisie;
    let dernierFrappe=saisie.substring(nbCar-1)
    
    if(dernierFrappe != ' '){
        chaineTab=[];
        nbMotSaisie=saisie.split(' ').length;
        //recherche quand il y a plus de 1 mot
        if(nbMotSaisie>1){
            //recherche dans les ingredients
            chaine.forEach(ing=>{
                if(saisie==ing.substring(0,nbCar)){
                    chaineTab.push(ing)
                }
                
            })
        }else{//recherche quand il n'y a qu'un mot
            if(nbCar>0){//verifie que le champs n'est pas vide
                chaine.forEach(ing=>{//recherche dans les ingredients
                    let chaineMots=ing.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisie==ingg.substring(0,nbCar)){
                        chaineTab.push(ing)
                        }
                    })
                })
            }
        }
        //suprime les doublons
        chaineTab=[new Set(chaineTab)]
        displayTags(chaineTab[0],'listeIng',"Ing")
        //réinitialise les sugestions à 0
        if(saisie==""){
            displayTagsStartsIng(tabRecActu)
        }
    }
    //écoute les mots en sugestion
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
    },500)
}
/*----------------------------------les Events ingrédients--------------- */
document.getElementById("ingredients").addEventListener("focusin",()=>focusinIng("listeIng"))
document.getElementById("ingredients").addEventListener("focusout",()=>focusoutIng("listeIng"))
document.getElementById("ingredients").addEventListener("input",()=>controlSaisieIng(tabIng))


/* ----------------------fonction création la liste complete d'Appareil (start) sans valeur dans input---------------------*/

var tabApp=[];
function displayTagsStartsApp(array){
    tabApp=[]
    document.getElementById('listeApp').innerHTML=` `;
    array.forEach(elt=>{
        let eltt=elt.appliance
        eltt=eltt.toLowerCase()
        tabApp.push(eltt)
    })

    tabApp= new Set(tabApp);
    displayTags(tabApp,'listeApp',"App")
    clickChoixApp("App",array)
}
displayTagsStartsApp(tabRecActu)

function clickChoixApp(type){
    let choixApp = document.getElementsByClassName("elementListe"+type);
    
    for(var i=0; i<choixApp.length;){
        let index= choixApp[i].innerHTML
        index=index.slice(3,-4)
        choixApp[i].addEventListener('click',()=>callbackClickApps(index,type));
        i++
    }
    function callbackClickApps(index,type){
        new vignetteChoix(index,type)
        rechApps(index)
    }
        
    var tabApps=[]
    function rechApps(nom){
        tabApps=[]
        tabR.forEach(app=>{
            let appp=app.appliance
            appp=appp.toLocaleLowerCase()
            if(appp==nom){
                tabApps.push(app)
            }
        })
        tabR=tabApps
        new recetteDisplay(tabR,tabRecActu)
            
        actualisationStartSug()
    }
    
}

/*------------------------la saisie avec sugestion--------------------------- */
//fonction pour la saisie manuel dans l'input optionnel des appareils
var chaineTabApp=[];
function controlSaisieApp(array){
    var saisie=document.getElementById("appareil").value ;var nbCar=saisie.length
    saisie=saisie.toLowerCase()
    var chaine=array;var nbMotSaisie;
    let dernierFrappe=saisie.substring(nbCar-1)
    
    if(dernierFrappe != ' '){
        chaineTabApp=[];
        nbMotSaisie=saisie.split(' ').length;
        //recherche quand il y a plus de 1 mot
        if(nbMotSaisie>1){
            //recherche dans les appareils
            chaine.forEach(ing=>{
                if(saisie==ing.substring(0,nbCar)){
                    chaineTabApp.push(ing)
                }
            })
        }else{//recherche quand il n'y a qu'un mot
            if(nbCar>0){//verifie que le champs n'est pas vide
                chaine.forEach(ing=>{//recherche dans les appareils
                    let chaineMots=ing.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisie==ingg.substring(0,nbCar)){
                        chaineTabApp.push(ing)
                        }
                    })
                })
            }
        }
        //supprimer les doublons
        chaineTabApp=[new Set(chaineTabApp)]
        displayTags(chaineTabApp[0],'listeApp',"App")
        //réinitialise les sugestions à 0
        if(saisie==""){
            console.log("slt")
            displayTagsStartsApp(tabRecActu)
        }

    }
    //écoute les mots en sugestion
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
    },500)
}

/* ----------------------fonction création la liste complete d'Ustensil (start) sans valeur dans input---------------------*/

var tabUst=[];
function displayTagsStartsUst(array){
    tabUst=[]
    document.getElementById('listeUst').innerHTML=` `;
    array.forEach(ings=>{
        ings.ustensils.forEach(ing=>{
            let elt=ing
            elt=elt.toLowerCase()
            tabUst.push(elt)
        })
    })
    tabUst= new Set(tabUst);
    displayTags(tabUst,'listeUst',"Ust")
    clickChoixUst('Ust',array)
}
displayTagsStartsUst(tabRecActu)
function clickChoixUst(type){
    let choixUst = document.getElementsByClassName("elementListeUst");
    
    for(var i=0; i<choixUst.length;){
        let index= choixUst[i].innerHTML
        index=index.slice(3,-4)
        choixUst[i].addEventListener('click',()=>callbackClickUsts(index,"Ust"));
        i++
    }
    function callbackClickUsts(index,type){
        new vignetteChoix(index,type)
        rechUst(index)
    }
    var tabUsts=[]
    function rechUst(nom){
        tabR.forEach(obj=>{
            obj.ustensils.forEach(ust=>{
                let usts=ust.toLocaleLowerCase()
                if(usts==nom){
                    tabUsts.push(obj)
                }
            })
            
        })
        tabR=tabUsts
        new recetteDisplay(tabR,tabRecActu)
        actualisationStartSug()
    }
}
/*------------------------la saisie avec sugestion--------------------------- */

//fonction pour la saisie manuel dans l'input optionnel des appareils
var chaineTabUst=[];
function controlSaisieUst(array){
    var saisie=document.getElementById("ustensiles").value ;var nbCar=saisie.length
    saisie=saisie.toLowerCase()
    var chaine=array;var nbMotSaisie;
    let dernierFrappe=saisie.substring(nbCar-1)
    
    if(dernierFrappe != ' '){
        chaineTabUst=[];
        nbMotSaisie=saisie.split(' ').length;
        //recherche quand il y a plus de 1 mot
        if(nbMotSaisie>1){
            //recherche dans les ustensiles
            chaine.forEach(ing=>{
                if(saisie==ing.substring(0,nbCar)){
                    chaineTabUst.push(ing)
                }
            })
        }else{//recherche quand il n'y a qu'un mot
            if(nbCar>0){//verifie que le champs n'est pas vide
                chaine.forEach(ing=>{//recherche dans les ustensiles
                    let chaineMots=ing.split(' ')
                    chaineMots.forEach(ingg=>{
                        if(saisie==ingg.substring(0,nbCar)){ 
                        chaineTabUst.push(ing)
                        }
                    })
                })
            }
        }
        //supprimer les doublons
        chaineTabUst=[new Set(chaineTabUst)]
        displayTags(chaineTabUst[0],'listeUst',"Ust")
        //réinitialise les sugestions à 0
        if(saisie==""){
            displayTagsStartsUst(tabRecActu)
        }

    }
    //écoute les mots en sugestion
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
document.getElementById("ustensiles").addEventListener("input",()=>controlSaisieUst(NewtabUst))
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
    },500)
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
class recetteDisplay{
    constructor(tabChoix,tabStart){
        this.element=this.display(tabChoix,tabStart)
    }
    display(tabChoix,tabStart){
        if(tabChoix==tabStart){
            tabStart.forEach(element=>{new recetteFactory(element)}) 
        }else if(tabChoix.size<tabStart.length ||tabChoix.length<tabStart.length){
            let elt= document.getElementById('boxRecette')
            let element=document.getElementById("listeRecette")
            element.removeChild(elt)
            let eltt=document.createElement("div")
            eltt.setAttribute("id","boxRecette")
            element.appendChild(eltt)
            tabR.forEach(element=>{new recetteFactory(element)}) 
            
            
        }else{
            console.log("erreur dans la class recetteDisplay")
        }
    }
}
class recetteFactory{
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
        let nameCompress= element.name.replace(/ /g, "")
        let elt=document.createElement('a')
        elt.setAttribute('class','recette')
        elt.setAttribute('id',nameCompress)
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
new recetteDisplay(tabRecActu,tabRecActu)