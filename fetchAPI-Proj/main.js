const getData = async (resource)=>{
    //checking if data is text or json
    const response = await fetch(resource);
    const text = await response.text();
    try {
        const data = JSON.parse(text);
        return data
        //if parsed then it is json
    } catch (error) {
        //else it is text, because is parsing give error code will go to catch and then we can handle text here
        return text;
    }
}
//Getting text from samples.txt
document.querySelector('#getTexts').addEventListener('click', ()=>{
    getData('sample.txt')
    .then(data =>{
        document.querySelector('#outputText').innerHTML = `<p class="text-center text-primary mt-3 fs-2">${data}</p>`;
    })
    .catch(err => console.error(err.Message))
});

//Getting users from JSON
document.querySelector('#getUsers').addEventListener('click',()=>{
    getData('user.json')
    .then(data=>{
        let output = '<h2 class="text-center mt-3 text-primary">Users</h2>'
        data.forEach(user=>{
            output+=`
                <ul class="list-group mb-3">
                    <li class="list-group-item list-group-item-primary">User ID: ${user.userId}</li>
                    <li class="list-group-item list-group-item-secondary">ID: ${user.id}</li>
                    <li class="list-group-item list-group-item-secondary">Title: ${user.title}</li>
                    <li class="list-group-item list-group-item-secondary">Completed: ${user.completed}</li>
                </ul>
            `;
        })
        document.querySelector('#outputText').innerHTML = output;
    })
    .catch(err=>console.error(err.Message))
})

document.querySelector('#getPosts').addEventListener('click',()=>{
    getData('https://jsonplaceholder.typicode.com/posts')
    .then(data=>{
        let output = '<h2 class="text-center mt-3 text-primary">Posts</h2>';
        data.forEach(post=>{
            output +=`
                <div class="card card-body mb-3 text-center text-bg-primary">
                    <h3 class="card-title">${post.title}</h3>
                    <hr>
                    <p class="card-body">${post.body}</p>
                </div>
            `
        });
        document.querySelector('#outputText').innerHTML = output;
    })
    .catch(err=>console.err(err.Message))
})

document.querySelector('#addPost').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value
    const body = document.querySelector('#body').value
    //second parameter to add attributes for fetch
    if(title !== '' && body !== ''){
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                title: title,
                body: body
            } )   
        })
        .then(res => res.json())
        .then(post => {
            let output = '<h2 class="text-center mt-3 text-success">Post added successfully</h2>';
            output +=`
                <div class="card card-body mb-3 text-center text-bg-primary">
                    <h3 class="card-title">${post.title}</h3>
                    <hr>
                    <p class="card-body">${post.body}</p>
                </div>
            `
            document.querySelector('#outputText').innerHTML = output;
            setTimeout(()=>{
                document.querySelector('#outputText').innerHTML = ''
            },1500)
        })
        .catch(err=>console.err(err.Message));
    }else{
        document.querySelector('#outputText').innerHTML = `<div class="mt-3 alert alert-danger" role="alert">
            Please fill all the details
        </div>`;
        setTimeout(()=>{
            document.querySelector('#outputText').innerHTML = ''
        },1500)
    }
    //data will not persist to API
    document.querySelector('form').reset();
})


document.querySelector('#clearOutput').addEventListener('click', ()=>{
    document.querySelector('#outputText').textContent = '';
})

