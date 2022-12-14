import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import Input from "../../common/Input";
import ProgressBar from "../../common/ProgressBar";
import Stepper from "../../common/Stepper";
import SuccessMessage from "../../components/SuccessMessage";
import db, { storage } from "../../firebaseConfig";
import { useCounter } from "../../hooks/useCounter";
import Modal from "./Modal";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    alternateContactNo: "",
    photoUrl: "",
    signatureUrl: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    alternateContactNo: "",
    photoUrl: "",
    signatureUrl: "",
  });

  const [errorStatus, setErrorStatus] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [progress, setProgress] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const { counter, increment, decrement } = useCounter();

  const uploadFile = (e, key) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type.split("/")[0] !== "image") return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setModalStatus(true);
        const progressPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progressPercentage);
      },
      (error) => {
        alert(error);
        setModalStatus(false);
        setProgress(0);
      },
      () => {
        setModalStatus(false);
        setProgress(0);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, [key]: downloadURL });
        });
      }
    );
  };

  const stepWiseFormStructure = [
    {
      label: "Email",
      type: "email",
      placeholder: "Email",
      value: formData.email,
      error: formErrors.email,
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
        setFormErrors({ ...formErrors, email: "" });
      },
      step: 1,
    },
    {
      label: "Username",
      type: "text",
      placeholder: "Username",
      value: formData.username,
      error: formErrors.username,
      onChange: (e) => {
        setFormData({ ...formData, username: e.target.value });
        setFormErrors({ ...formErrors, username: "" });
      },
      step: 1,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      error: formErrors.password,
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
        setFormErrors({ ...formErrors, password: "" });
      },
      step: 1,
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      value: formData.confirmPassword,
      error: formErrors.confirmPassword,
      onChange: (e) => {
        setFormData({ ...formData, confirmPassword: e.target.value });
        setFormErrors({ ...formErrors, confirmPassword: "" });
      },
      step: 1,
    },
    {
      label: "First Name",
      type: "text",
      placeholder: "First Name",
      value: formData.firstName,
      error: formErrors.firstName,
      onChange: (e) => {
        setFormData({ ...formData, firstName: e.target.value });
        setFormErrors({ ...formErrors, firstName: "" });
      },
      step: 2,
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      value: formData.lastName,
      error: formErrors.lastName,
      onChange: (e) => {
        setFormData({ ...formData, lastName: e.target.value });
        setFormErrors({ ...formErrors, lastName: "" });
      },
      step: 2,
    },
    {
      label: "Contact No",
      type: "number",
      placeholder: "Contact No",
      value: formData.contactNo,
      error: formErrors.contactNo,
      onChange: (e) => {
        setFormData({ ...formData, contactNo: e.target.value });
        setFormErrors({ ...formErrors, contactNo: "" });
      },
      step: 2,
    },
    {
      label: "Alternate Contact No",
      type: "number",
      placeholder: "Alternate Contact No",
      value: formData.alternateContactNo,
      error: formErrors.alternateContactNo,
      onChange: (e) => {
        setFormData({ ...formData, alternateContactNo: e.target.value });
        setFormErrors({ ...formErrors, alternateContactNo: "" });
      },
      step: 2,
    },
    {
      label: "Photo Url",
      type: formData.photoUrl ? "text" : "file",
      placeholder: "Photo Url",
      value: formData.photoUrl,
      error: formErrors.photoUrl,
      disabled: !!formData.photoUrl,
      onChange: (e) => {
        uploadFile(e, "photoUrl");
      },
      reset: () => setFormData({ ...formData, photoUrl: "" }),
      step: 3,
      resetStatus: true,
    },
    {
      label: "Signature Url",
      type: formData.signatureUrl ? "text" : "file",
      placeholder: "Signature Url",
      value: formData.signatureUrl,
      error: formErrors.signatureUrl,
      disabled: !!formData.signatureUrl,
      onChange: (e) => {
        uploadFile(e, "signatureUrl");
      },
      reset: () => setFormData({ ...formData, signatureUrl: "" }),
      step: 3,
      resetStatus: true,
    },
  ];

  const validateFormData = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        errors[key] = "Field is required";
      }
    });
    setFormErrors(errors);
    setErrorStatus(!!Object.keys(errors).length);
    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let emailStatus;
    if (formData.email.match(validRegex)) {
      emailStatus = true;
    }

    if (validateFormData()) {
      if (formData.password !== formData.confirmPassword || !emailStatus) {
        setFormErrors({
          ...formErrors,
          confirmPassword:
            formData.password !== formData.confirmPassword ? "Password and Confirm Password should be same" : "",
          email: formData.email.match(validRegex) ? "" : "Email is not valid",
        });
        setErrorStatus(true);
      } else {
        try {
          await addDoc(collection(db, "app"), formData);
          setSubmitError("");
          increment();
          setErrorStatus(false);
        } catch (err) {
          setSubmitError(err.message);
        }
      }
    }
  };

  return (
    <div className="doubleBox">
      <div className="container">
        <div className="utilities">
          <h2 className="text-center">SIGN UP YOUR USER ACCOUNT</h2>
          <h5 className="text-center">Please fill all the fields to submit</h5>
          <Stepper count={counter} />
          <ProgressBar count={counter} />
          {counter === 4 && !submitError && <SuccessMessage />}
          {submitError && <h5>There was an error submitting the form</h5>}
        </div>

        <form className="form" onSubmit={submitForm}>
          {counter < 4 && (
            <>
              {stepWiseFormStructure.map(
                (item) =>
                  item.step === counter && (
                    <Input
                      key={item.label}
                      label={item?.label}
                      type={item?.type}
                      value={item?.value}
                      placeholder={item?.placeholder}
                      onChange={item?.onChange}
                      error={item?.error}
                      disabled={item?.disabled}
                      reset={item?.reset}
                      resetStatus={item?.resetStatus}
                    />
                  )
              )}
              <Button
                title={counter === 3 ? "Submit" : "Next"}
                className="nextButton"
                onClick={counter < 3 ? increment : submitForm}
              />
            </>
          )}
          {counter > 1 && counter < 4 && <Button title="Previous" className="backButton" onClick={decrement} />}
        </form>
      </div>
      {errorStatus && <ErrorBox error={formErrors} />}
      {modalStatus && <Modal content={progress} />}
    </div>
  );
}

export default SignUp;
