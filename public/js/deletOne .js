 const deleteBtn = document.querySelectorAll('.del')
 const postItem = document.querySelectorAll('span.not')

 const todoComplete = document.querySelectorAll('span.completed')

 Array.from(deleteBtn).forEach((el) => {
     el.addEventListener('click', deletePost)
 })



 // function deleteIndividualPost(){
 //     console.log('OJB')
 // }

 async function deletePost() {

     const postId = this.parentNode.dataset.id
     console.log(postId)
     try {
         const response = await fetch('post/deletePost', {
             method: 'delete',
             headers: { 'Content-type': 'application/json' },
             body: JSON.stringify({
                 'postIdFromJSFile': postId
             })
         })
         const data = await response.json()
         console.log(data)
         location.reload()
     } catch (err) {
         console.log(err)
     }
 }