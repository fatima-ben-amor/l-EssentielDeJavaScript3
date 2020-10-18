let contactForm = document.getElementById('frmContact');

//cette ligne contient la des champs à valider donc je vais la declarer en dehors de code pour qu'elle possede la portée globale et sera accédé par tous 
let fields = document.querySelectorAll('input[required], textarea[required]');

//je vais boucler dans ces champs et je vais ecouter l'evenement focus qui aura lieu lors de passage a un autre champs 
fields.forEach((field) => {
    field.addEventListener('focus', () => { resetField(field), false });

    //je vais ecouter l'evenemt blur qui est l'inverse de leven focus il se produit au moment ou vous quittez le champs de formulaire
    field.addEventListener('blur', () => { validateField(field), false });


})

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //je vais executer la fonction resetField avant de proceder a une nouvelle validation
    fields.forEach((field) => {resetField(field)});


    let valid = true; //cette variable devienne false si l une des champs a valider n'est pas validé
    //la methode foreach permet d'executer une fnct pour chac1 de ces quatres elements
    fields.forEach((field) => {
        if (!validateField(field)) { //ne s execute que le champs n est pas valide donc si field.checkValididty return true alors grace a ! ca sera false et donc ce bout de cde ne sera pas executer et valid reste = true
            //et si field.checkValididty return false alors grace a ! ca sera true et donc ce bout de code sera executé et la variable valid va changer en false
            valid = false;
        }
    });
    if (valid) {
        e.target.submit();
    }

}, false);
function validateField(field) {
    if (field.checkValidity()) {
        return true; // va etre envoyer a la ligne 10
    }
    else {
        field.classList.add('invalid'); //je vais ajouter la classe css invalid sur mon champs formulaire
        // previousElementSibling veut dire l'element frere qui precede field et c'est le label et juste avant la fin de ce label je ajouter de html et ${field.validationMeassge} c'est le message genere par le navigateur
        field.previousElementSibling.insertAdjacentHTML('beforeend', `<span class="msg">${field.validationMeassge}</span>`);
        return false; //va etre envoyer a la ligne 10
    }
    
}

function resetField(field) {
    let fieldLabel = field.previousElementSibling; //je vais chercher le label ds le code html 
    
    //puis je remove la classe invalid 
    field.classList.remove('invalid');
    
    //puis je vais retirer l'element span que j'avais été injecter dans le label
    //sig si ce label possede un 1er element enfant
    while (fieldLabel.firstElementChild) {
        //et tant qu'im possede
        fieldLabel.removeChild(fieldLabel.firstElementChild);   //j'utilise firstElementChild pas firstChild car je vais vider les elements pas les textes car par exemple Prenom et Nom sont des textes  
    }

    field.valid = true; //ca c'est pour tout remettre a zero

}