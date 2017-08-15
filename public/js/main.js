$(document).ready(function(){
    $('.deleteProduct').on('click', deleteProduct);
});

function deleteProduct(){
    var confirmation = confirm('Are you sure?');

    if (confirmation){
        console.log('hello');
     $.ajax({
            type:'DELETE',
            url: '/products/delete/'+$(this).data('id')
        }).done(function(response){
            window.location.replace('/');
        });
        window.location.replace('/');
        
    } else {
        return false;
    }
}


/*
function deleteProduct(value){
    console.log("hello Delete");
    console.log(value);
    var id = value;

    console.log(id);


}
*/