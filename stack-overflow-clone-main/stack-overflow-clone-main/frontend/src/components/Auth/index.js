import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./index.css";

function Index() {
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  }

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        history.push("/");
        // return (
        //   <>

        //   </>
        // );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSignIn = () => {
    setError();
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // console.log(res);
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleRegister = () => {
    setError("");
    setLoading(false);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // console.log(res);
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <p>Add another way to log in using any of the following services. </p>
        <div className="sign-options">
          <div onClick={handleGoogleSignIN} className="single-option">
            <img
              alt="google"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAABGlBMVEX////qQzU0qFNChfT7vAU7gvR+p/cre/PK2fvt8v0ddvP7uQD/vQDqQTPqPi8spk4hpEfpMBz2v7zpMyHpOiroJg38wAD++fn7tQD80n0yfvPF4svtaWDsWk/1sq7/+OuQyZ1Kr2P1+va73cL97u3vf3jrT0L4zMrudGz0qqXsX1X74N7pODf7wTv+7Mz8yVv92pn+8Nj7viP93qX8zmv8xk5wnvZSjfT94a/91oqWtvjb5fwAnznb7d+1y/ozqkZftnR2voao1LHxlI/yn5r0jwDsUDLvbSvziiL2oBftXS/weSj4pwCnwfnitgAAa/LGtSuasUBXqkyuszSArkQAplkzmpc2pmY+kck/ma04n4hAjN48lbk7ooAH9liuAAAGNklEQVRogdWY63qbRhCGEUaxHXEUyKiSLIPOh9pOnNZKbMlCktvGbe06aZykaXv/t9FdQBKCXdhl4fHT75cdQ15m5pthWI5LoU6/PFx1G6NeAag3GnRvm+VxJ83/RIkdDiTD0HVDliUJoCVJkt3fDWkw7Of2AOa42ejpuseMCDyDrvcazXEO5M7tSNdkJDbwALKmN5rZRm+WBxVdjucG8N1+duhhoUIGXuMrvXImYPO2oiekGoHXjGYGZEOnBXt0nTX2co8+5rVkrcFg+s5AS02GMoyhmRLd1AwWcgGWfZSq4cxGhZEMJVdSeK5vsAbtSxvQom/Teyws/Zgq72aXzWS7MnoUfjcb6XoaJ9kgHrLmcUalXkvShoToTiFjdIHY6x2J5r1BhCYdrmYhY7REjs6+1qQJNwfZOhy8zojn2krLFl0gjpprEo9wWTZ0DQqurPg5RFxrbmwQTTPZqGij7mpY7vf7ZbCqD44rGvpOcrTZI7C4pGuNVb+z8142O/3VKIondzjHdZMtLuvHt2PkPmCOV73dlwC5w8FbM7HYsj4qxywinWZww6JwOMclFVvSeomvhOF21aGImlsldLZBtPWa3YoXAkWtuXFCZ1e6hBuAt/DQoLlBrNFkigx2GjqNw8HTxoZtFGi+sEDeqRbERlxrG3QbF4iE5uKzn76PQ6fd8Il0elT9GUfPGX1WEo6EX9BwuZArmjsvCYJw9B41XCQ931Ock6oAdXRXiIQu6RmeIaD0qiR48OqvYbi+yhfNXQhrHf22C5ePc0a/rgpb+N0OXMvjyCqo70pCAP57oNlyz7h5IQQVaDapkPdJZTDlHv29D9dJP6NS61VJCMPvJK+/8p0qQOdhNICXYNGNvKvNnVxE2V6zVXIPO1Ludd5l6oMSar2JlHvdbNmcicbpBwxbEE5yZ5/i0D8m33t4+SKlruDtJzh26Q0B+2UxnWoTePtrXNilMxL2XkpNDjl3ZUHrgqDc6dl713FsgnIzsGsH4Pa3OPZ5rux9yI5Oc7/c7/KN+wbc/g7HJrA5C/ueCy0OAVXf5suGDY4ba1WCFvu/sl88H7sI2c9Ub5f9XD6H7Ofqb+g13Fwr5TvXXPZzzfP7OHa+7zF3pj7T+9t9l+D3FoImY3yHYve1Esm+lr6/4e6A31NLyQVn3Jmw+7n4UE9m/7EfrxqW7d6P+S4RHxUnOekHCbrBpfzSvR39PSZ8eOKnrWR4gq4xgbujhUN+h4rCxyeeVyxm9j2G7bYYh5ro4oPCQynMgU+KGPa19/dwwUXxT96TumREX2PQvs0j5y2i8OmJX4sxcFzKfatxofVBfPi4IfOqxcbGhb222m7Sxcdt0BA+Y0Hf7GPYL68312ySLoofdtC8YrOwMeRtubmt03fyzZ51XLW9Zc2Xf44sPobJEJ48WTE6xFV7092u3PPzTWuF4GlLfoll14KXgeVFFD89IdlKyka7whltr3i1c+Gp+IAEp/cb1uOhlIPAH9FBe1m36SM/wKP3iqFrHQXPBpHTwuPQ7poYVF2NYYOa07n9BrszQB2GL1/EBc4rapsCjbfZXnCebjSLDZznpwvSvB9O4tCIsDnOSoCrhG9Ua/q5hu1sZNhAsUl36QRVb4Or5l8m+HpPEGEDu02T4Ipq1+My31rabvIU5Ssu7fthk/taJGTdo1uYGduaLXh1nbv5X0Vk3rdLQ1h2Ytph5lXHCkffmi0X9jR49/wbclULvLhDSvL6Jvipai+sZbsO1F5aC0eZquHHnn/5O1p0tNE8tRNLvuEriuoL/Ii8Yv5PuOjFCR6d3GhUmn8LNVsN6fGNnEzhu3mPDPKQWkR+I5XKf93C44rtw/ks4YFmq2HbKz/4vx483mc5wRUFFr1YjPfZBm5naTjYbMDvZGgAz9TtIO+f0W8QtAhGO4UoF74sh4xKvHb4qkcmdFpNLToyB4tOPNzjpExTfVS1p+yhq07K44MZq98VheHUpM3S6oq6YDo6aC2VtHSw3LGQXbo1TUEHT0zzNYHXkqd0nTK1syFDtRfRjQwfssJW54hmlqMS4EGunTb7OWwUv3TsOD74m72oZxtyQK360nE31MByqvj/YFvt3LjbB5i5S7ljQ7JtO+6qTo/9D1XNzc5EdnCHAAAAAElFTkSuQmCC"
            />
            <p>{loading ? "Signing in..." : "Login with Google"}</p>
          </div>
          <div className="single-option">
            <img
              alt="github"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeQUMAvJVxPLlFcTIsPy0n0MciQmle4RBwvNxFX6SGHA&s"
            />
            <p>Login with Github</p>
          </div>
          <div className="single-option">
            <img
              alt="facebook"
              src="data:image/png;base64,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"
            />
            <p>Login with Facebook</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                {" "}
                <div className="input-field">
                  <p>Username</p>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text" />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input type="password" />
                </div>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            )}

            <p
              onClick={() => setRegister(!register)}
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {register ? "Login" : "Register"} ?
            </p>
          </div>
        </div>
        {error !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Index;
