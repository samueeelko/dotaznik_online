console.log('auth.js loaded')

let client

function initAuth(supabaseClient){
    client = supabaseClient
}
console.log('auth.js exists: ', typeof initAuth )


async function checkUser(){
    const { data: { user }, error } =  await client.auth.getUser()

    if (error){
        console.error(error)
        showLogin()
    }
    if (user) {
        console.log('user already exists: ',  user.email)
        showQuestionnaire()
    }
    else{
        showLogin()
    }
}

//samotne prihlasenie cez magic link
async function signInWithEmail(email) {

}

function showLogin(){
    document.getElementById('loginSection').style.display = 'block'
    document.getElementById('questionnaireSection').style.display = 'none'

}

async function sendMagicLink(){
    const email = document.getElementById('emailInput').value
    console.log(email)
    const messageDiv = document.getElementById('inputMessage')

    if (!email){
        messageDiv.textContent = 'Zadajte email'
        messageDiv.style.color = 'red'
        return;
    }
    if (!email.includes('@')){
        messageDiv.textContent = 'Prosím, zadajte platný email'
        messageDiv.style.color = 'red'
        return;
    }
    else{
        // messageDiv.textContent = 'Posielam link'
        // messageDiv.style.color = 'green'

        try{
            const { data, error } = await client.auth.signInWithOtp({
                email: email,
                options: {
                    shouldCreateUser: false,
                    emailRedirectTo: window.location.href,
                }
            })

            if (error){
                console.error(error)
                messageDiv.textContent = 'Chyba: ' + error.message
                messageDiv.style.color = 'red'
            }
            else{
                console.log(data)
                messageDiv.textContent = 'Link odoslaný. Skontrolujte email'
                messageDiv.style.color = 'green'
            }
        }catch(e){
            console.error(e)
            messageDiv.textContent = 'Neočákavaná chyba: ' + e
            messageDiv.style.color = 'red'
        }
    }
}

function setupAuthListener() {
    console.log(" Nastavujem auth listener...");

    // Počúvaj na zmeny (SIGNED_IN, SIGNED_OUT, atď.)
    client.auth.onAuthStateChange((event, session) => {
        console.log(" Auth event and seesion:", event, session);

        if (event === 'SIGNED_IN') {
            // User sa prihlásil
            console.log(" User sa práve prihlásil");
            showQuestionnaire();
        } else if (event === 'SIGNED_OUT') {
            // User sa odhlásil
            console.log(" User sa odhlásil");
            showLogin();
        }
    });
}

async function logout(){
    try{
        const {error} = await supabse.auth.signOut()

        if (error){
            console.error(error)
        }
        else{
            showLogin()
            console.log('User logged out')
        }

    }catch(e){
        console.error("Neocakavana chyba: ", e)
    }

}
