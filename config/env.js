const development = {
    name : 'development',
    session_cookies_key : 'Secret-key',
    db : 'codial_development',
    smtp :{host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
       user: "yashirathore324@gmail.com",
       pass: "omfb mini ebwf olly"
    }},
    clientID : "249345451672-r8h5pgefchueii10fmkbj74datue02ff.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:7000/auth/google/callback",
    JWT_KEYORSECRET : 'CODEIAL'
}

    const Production = {
        name : 'Production',
        session_cookies_key : 'YdGOhiCAtKadKstgtyYutNYvgRUXoOWOSecret-key',
        db : 'codial_production',
        smtp :{host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
           user: "yashirathore324@gmail.com",
           pass: "omfb mini ebwf olly"
        }},  clientID : "249345451672-r8h5pgefchueii10fmkbj74datue02ff.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://codeial.com/auth/google/callback",
        JWT_KEYORSECRET : "CODEIAL"
    }

    module.exports = development;
     module.exports = Production;
