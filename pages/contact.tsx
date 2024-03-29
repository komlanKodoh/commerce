import LoadingController from "../component/LoadingController";
import { checkForm } from "../shared/UtilityFunctions";
import Input from "../component/Inputs/NormalInput";
import TextArea from "../component/Inputs/TextArea";
import React, { useState, useEffect } from "react";
import Errors from "../component/Inputs/Errors";
import { useRouter } from "next/router";
import axios from "axios";

function Contact() {
  const {
    query: { focus },
  } = useRouter();

  useEffect(() => {
    setInputValue({ focus: focus?.toString() || "", message: "", contact: "" });
  }, [focus]);

  const [inputValue, setInputValue] = useState({
    focus: "",
    contact: "",
    message: "",
  });

  const [inputState, setInputState] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [errors, setErrors] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = async () => {
    setErrors([]);
    setSubmitCount((prevState) => prevState + 1);
    const errors = [];

    checkForm(inputValue, {}, errors);
    if (errors.length > 0) {
      return setErrors(errors);
    }

    setInputState("loading");

    let response;

    response = await axios
      .post("/api/contact_message", {
        contact: inputValue.contact,
        focus: inputValue.focus,
        msg: inputValue.message,
      })
      .catch((err) => (response = err.response));

    if (response.status === 200) {
      setInputState("success");
      setSubmitCount(0);
    } else setInputState("failure");
  };

  useEffect(() => {
    document.getElementById("__next").scroll(0, 0);
  }, [inputState]);

  return (
    <div className="big-container">
      <LoadingController
        state={inputState}
        setState={setInputState}
        pseudoStateDuration={1500}
        customMessage={{
          success: "Message received",
          failure: "Something went wrong.",
        }}
      >
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <h3
            style={{
              textAlign: "center",
              textDecoration: "underline",
              margin: "var(--larger-margin) 0",
            }}
          >
            Vivez un message. Nous vous répondrons très prochainement.
          </h3>
          <div style={{ padding: "var(--padding)" }}>
            <Input
              name={"contact"}
              required={true}
              inputValue={inputValue}
              proposition={undefined}
              setInputValue={setInputValue}
            />
            <Input
              name={"focus"}
              required={true}
              proposition={undefined}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
              defaultValue={inputValue.focus}
            />
            <TextArea
              name={"message"}
              required={true}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            <button className="button" onClick={handleSubmit}>
              Envoyer le message
            </button>
          </div>
          <Errors errMsg={errors} />
        </div>
      </LoadingController>
    </div>
  );
}

export default Contact;
