/*const recipes = [ 
    {
        "id": 1,
        "name" : "Limonade de Coco",
        "servings" : 1,
        "ingredients": [
            {
                "ingredient" : "Lait de coco",  
                "quantity" : 400,
                "unit" : "ml"
            },
            {
                "ingredient" : "Jus de citron",
                "quantity" : 2
            },
            {
                "ingredient" : "Crème de coco",
                "quantity" : 2,
                "unit" : "cuillères à soupe"
            },
            {
                "ingredient" : "Sucre",
                "quantite" : 30,
                "unit" : "grammes"
            },
            {
                "ingredient": "Glaçons"
            }
        ],
        "time": 10,
        "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
        "appliance": "Blender",
        "ustensils": ["cuillère à Soupe", "verres", "presse citron" ]
    },
    {
        "id": 2,
        "name" : "Poisson Cru à la tahitienne",
        "servings": 2,
        "ingredients": [
            {
                "ingredient" : "Thon Rouge (ou blanc)",
                "quantity" : 200,
                "unit" : "grammes"
            },
            {
                "ingredient" : "Concombre",
                "quantity" : 1
            },
            {
                "ingredient" : "Tomate",
                "quantity" : 2
            },
            {
                "ingredient" : "Carotte",
                "quantite" : 1
            },
            {
                "ingredient" : "Citron Vert",
                "quantity" : 5
            },
            {
                "ingredient" : "Lait de Coco",
                "quantity" : 100,
                "unit" : "ml"
            }
        ],
        "time": 60,
        "description": "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouver ajouter 1 à 2 cuillères à soupe de Crème de coco",
        "appliance": "Saladier",
        "ustensils": ["presse citron"]
    },{
        "id": 3,
        "name": "Poulet coco réunionnais",
        "servings": 4,
        "ingredients": [
            {
                "ingredient": "Poulet",
                "quantity" : 1          
            },
            {
                "ingredient": "Lait de coco",
                "quantity" : 400,
                "unit" : "ml"
            },
            {
                "ingredient": "Coulis de tomate",
                "quantity" : 25,
                "unit" : "cl"
            },
            {
                "ingredient": "Oignon",
                "quantity" : 1
            },
            {
                "ingredient": "Poivron rouge",
                "quantity": 1
            },
            {
                "ingredient": "Huile d'olive"
            }
        ],
        "time": 80,
        "description": "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
        "appliance": "Cocotte",
        "ustensils": ["couteau"]
    }
]*/

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
            <input type="text" id="recherche" name="recherche" placeholder="Rechercher un ingrédient, appareil, ustensiles ou recette "></input>
            <i class="fas fa-search loupe"></i>
        </div>
        <div id="boxTagsActifs">
        
        </div>
        <section id="boxZoneDesInputs">
            <label for="ingredients" ></label>
            <input type="text" class="Ing" id="ingredients" name="ingredients" placeholder="Ingredients"></input>
            <i class="fas fa-chevron-up fa-chevron-upIng"></i>
            
            <label for="appareil" ></label>
            <input type="text" class="App" id="appareil" name="appareil" placeholder="Appareil"></input>
            <i class="fas fa-chevron-up fa-chevron-upApp"></i>
            <label for="ustensiles" ></label>
            <input type="text" class="Ust" id="ustensiles" name="ustensiles" placeholder="Ustensiles"></input>
            <i class="fas fa-chevron-up fa-chevron-upUst"></i>    
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
document.getElementById("ingredients").addEventListener("input",displayVignetteIng)
function displayVignetteIng(e){
    e.preveutDefault();
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