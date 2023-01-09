const form = document.getElementById('form');
const qr = document.getElementById('qr-code');

const onGenerate = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Ajouter un url') 
    }else{
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQrCode(url, size);

            setTimeout(() =>{
                //on recupere l'element img contenu dans l'element qr
                const saveUrl = qr.querySelector('img').src;
                //saveButton va creer un a avec le href de la source de l'image
                saveButton(saveUrl);
            }, 50);

        }, 1000);
    }   
};
// 
const generateQrCode = (url, size) => {
    //on passe l'id qr-code ouu notre qr sera generer
    const qrcode = new QRCode('qr-code', {
        text: url,
        width: size,
        height: size,

    });
}
// Enlever le qr code et le btn apres un nouveau form submit
const clearUI = () =>{
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if(saveLink) saveLink.remove();
}
//cree le btn qui permeeet de telecharger l'image
const saveButton = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-gray-800 w-full rounded text-white py-3 px-4 mt-5 hover:bg-gray-700';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML= "Enregistrer l'image";
    document.getElementById('generate').appendChild(link);

}
const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}
hideSpinner();
form.addEventListener('submit', onGenerate);