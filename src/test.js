import { useEffect, useState } from "react";
// import { onMessageListener } from "./helpers/firebase";
// import { notify } from "react-notify-toast";
import firebase from "./helpers/firebase";
const Test = () => {
  const [change, setChange] = useState("true");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");

  const [eMsgId, setEMsgId] = useState();
  const [edit, setEdit] = useState(false);

  const db = firebase.firestore();

  // useEffect(() => {
  //   onMessageListener()
  //     .then((message) => {
  //       console.log("from TheHeaderDrpodownNotif.js", message);
  //       setChange(!change);
  //       let myColor = { background: "#0E1717", text: "#FFFFFF" };
  //       notify.show(message.notification.body, "custom", 5000, myColor);
  //     })
  //     .catch((error) => console.log(error));
  // }, [change]);

  useEffect(() => {
    // setChat([])
    console.log("useEffect Called");

    db.collection("chatting")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        var xyz = [];
        console.log("this called");
        querySnapshot.docs.map((doc, i) => {
          let newObj = {
            data: doc.data(),
            id: doc.id,
          };
          xyz.push(newObj);
          // setChat((oldArray) => [...oldArray, doc.data()]); //  console.log("xyz",i,xyz)
          return true;
        });
        setChat(xyz);
      });
  }, [db]);

  /*
  const sendMsg = async () => {
    console.log("sender");
    // setChat([]);
    document.getElementById("te").value = "";
    const done = await db.collection("chatting").add({
      name: msg,
      createdAt: Date.now(),
      type: "sender",
    });
    setMsg("");
    console.log(done);
  };
  */

  const sendMsg2 = async () => {
    // setChat([]);
    document.getElementById("tex").value = "";

    console.log("Msg", msg);

    if (edit) {
      db.collection("chatting").doc(eMsgId).update({ name: msg }); //for edit
      setEMsgId("");
      setEdit(false);
    } else {
      const done = await db.collection("chatting").add({
        name: msg,
        createdAt: Date.now(),
        type: "sachin",
      });
      console.log(done);
      setMsg("");
    }
  };

  const deleteChat = async (chatId) => {
    const res = await db.collection("chatting").doc(chatId).delete();
    // db.collection("chatting").doc(chatId).update({ name: "bar" }); //for edit
  };

  const editMsg = (msgToBeEdited) => {
    // console.log("Hello", msgToBeEdited);
    document.getElementById("tex").value = msgToBeEdited;
    document.getElementById("tex").focus();
  };

  return (
    <div
      style={{
        marginLeft: "400px",
        marginRight: "400px",
        backgroundColor: "#000000",
      }}
      className="border mt-3 "
    >
      {/* {console.log("chat",chat)} */}
      {chat &&
        chat.map((chat, i) => (
          <div className="mr-5 ml-5 mt-3">
            {chat?.data.type !== "sachin" ? (
              <div key={i} className="text-left ">
                <span
                  className="text-left bg-primary text-light p-1"
                  style={{
                    width: "auto",
                    border: "2px solid ",
                    borderRadius: "0px 5px 5px 5px",
                  }}
                >
                  {chat.data.name}

                  <sub
                    style={{
                      color: "white",
                      fontSize: "12px",
                      paddingLeft: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {new Date(chat.data.createdAt).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </sub>
                </span>
              </div>
            ) : (
              <div key={i} className="text-right">
                <span
                  className="text-right bg-dark text-light p-1 "
                  style={{
                    width: "auto",
                    border: "2px solid ",
                    borderRadius: "5px 0px 5px 5px",
                  }}
                >
                  {chat?.data.name}

                  <sub
                    style={{
                      color: "white",
                      fontSize: "12px",
                      paddingLeft: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {new Date(chat.data.createdAt).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </sub>
                </span>

                {/* <button
                  className="btn btn-danger"
                  onClick={() => deleteChat(chat.id)}
                  style={{
                    height: "30px",
                    width: "30px",
                    fontSize: "12px",
                    padding: "10px",
                  }}
                >
                  Del
                </button> */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                  // style={{ marginTop: "6px" }}
                  onClick={() => deleteChat(chat.id)}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setEMsgId(chat.id);
                    setEdit(true);
                    editMsg(chat.data.name);
                  }}
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </div>
            )}
            <br />
          </div>
        ))}
      {/* 
      <input
        type="text"
        onChange={(e) => setMsg(e.target.value)}
        id="te"
      ></input>
      <button onClick={sendMsg}>send by sender</button> */}

      <div className="text-center mt-3  mb-4">
        <input
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          id="tex"
          style={{
            width: "80%",
            border: "2px solid",
            borderRadius: "5px",
            height: "40px",
          }}
          placeholder="Type a message..."
          onKeyDown={(event) => event.key === "Enter" && sendMsg2()}
        ></input>
        {/*         
        <button className="btn btn-light" onClick={sendMsg2}>
          Send
        </button> */}
      </div>
    </div>
  );
};

export default Test;
