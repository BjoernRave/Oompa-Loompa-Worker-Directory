import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default ({ firstName, lastName, profession, image, gender, id }) => {
  return (
    <WorkerBox>
      <Image src={image} alt="Oompa Lompa Worker" />
      <Link to={`/${id}`}>
        <h3>
          {firstName} {lastName}
        </h3>
      </Link>
      <p>{profession}</p>
      <p>{gender === "M" ? "Male" : "Female"}</p>
    </WorkerBox>
  );
};

const WorkerBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
  padding: 20px;
  box-shadow: 2px 2px 5px black;
`;

const Image = styled.img`
  height: 300px;
`;
