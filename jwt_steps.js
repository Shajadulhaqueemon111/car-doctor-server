/**
 * .............Make Api seciure..........
 * 
 * 1. Install jsonwebtoken
 * 2. jwt.sing(payload,secreet,{expiresIn:})
 * 3. token client
 * 
 *  .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
       jonkor mahabub

    //app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));
 */