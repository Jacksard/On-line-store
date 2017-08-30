$(document).ready(function(){
    $('.deleteProduct').on('click', deleteProduct);
    $('.editButton').click(function(){
        alert("The paragraph was clicked.");
    });
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
        window.location.replace('/admin');
        
    } else {
        return false;
    }
}

$('.editButton').click(function() {
    alert( "Handler for .click() called." );
  });
/*
function deleteProduct(value){
    console.log("hello Delete");
    console.log(value);
    var id = value;

    console.log(id);


}
*/