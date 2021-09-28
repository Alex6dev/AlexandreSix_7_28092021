function enTete(){
    const element=document.createElement("header");
    element.innerHTML=`
    <a href="index.html"><img src="logo.png" aria-label="lien vers accueil"/></a>
    `;
    document
        .getElementById('app')
        .appendChild(element)
    
}
enTete();
