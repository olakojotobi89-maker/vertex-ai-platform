/* ============================
   VERTEX AI DESIGN SYSTEM
   ============================ */

:root{

    --primary:#E11D2E;
    --background:#070707;
    --surface:#161616;
    --surface-light:#1D1D1D;
    --border:#2A2A2A;

    --white:#FFFFFF;
    --gray:#9E9E9E;
    --gray-light:#CCCCCC;

    --radius:20px;
    --transition:.3s;

}

/* Reset */

*{

margin:0;

padding:0;

box-sizing:border-box;

font-family:'Inter',sans-serif;

}

body{

background:var(--background);

color:var(--white);

}

/* Container */

.container{

width:100%;

max-width:430px;

margin:auto;

padding:20px;

}

/* Section */

.module{

margin-bottom:25px;

}

/* Section Header */

.module-header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:15px;

}

.module-header h2{

font-size:20px;

font-weight:700;

}

.module-header a{

text-decoration:none;

color:var(--primary);

font-size:14px;

}

/* Universal Card */

.card{

background:var(--surface);

border:1px solid var(--border);

border-radius:var(--radius);

padding:18px;

transition:var(--transition);

}

.card:hover{

border-color:var(--primary);

transform:translateY(-3px);

}

/* Buttons */

.btn-primary{

width:100%;

height:52px;

border:none;

border-radius:16px;

background:var(--primary);

color:white;

font-size:16px;

font-weight:600;

cursor:pointer;

}

.btn-secondary{

width:100%;

height:52px;

border:1px solid var(--border);

background:transparent;

color:white;

border-radius:16px;

cursor:pointer;

}

/* Inputs */

.input{

width:100%;

height:54px;

background:var(--surface-light);

border:1px solid var(--border);

border-radius:16px;

padding:0 18px;

color:white;

outline:none;

margin-bottom:15px;

}

.input:focus{

border-color:var(--primary);

}

/* Small Badge */

.badge{

padding:6px 12px;

border-radius:30px;

background:#1b1b1b;

color:var(--gray-light);

font-size:12px;

display:inline-block;

}