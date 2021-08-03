const initialState = {
    uid:''
}
export default function authReducer(state=initialState,action){
    switch(action.type){
        case "SIGN_IN":
            
            fetch("http://localhost:4000/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload)
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data)
                   return {
                       ...state,
                        uid:data.insertedId
                   }
                })
           
            
        default:
            return state
    }
}