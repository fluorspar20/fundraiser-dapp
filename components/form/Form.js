import React, { createContext, useState } from "react";
import styled from "styled-components";

import FormLeftWrapper from "./components/FormLeftWrapper";
import FormRightWrapper from "./components/FormRightWrapper";

const FormState = createContext();

const Form = () => {
  const [form, setForm] = useState({
    campaignTitle: "",
    description: "",
    requiredAmount: "",
    category: "education",
  });

  const [image, setImage] = useState(null);
  const [descUrl, setDescUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const FormHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <FormState.Provider
      value={{ form, setForm, image, setImage, ImageHandler, FormHandler, setDescUrl, setImgUrl }}
    >
      <FormWrapper>
        <FormMain>
          <FormInputsWrapper>
            <FormLeftWrapper />
            <FormRightWrapper />
          </FormInputsWrapper>
        </FormMain>
      </FormWrapper>
    </FormState.Provider>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormMain = styled.div`
  width: 80%;
`;

const FormInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 44px;
`;

export default Form;
export { FormState };
