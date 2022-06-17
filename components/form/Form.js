import React, { createContext, useState } from "react";
import styled from "styled-components";

import FormLeftWrapper from "./components/FormLeftWrapper";
import FormRightWrapper from "./components/FormRightWrapper";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";

const FormState = createContext();

const Form = () => {
  const [form, setForm] = useState({
    campaignTitle: "",
    description: "",
    requiredAmount: "",
    category: "Education",
  });

  const [loading, setLoading] = useState(false);
  const [campaignAddress, setCampaignAddress] = useState("");

  const [image, setImage] = useState(null);
  const [descUrl, setDescUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const FormHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const startCampaign = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if (form.campaignTitle === "") {
      toast.warn("Title Field Is Empty");
    } else if (form.story === "") {
      toast.warn("Story Field Is Empty");
    } else if (form.requiredAmount === "") {
      toast.warn("Required Amount Field Is Empty");
    } else if (uploaded == false) {
      toast.warn("Upload Files to IPFS");
    } else {
      setLoading(true);

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        signer
      );

      const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);

      const campaignData = await contract.createCampaign(
        form.campaignTitle,
        CampaignAmount,
        imgUrl,
        form.category,
        descUrl
      );

      await campaignData.wait();

      setCampaignAddress(campaignData.to);
    }
  };

  return (
    <FormState.Provider
      value={{
        form,
        setForm,
        image,
        setImage,
        ImageHandler,
        FormHandler,
        setDescUrl,
        setImgUrl,
        startCampaign,
        setUploaded,
      }}
    >
      <FormWrapper>
        <FormMain>
          {loading == true ? (
            campaignAddress == "" ? (
              <Spinner>
                <CircularProgress />
              </Spinner>
            ) : (
              <Address>
                <h1>Campagin Started Sucessfully!</h1>
                <h1>{campaignAddress}</h1>
                <Button>Go To Campaign</Button>
              </Address>
            )
          ) : (
            <FormInputsWrapper>
              <FormLeftWrapper />
              <FormRightWrapper />
            </FormInputsWrapper>
          )}
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

const Spinner = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Address = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgSubDiv};
  border-radius: 8px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 30%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default Form;
export { FormState };
