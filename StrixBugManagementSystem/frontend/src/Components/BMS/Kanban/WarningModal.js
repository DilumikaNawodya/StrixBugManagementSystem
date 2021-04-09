import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const Center = styled.div`
  alignitems: center;
  justifycontent: space-between;
`;

function WarningModal(props) {
  return (
    <div>
      <div class="modal-body text-lg-center">

        <div class="row">
          <div class="col"></div>
          <IconContext.Provider value={{ color: "red" }}>
            <IoWarningOutline size={100} />
          </IconContext.Provider>

          <div class="col"></div>
        </div>

        <Center class="row">
          <h1>Are you sure?</h1>
        </Center>

        <Center class="row">
          <h6>If you proceed, the bug will be marked as completed.</h6>
        </Center>

        <div class="row mt-3">

          <div class="col">
            <Button type="button" variant="danger" onClick={props.submit}>
              Confirm
            </Button>
          </div>

          <div class="col">
            <Button type="button" onClick={props.cl}>
              Cancel
            </Button>
          </div>

        </div>
        
      </div>
    </div>
  );
}
export default WarningModal;
