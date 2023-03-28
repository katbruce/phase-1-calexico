// Write your code here...
// ## Challenge #1
// Fetch all the menu items from `http://localhost:3000/menu`. For each menu item create a `span` element that contains the name of the menu item, and add it to the `#menu-items` div.
document.addEventListener("DOMContentLoaded", () => {
    
    fetch(`http://localhost:3000/menu`)
    .then(res => res.json())
    .then(data => {
        data.forEach(renderMenu)
        renderItem(data[0])
    })

    function renderMenu(object){
        const menu = document.getElementById("menu-items");
        let item = document.createElement("span");
        item.textContent = object.name;
        menu.append(item); 
        item.addEventListener("click", () => renderItem(object));
    }
    // ## Challenge #2
    // When the page loads, display the first menu item. You should set the image, name, description, and price. All the correct elements to set are located in the `#dish` `section` element.
    function renderItem(object){
        const toCart = document.getElementById("cart-form");
        
        document.getElementById("dish-image").src = object.image
        document.getElementById("dish-name").textContent = object.name
        document.getElementById("dish-description").textContent = object.description
        document.getElementById("dish-price").textContent = object.price
        document.getElementById("number-in-cart").textContent = object.number_in_bag

        let inCart = document.getElementById("number-in-cart")
        
        toCart.addEventListener("submit", (event)=>{
            event.preventDefault();
            let tempCart = parseInt(inCart.textContent)
            //console.log(typeof tempCart)
            const numInput = parseInt(event.target.children[0].value)
            tempCart += numInput;
            document.getElementById("number-in-cart").textContent = tempCart.toString();
            console.log(tempCart);

            fetch(`http://localhost:3000/menu/${object.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'	
                },
                body:JSON.stringify({
                    number_in_bag: tempCart
                })
            })
            .then(document.getElementById("number-in-cart").textContent = tempCart)
            .then(toCart.reset())
            toCart.removeEventListener("click", ()=>{})
                  
        })
        
    }
    

    


    // ## Challenge #3
    // When the user clicks on the menu items on the left, they should see all the details for that specific menu item.
    // ## Challenge #4
    // The user should be able to add the menu items to their cart. When the user presses the 'Add to Cart' button, that number should be added to however many are currently in the cart.

    // For example, if there are currently 2 burritos in the cart, and the user adds 2 more, the total should be 4.

    // > *It is okay if the value resets in-between clicking on the menu items! It does not need to save state!*
    // ---
    // # Bonus Challenges!

    // ## Bonus Challenge #1
    // The value of the cart for each item should persist when clicking through the various menu items.

    // ## Bonus Challenge #2 
    // Calculate the *total cost* of what is currently in the cart and display it somewhere on the page.

    // //## Bonus Challenge #3
    // //Use PATCH requests to maintain the value of the cart in-between refreshes.
})