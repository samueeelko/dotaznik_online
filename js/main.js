const supabaseProject = 'https://fhoxdanqrvlmwwrukpux.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob3hkYW5xcnZsbXd3cnVrcHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTI4MzksImV4cCI6MjA4Mzk4ODgzOX0.fvF441pHhhvHEZkM7_-YHbEV4s9h3tjfojkWOPe0WWA'
const supabase = window.supabase.createClient(supabaseProject, supabaseKey)


initAuth(supabase)

setupAuthListener()

setupQuestionListener()


//listenery na prihlasenie usera
document.getElementById("loginButton").addEventListener('click', sendMagicLink)

document.getElementById("emailInput").addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMagicLink()
    }
})

//listener na odhlasneie

document.getElementById("logoutBtn").addEventListener('click', logout)