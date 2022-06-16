import React, { useContext } from "react";
import styled from "styled-components";
import { FormState } from "../Form";

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label>Campaign Title</label>
        <Input
          placeholder="Campaign Title"
          name="campaignTitle"
          onChange={Handler.FormHandler}
          value={Handler.form.campaignTitle}
        />
      </FormInput>
      <FormInput>
        <label>Description</label>
        <TextArea
          placeholder="Campaign Description"
          name="description"
          onChange={Handler.FormHandler}
          value={Handler.form.description}
        />
      </FormInput>
    </FormLeft>
  );
};

const FormLeft = styled.div`
  width: 48%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;
const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  max-width: 100%;
  min-width: 100%;
  overflow-x: hidden;
  min-height: 160px;
  resize: none;
`;

export default FormLeftWrapper;
