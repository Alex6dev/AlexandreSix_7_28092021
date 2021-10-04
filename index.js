import { recipes } from "./recipes.js";
  
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

function main(){
    console.log(recipes)
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
                <i class="fas fa-chevron-up fa-chevron-upIng"></i>
                <ul id="listeIng" class="listeTagsChoix"></ul>
            </input>
            
            <label for="appareil" ></label>
            <input type="text" class="App" id="appareil" name="appareil" placeholder="Appareil">
                <i class="fas fa-chevron-up fa-chevron-upApp"></i>
                <ul id="listeApp" class="listeTagsChoix"></ul>
            </input>
            
            <label for="ustensiles" ></label>
            <input type="text" class="Ust" id="ustensiles" name="ustensiles" placeholder="Ustensiles">
                <i class="fas fa-chevron-up fa-chevron-upUst"></i>  
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

var tabIng=[]
recipes.forEach(ings=>{
    ings.ingredients.forEach(ing=>{
        tabIng.push(ing.ingredient)})
})
var NewtabIng= new Set(tabIng)
NewtabIng.forEach(Ing=>{
    let elt=document.createElement('li')
    elt.textContent=`${Ing}`;
    document.getElementById('listeIng').appendChild(elt)

})
var tabApp=[]
recipes.forEach(recette=>{
    tabApp.push(recette.appliance)
})
var NewtabApp= new Set(tabApp)
NewtabApp.forEach(App=>{
    let elt=document.createElement('li')
    elt.textContent=`${App}`;
    document.getElementById('listeApp').appendChild(elt)

})

var tabUst=[]
recipes.forEach(recette=>{
    recette.ustensils.forEach(ust=>{ 
        tabUst.push(ust)})
})
var NewtabUst= new Set(tabUst)
NewtabUst.forEach(ust=>{
    let elt=document.createElement('li')
    elt.textContent=`${ust}`;
    document.getElementById('listeUst').appendChild(elt)

})

document.getElementById("ingredients").addEventListener("input",displayVignetteIng)
function displayVignetteIng(e){
    
    let evtt=e.target.value
    const regex=new RegExp('[a-zA-Z]{3,}')
    if(regex.test(evtt)){
        new vignetteIng(evtt)
    } 
}

class vignetteIng{
    constructor(nom){
        this.element=this.displayVignette(nom)
        document.getElementById("boxTagsActifs").appendChild(this.element)
        document.querySelector('#'+nom+' .croix').addEventListener('click',()=>this.removeVignette(nom)) 
    }
removeVignette(nom){
    let vignetteCibleRemove=document.getElementById(nom)
    document.getElementById("boxTagsActifs").removeChild(vignetteCibleRemove) 
}
displayVignette(nom){
    let elt=document.createElement("div");
    elt.setAttribute("class","etiquette")
    elt.setAttribute("id",nom)
    elt.classList.add("Ing") 
    elt.setAttribute("aria-label","étiquette filtre actif")
    elt.innerHTML=`
        <p>${nom}</p>
        <i class="far fa-times-circle croix"></i>
    `;
    return elt;
}

}
/*
<div class="etiquette Ing" aria-label="étiquette filtre actif"><p>coco</p><i class="far fa-times-circle croix"></i></div>
            <div class="etiquette App" aria-label="étiquette filtre actif"><p>fouet</p><i class="far fa-times-circle croix"></i></div>
            <div class="etiquette Ust" aria-label="étiquette filtre actif"><p>cuiellere</p><i class="far fa-times-circle croix"></i></div>
*/        
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
recipes.forEach(element=>{new recette(element)})   




    /*<table id="tabIng">
                <tbody>
                    <tr>
                        <td>Lait de coco</td>
                        <td>Jus de citron</td>
                        <td>Crème de coco</td>
                    </tr>
                    <tr>
                        <td>Sucre</td>
                        <td>Glaçons</td>
                        <td>Thon Rouge</td>
                    </tr>
                    <tr>
                        <td>Concombre</td>
                        <td>Tomate</td>
                        <td>Carotte</td>
                    </tr>
                    <tr>
                        <td>Citron Vert</td>
                        <td>Poulet</td>
                        <td>Coulis de tomate</td>
                    </tr>
                    <tr>
                        <td>Oignon</td>
                        <td>Poivron rouge</td>
                        <td>Huile d'olive</td>
                    </tr>
                    <tr>
                        <td>Riz blanc</td>
                        <td>Thon en miettes</td>
                        <td>Oeuf dur</td>
                    </tr>
                    <tr>
                        <td>Maïs</td>
                        <td>Vinaigrette</td>
                        <td>Pâte feuilletée</td>
                    </tr>
                    <tr>
                        <td>Crème fraiche</td>
                        <td>Gruyère râpé</td>
                        <td>Moutarde de dijon</td>
                    </tr>
                    <tr>
                        <td>Pomme</td>
                        <td>Oeuf</td>
                        <td>Sucre en Poudre</td>
                    </tr>
                    <tr>
                        <td>Chocolat au lait</td>
                        <td>Crème liquide</td>
                        <td>Beurre</td>
                    </tr>
                </tbody>
            </table> */