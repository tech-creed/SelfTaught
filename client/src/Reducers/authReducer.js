const initialState = {
  uid: "",
  verificationCode: "",
  errorMessage: "",
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN":
      fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.hasOwnProperty("message")) {
            state.errorMessage = data.message;
          } else {
            state.uid = data.id;
            state.verificationCode = data.verificationCode;
          }
        });

      return state;
    case "LOG_IN":
      fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.hasOwnProperty("message")) {
            state.errorMessage = data.message;
          } else {
            state.uid = data.id;
          }
        });

      return state;

    default:
      return state;
  }
}
