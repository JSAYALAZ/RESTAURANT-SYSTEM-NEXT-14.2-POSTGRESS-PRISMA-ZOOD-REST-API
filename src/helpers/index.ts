export function formatCurrency(ammount: number){
    return new Intl.NumberFormat('en-US',{
        style: 'currency', 
        currency: 'USD',
    }).format(ammount);
}

export function getImagePath(imagePath:string){
    const claudinaryBaseUrl = "https://res"
    if(imagePath.startsWith(claudinaryBaseUrl)){
        return imagePath
    }else{
        return `/products/${imagePath}.jpg`
    }
}